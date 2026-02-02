
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { User, Subscription, Pattern, DownloadLog, AuthState, SubscriptionPlan, SubscriptionStatus, MotionVideo, PatternStatus } from './types';
import { supabase } from './supabase';

interface ExtendedAuthState extends AuthState {
  isLoading: boolean;
}

interface AppContextType {
  auth: ExtendedAuthState;
  patterns: Pattern[];
  motionVideos: MotionVideo[];
  logs: DownloadLog[];
  login: (email: string, password: string) => Promise<{ data: any; error: any }>;
  register: (email: string, password: string, name: string) => Promise<{ data: any; error: any }>;
  logout: () => void;
  addLog: (log: Omit<DownloadLog, 'id' | 'timestamp' | 'ip'>) => Promise<void>;
  subscribe: (plan: string) => void;
  refreshData: () => Promise<void>;
  getSignedDownloadUrl: (bucket: string, url: string, fileName?: string) => Promise<string>;
  addPattern: (pattern: any) => Promise<void>;
  deletePattern: (id: string) => Promise<void>;
  addMotionVideo: (video: any) => Promise<void>;
  deleteMotionVideo: (id: string) => Promise<void>;
  uploadFile: (file: File, bucket: string) => Promise<string>;
  sendVerificationCode: () => string;
  confirmVerification: (code: string) => boolean;
  updateUser: (updates: any) => Promise<void>;
  requestPasswordReset: (email: string) => string;
  completePasswordReset: (email: string, code: string) => boolean;
  cancelSubscription: () => Promise<void>;
  // Admin Methods
  fetchAllUsers: () => Promise<any[]>;
  updateUserStatus: (userId: string, isSuspended: boolean) => Promise<void>;
  fetchAllLogs: () => Promise<DownloadLog[]>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<ExtendedAuthState>({
    user: null, subscription: null, isAuthenticated: false, isLoading: true
  });
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [motionVideos, setMotionVideos] = useState<MotionVideo[]>([]);
  const [logs, setLogs] = useState<DownloadLog[]>([]);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);

  const refreshData = useCallback(async () => {
    try {
      // Fetch public library data regardless of auth state
      const [{ data: pData }, { data: mData }] = await Promise.all([
        supabase.from('patterns').select('*'),
        supabase.from('motion_videos').select('*')
      ]);
      
      if (pData) setPatterns(pData.map((p: any) => ({ ...p, downloadUrl: p.download_url, createdAt: p.created_at })));
      if (mData) setMotionVideos(mData.map((m: any) => ({ ...m, downloadUrl: m.download_url, previewUrl: m.preview_url, isLooping: m.is_looping, hasAlpha: m.has_alpha, createdAt: m.created_at })));
    } catch (e) { 
      console.error("Public data fetch error:", e); 
    }

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;
      
      if (session?.user?.id) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).maybeSingle();
        const { data: subData } = await supabase.from('subscriptions').select('*').eq('user_id', session.user.id).maybeSingle();
        
        if (profile) {
          setAuth(prev => ({
            ...prev,
            user: prev.user ? { 
              ...prev.user, 
              role: profile.role as 'user' | 'admin',
              name: profile.name,
              profileImage: profile.profile_image
            } : {
              id: session.user.id,
              email: session.user.email!,
              name: profile.name || session.user.email!.split('@')[0],
              role: profile.role as 'user' | 'admin',
              createdAt: session.user.created_at,
              isVerified: !!session.user.email_confirmed_at,
              profileImage: profile.profile_image
            },
            subscription: subData ? { id: subData.id, userId: subData.user_id, plan: subData.plan_name as SubscriptionPlan, status: subData.status as SubscriptionStatus, startDate: subData.created_at, endDate: subData.current_period_end, isCancelled: subData.is_cancelled } : prev.subscription,
            isAuthenticated: true
          }));
        }

        const query = supabase.from('download_logs').select('*');
        if (profile?.role !== 'admin') query.eq('user_id', session.user.id);
        
        const { data: lData } = await query;
        if (lData) {
          const mapped = lData.map(l => ({ id: l.id, userId: l.user_id, assetId: l.asset_id, assetType: l.asset_type as 'pattern' | 'motion', timestamp: l.created_at || new Date().toISOString(), ip: l.ip || '0.0.0.0' }));
          setLogs([...mapped].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        }
      } else {
        // Clear personal logs if not authenticated, but keep patterns/videos
        setLogs([]);
      }
    } catch (e) { 
      console.error("Session data fetch error:", e); 
    }
  }, []);

  const syncUser = useCallback(async (sbUser: any) => {
    if (!sbUser) {
      setAuth({ user: null, subscription: null, isAuthenticated: false, isLoading: false });
      // CRITICAL: Call refreshData even when no user exists so guests can see the catalog
      await refreshData();
      return;
    }
    try {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', sbUser.id).maybeSingle();
      const { data: subData } = await supabase.from('subscriptions').select('*').eq('user_id', sbUser.id).maybeSingle();
      setAuth({
        user: { id: sbUser.id, email: sbUser.email!, name: profile?.name || sbUser.email!.split('@')[0], role: (profile?.role || 'user') as 'user' | 'admin', createdAt: sbUser.created_at, isVerified: !!sbUser.email_confirmed_at, profileImage: profile?.profile_image },
        subscription: subData ? { id: subData.id, userId: subData.user_id, plan: subData.plan_name as SubscriptionPlan, status: subData.status as SubscriptionStatus, startDate: subData.created_at, endDate: subData.current_period_end, isCancelled: subData.is_cancelled } : null,
        isAuthenticated: true, isLoading: false
      });
      await refreshData();
    } catch (err) { 
      console.error("User sync error:", err);
      setAuth(prev => ({ ...prev, isLoading: false })); 
      await refreshData();
    }
  }, [refreshData]);

  useEffect(() => {
    // Initialize session and data
    supabase.auth.getSession().then(({ data: { session } }) => syncUser(session?.user || null));
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      syncUser(session?.user || null);
    });
    
    return () => subscription.unsubscribe();
  }, [syncUser]);

  const login = async (email: string, password: string) => supabase.auth.signInWithPassword({ email, password });
  const register = async (email: string, password: string, name: string) => supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
  const logout = useCallback(async () => { await supabase.auth.signOut(); setAuth({ user: null, subscription: null, isAuthenticated: false, isLoading: false }); }, []);

  const addLog = async (logData: Omit<DownloadLog, 'id' | 'timestamp' | 'ip'>) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase.from('download_logs').insert({ user_id: session.user.id, asset_id: logData.assetId, asset_type: logData.assetType });
      await refreshData();
    }
  };

  const fetchAllUsers = async () => {
    const { data: profiles } = await supabase.from('profiles').select('*');
    const { data: subs } = await supabase.from('subscriptions').select('*');
    const { data: logs } = await supabase.from('download_logs').select('user_id');
    
    return (profiles || []).map(p => ({
      ...p,
      subscription: subs?.find(s => s.user_id === p.id),
      downloadCount: logs?.filter(l => l.user_id === p.id).length || 0
    }));
  };

  const updateUserStatus = async (userId: string, isSuspended: boolean) => {
    await supabase.from('profiles').update({ is_suspended: isSuspended }).eq('id', userId);
    await refreshData();
  };

  const fetchAllLogs = async () => {
    const { data } = await supabase.from('download_logs').select('*').order('created_at', { ascending: false });
    return (data || []).map(l => ({ id: l.id, userId: l.user_id, assetId: l.asset_id, assetType: l.asset_type as 'pattern' | 'motion', timestamp: l.created_at, ip: l.ip || '0.0.0.0' }));
  };

  const getSignedDownloadUrl = async (bucket: string, path: string, fileName?: string) => {
    let objectKey = path.split('?')[0];
    if (path.includes(`/${bucket}/`)) objectKey = path.substring(path.indexOf(`/${bucket}/`) + bucket.length + 2);
    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(decodeURIComponent(objectKey), 3600, { download: fileName || true });
    if (error || !data?.signedUrl) throw new Error("Link generation failed");
    return data.signedUrl;
  };

  const subscribe = (plan: string) => { window.location.href = `https://secure.2checkout.com/checkout/buy?MERCHANT=VENDOR&PRODS=PLAN&EXTERNAL-REFERENCE=${auth.user?.id}`; };

  const addPattern = useCallback(async (pattern: any) => { await supabase.from('patterns').insert(pattern); await refreshData(); }, [refreshData]);
  const deletePattern = useCallback(async (id: string) => { await supabase.from('patterns').delete().eq('id', id); await refreshData(); }, [refreshData]);
  const addMotionVideo = useCallback(async (video: any) => { await supabase.from('motion_videos').insert(video); await refreshData(); }, [refreshData]);
  const deleteMotionVideo = useCallback(async (id: string) => { await supabase.from('motion_videos').delete().eq('id', id); await refreshData(); }, [refreshData]);
  const uploadFile = useCallback(async (file: File, bucket: string) => {
    const filePath = `${Math.random().toString(36).substring(2)}-${file.name.replace(/\s+/g, '_')}`;
    await supabase.storage.from(bucket).upload(filePath, file);
    return supabase.storage.from(bucket).getPublicUrl(filePath).data.publicUrl;
  }, []);

  const sendVerificationCode = useCallback(() => { const code = Math.floor(100000 + Math.random() * 900000).toString(); setVerificationCode(code); return code; }, []);
  const confirmVerification = useCallback((code: string) => { if (code === verificationCode) { setAuth(prev => ({ ...prev, user: prev.user ? { ...prev.user, isVerified: true } : null })); return true; } return false; }, [verificationCode]);
  const updateUser = useCallback(async (updates: any) => { if (auth.user) { await supabase.from('profiles').update(updates).eq('id', auth.user.id); setAuth(prev => ({ ...prev, user: prev.user ? { ...prev.user, ...updates } : null })); } }, [auth.user]);
  const requestPasswordReset = useCallback((email: string) => { const code = Math.floor(100000 + Math.random() * 900000).toString(); setVerificationCode(code); return code; }, []);
  const completePasswordReset = useCallback((email: string, code: string) => code === verificationCode, [verificationCode]);
  const cancelSubscription = useCallback(async () => { if (auth.user) { await supabase.from('subscriptions').update({ is_cancelled: true }).eq('user_id', auth.user.id); await refreshData(); } }, [auth.user, refreshData]);

  const contextValue = useMemo(() => ({
    auth, patterns, motionVideos, logs, login, register, logout, addLog, refreshData, getSignedDownloadUrl, subscribe,
    addPattern, deletePattern, addMotionVideo, deleteMotionVideo, uploadFile, sendVerificationCode, confirmVerification, updateUser, requestPasswordReset, completePasswordReset, cancelSubscription,
    fetchAllUsers, updateUserStatus, fetchAllLogs
  }), [auth, patterns, motionVideos, logs, refreshData, addPattern, deletePattern, addMotionVideo, deleteMotionVideo, uploadFile, sendVerificationCode, confirmVerification, updateUser, requestPasswordReset, completePasswordReset, cancelSubscription]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
