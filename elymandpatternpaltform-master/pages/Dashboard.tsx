
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useApp } from '../store';
import { 
  History, 
  CloudDownload, 
  Box, 
  LogOut,
  Film,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Settings,
  User as UserIcon,
  Camera,
  CheckCircle2,
  Loader2,
  Fingerprint,
  Copy,
  ExternalLink,
  CreditCard,
  Layers,
  ArrowUpRight,
  Info,
  Clock,
  Zap,
  Crown,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SubscriptionPlan, SubscriptionStatus } from '../types';

const Dashboard: React.FC = () => {
  const { auth, logs, patterns, motionVideos, logout, refreshData, updateUser, uploadFile } = useApp();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: auth.user?.name || ''
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      refreshData();
    }
  }, [auth.isAuthenticated, refreshData]);

  if (!auth.user) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUser({ name: editForm.name });
      setIsEditing(false);
    } catch (err) {
      alert("Update failed. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsSaving(true);
    try {
      const publicUrl = await uploadFile(file, 'previews');
      await updateUser({ profile_image: publicUrl });
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setIsSaving(false);
    }
  };

  const getQuotaConfig = () => {
    const sub = auth.subscription;
    const rawPlan = sub?.plan?.toLowerCase() || 'free';
    const plan = Object.values(SubscriptionPlan).find(v => v.toLowerCase() === rawPlan) || SubscriptionPlan.FREE;
    const isFree = plan === SubscriptionPlan.FREE;

    // Use unique normalized asset counts for quota tracking
    const uniquePatternUsage = new Set(
      logs.filter(l => l.assetType === 'pattern').map(l => l.assetId.trim().toUpperCase())
    ).size;
    
    const uniqueMotionUsage = new Set(
      logs.filter(l => l.assetType === 'motion').map(l => l.assetId.trim().toUpperCase())
    ).size;

    if (plan === SubscriptionPlan.ENTERPRISE) return { pLimit: Infinity, mLimit: Infinity, label: 'Enterprise Studio', pUsage: uniquePatternUsage, mUsage: uniqueMotionUsage, isFree: false };
    if (plan === SubscriptionPlan.ALL_ACCESS) return { pLimit: 20, mLimit: 10, label: 'Full Access Member', pUsage: uniquePatternUsage, mUsage: uniqueMotionUsage, isFree: false };
    if (plan === SubscriptionPlan.PRO) return { pLimit: 15, mLimit: 0, label: 'Pattern Pro Member', pUsage: uniquePatternUsage, mUsage: uniqueMotionUsage, isFree: false };
    
    // Free plan: Strictly 1 Pattern and 1 Motion
    return { pLimit: 1, mLimit: 1, label: 'Free Studio Account', pUsage: uniquePatternUsage, mUsage: uniqueMotionUsage, isFree: true };
  };

  const quota = getQuotaConfig();
  const pUsagePercentage = quota.pLimit === Infinity ? 100 : Math.min((quota.pUsage / quota.pLimit) * 100, 100);
  const mUsagePercentage = quota.mLimit === Infinity ? 100 : quota.mLimit === 0 ? 0 : Math.min((quota.mUsage / quota.mLimit) * 100, 100);
  
  // A Free account is considered fully "Exhausted" if they have used both their Pattern and Motion slots
  const isQuotaExhausted = quota.isFree 
    ? (quota.pUsage >= 1 && quota.mUsage >= 1) 
    : (quota.pLimit !== Infinity && quota.pUsage >= quota.pLimit);

  const initials = auth.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24 selection:bg-violet-600 selection:text-white">
      
      {/* Verification Banner */}
      {!auth.user.isVerified && (
        <div className="bg-slate-900 text-white border-b border-white/10 shadow-lg sticky top-16 md:top-20 z-[95] animate-in slide-in-from-top duration-500">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest">Verify email to enable high-resolution downloads.</p>
             </div>
             <Link to="/verify-email" className="px-8 py-2 bg-white text-slate-900 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all">Verify Now</Link>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <header className="bg-white border-b border-slate-200 pt-16 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="flex items-center gap-8">
              <div className="relative group">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] md:rounded-[2.5rem] bg-slate-100 flex items-center justify-center text-4xl font-black text-slate-300 overflow-hidden shadow-2xl shadow-slate-200 border-4 border-white ring-1 ring-slate-100">
                  {auth.user.profileImage ? (
                    <img src={auth.user.profileImage} alt="" className="w-full h-full object-cover" />
                  ) : initials}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center rounded-[2.5rem] text-white"
                >
                  <Camera className="w-6 h-6" />
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                {auth.user.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-8 h-8 rounded-xl border-4 border-white shadow-lg flex items-center justify-center">
                    <ShieldCheck className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                  {auth.user.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className={`font-black text-[9px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border ${quota.isFree ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-violet-50 text-violet-600 border-violet-100'}`}>
                    {quota.label}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400">
                     <div className={`w-1.5 h-1.5 rounded-full ${auth.user.isVerified ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                     <span className="text-[9px] font-bold uppercase tracking-widest">{auth.user.isVerified ? 'Verified Studio' : 'Pending'}</span>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/category" className="inline-flex items-center px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-violet-600 shadow-2xl shadow-slate-200 group transition-all">
              Go to Library <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Profile Edit Area */}
          {isEditing && (
            <div className="mt-12 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-500">
              <form onSubmit={handleUpdateProfile} className="max-w-md space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Studio Name</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                    className="w-full p-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-600 transition-all" 
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    disabled={isSaving}
                    className="flex-1 py-4 bg-violet-600 text-white rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-violet-700 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                    Update Profile
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-4 text-slate-400 font-black text-[9px] uppercase tracking-widest hover:text-slate-900">Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Dashboard Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* PLAN & QUOTA CARD */}
            <div className={`rounded-[2.5rem] border overflow-hidden flex flex-col transition-all duration-700 ${
              quota.isFree 
              ? 'bg-white border-slate-200 shadow-sm' 
              : 'bg-white border-violet-600 shadow-2xl shadow-violet-100 ring-1 ring-violet-600/20'
            }`}>
              <div className="p-8 space-y-10">
                 <div className="flex items-center justify-between">
                    <h3 className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-3 ${quota.isFree ? 'text-slate-900' : 'text-violet-600'}`}>
                      {quota.isFree ? <CreditCard className="w-4 h-4 text-slate-400" /> : <Crown className="w-4 h-4 text-violet-600" />}
                      {quota.isFree ? 'Trial Status' : 'Pro Membership Limits'}
                    </h3>
                    {!quota.isFree && <div className="w-2 h-2 bg-violet-600 rounded-full animate-pulse"></div>}
                 </div>
                 
                 <div className="space-y-8">
                   {/* Patterns Usage */}
                   <div className="space-y-4">
                     <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                       <span className={`flex items-center gap-2 ${quota.isFree ? 'text-slate-400' : 'text-slate-900'}`}><Box className="w-3 h-3" /> Patterns</span>
                       <span className="text-slate-900 font-black">{quota.pLimit === Infinity ? 'Unlimited' : `${quota.pUsage} / ${quota.pLimit}`}</span>
                     </div>
                     <div className={`h-2.5 rounded-full overflow-hidden border ${quota.isFree ? 'bg-slate-50 border-slate-100' : 'bg-violet-50 border-violet-100'}`}>
                       <div className={`h-full transition-all duration-1000 ease-out ${quota.isFree ? (quota.pUsage >= 1 ? 'bg-rose-500' : 'bg-slate-300') : 'bg-violet-600'}`} style={{ width: `${pUsagePercentage}%` }}></div>
                     </div>
                   </div>
                   {/* Motion Usage */}
                   <div className="space-y-4">
                     <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                       <span className={`flex items-center gap-2 ${quota.isFree ? 'text-slate-400' : 'text-slate-900'}`}><Film className="w-3 h-3" /> Motion Assets</span>
                       <span className="text-slate-900 font-black">{quota.mLimit === Infinity ? 'Unlimited' : `${quota.mUsage} / ${quota.mLimit}`}</span>
                     </div>
                     <div className={`h-2.5 rounded-full overflow-hidden border ${quota.isFree ? 'bg-slate-50 border-slate-100' : 'bg-amber-50 border-amber-100'}`}>
                       <div className={`h-full transition-all duration-1000 ease-out ${quota.isFree ? (quota.mUsage >= 1 ? 'bg-rose-500' : 'bg-slate-300') : 'bg-amber-500'}`} style={{ width: `${mUsagePercentage}%` }}></div>
                     </div>
                   </div>

                   {/* QUOTA WARNING */}
                   {isQuotaExhausted && (
                     <div className="p-5 bg-rose-50 border border-rose-100 rounded-[1.5rem] flex items-start space-x-3 text-rose-600 animate-in fade-in zoom-in-95 duration-500">
                        <ShieldAlert className="w-6 h-6 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                           <p className="text-[11px] font-black uppercase tracking-widest">Trial Limit Hit</p>
                           <p className="text-[9px] font-bold uppercase leading-relaxed opacity-80">
                             {quota.isFree ? "You’ve reached your free download limit. Upgrade now to unlock full access!" : "You have reached your monthly download limit."}
                           </p>
                        </div>
                     </div>
                   )}
                 </div>

                 {quota.isFree ? (
                   <Link to="/pricing" className="group flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-violet-600 transition-all shadow-xl shadow-slate-100">
                      Upgrade to Pro <Zap className="w-3.5 h-3.5 text-amber-400" />
                   </Link>
                 ) : (
                   <div className="p-4 bg-violet-50 rounded-xl border border-violet-100 flex items-center justify-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-violet-600" />
                      <span className="text-[8px] font-black text-violet-600 uppercase tracking-widest">Active Member Status</span>
                   </div>
                 )}
              </div>
            </div>

            {/* SETTINGS CARD */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
               <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
                  <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                    <UserIcon className="w-4 h-4 text-violet-600" />
                    Account Settings
                  </h3>
                  <button onClick={() => setIsEditing(!isEditing)} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-violet-50 hover:text-violet-600 transition-all">
                    <Settings className="w-4 h-4" />
                  </button>
               </div>
               <div className="p-8 space-y-6">
                 <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Security Email</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{auth.user.email}</p>
                 </div>
                 <div className="space-y-4 pt-4 border-t border-slate-50">
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Identity Check</span>
                       {auth.user.isVerified ? (
                         <span className="text-[9px] font-black text-emerald-500 uppercase flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Verified</span>
                       ) : (
                         <Link to="/verify-email" className="text-[9px] font-black text-amber-600 uppercase underline">Verify Email</Link>
                       )}
                    </div>
                 </div>
               </div>
            </div>

            <button onClick={() => logout()} className="w-full flex items-center justify-center gap-3 p-5 border-2 border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          {/* DOWNLOAD LOGS */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
              <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/20">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-violet-600 shadow-sm">
                      <History className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Studio History</h3>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Asset access logs</p>
                    </div>
                 </div>
                 <div className="px-5 py-2 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
                    {logs.length} Total Downloads
                 </div>
              </div>

              <div className="flex-1 divide-y divide-slate-100">
                {logs.length > 0 ? logs.map((log) => {
                  const asset = log.assetType === 'pattern' 
                    ? patterns.find(p => p.id === log.assetId)
                    : motionVideos.find(m => m.id === log.assetId);

                  return (
                    <div key={log.id} className="p-6 md:p-8 flex items-center justify-between hover:bg-slate-50/40 transition-all group">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center relative shadow-inner">
                             {asset?.thumbnail ? (
                               <img src={asset.thumbnail} alt="" className="w-full h-full object-cover" />
                             ) : (
                               log.assetType === 'pattern' ? <Box className="w-5 h-5 text-white/20" /> : <Film className="w-5 h-5 text-white/20" />
                             )}
                          </div>
                          <div className="space-y-1.5">
                             <h4 className="font-black text-slate-900 text-sm md:text-base uppercase tracking-tight group-hover:text-violet-600 transition-colors">
                               {asset?.title || `Master File #${log.assetId.slice(0, 8)}`}
                             </h4>
                             <div className="flex items-center gap-4">
                                <span className={`text-[8px] font-black uppercase px-2.5 py-0.5 rounded-md border flex items-center gap-1.5 ${
                                  log.assetType === 'pattern' ? 'bg-violet-50 text-violet-600 border-violet-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                }`}>
                                  {log.assetType === 'pattern' ? <Box className="w-2.5 h-2.5" /> : <Film className="w-2.5 h-2.5" />}
                                  {log.assetType}
                                </span>
                                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                                  <Clock className="w-3 h-3" />
                                  {new Date(log.timestamp).toLocaleDateString()}
                                </span>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center space-x-2">
                          <Link 
                            to={log.assetType === 'pattern' ? `/pattern/${log.assetId}` : `/motion-videos/${log.assetId}`}
                            className="w-12 h-12 bg-slate-50 text-slate-300 rounded-xl flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all shadow-sm"
                            title="View Asset"
                          >
                              <ExternalLink className="w-4 h-4" />
                          </Link>
                       </div>
                    </div>
                  );
                }) : (
                  <div className="flex flex-col items-center justify-center py-40 space-y-8 animate-in fade-in duration-700">
                     <div className="relative">
                        <div className="absolute inset-0 bg-violet-100 blur-3xl rounded-full animate-pulse opacity-30"></div>
                        <div className="w-20 h-20 bg-white rounded-[2rem] border border-slate-100 flex items-center justify-center relative z-10 shadow-lg">
                           <CloudDownload className="w-8 h-8 text-slate-200" />
                        </div>
                     </div>
                     <div className="text-center space-y-3">
                        <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Empty Studio Library</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-[240px] leading-relaxed mx-auto">
                           Your creative downloads will appear here for easy future access.
                        </p>
                     </div>
                     <Link to="/category" className="px-10 py-4 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-violet-600 transition-all shadow-xl">
                       Browse Library
                     </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
