
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../store';
import { generatePatternMetadata } from '../services/geminiService';
import { Pattern, PatternStatus, MotionVideo } from '../types';
import { 
  Plus, 
  Trash, 
  Loader2, 
  X, 
  CheckCircle2, 
  ShieldAlert,
  BarChart3,
  Monitor,
  RefreshCw,
  Wand2,
  Upload,
  Check,
  FileCode,
  Eye,
  AlertTriangle,
  Film,
  Layers,
  Clock,
  Zap,
  Maximize2,
  ChevronRight,
  Users,
  Search,
  Lock,
  Unlock,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  Layout
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type AdminTab = 'overview' | 'patterns' | 'motion' | 'users';

const PATTERN_CATEGORIES = [
  "Abstract & Organic",
  "Floral & Botanical",
  "Nature",
  "Art",
  "Animal/Wildlife",
  "Geometric Minimal",
  "Background & Texture"
];

const MOTION_CATEGORIES = [
  "Abstract Organic Motion",
  "Liquid / Glossy Motion"
];

const AVAILABLE_FORMATS = ['AI', 'EPS', 'PSD', 'JPG', 'PNG'];

const Admin: React.FC = () => {
  const { patterns, motionVideos, addPattern, addMotionVideo, deletePattern, deleteMotionVideo, uploadFile, refreshData, fetchAllUsers, updateUserStatus, logs } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [studioMode, setStudioMode] = useState<'pattern' | 'motion'>('pattern');
  const [users, setUsers] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [masterFile, setMasterFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [watermarkedFile, setWatermarkedFile] = useState<File | null>(null);
  const [watermarkedPreviewUrl, setWatermarkedPreviewUrl] = useState<string | null>(null);

  const [form, setForm] = useState<any>({
    title: '', category: PATTERN_CATEGORIES[0], description: '', tags: [], 
    formats: ['AI', 'EPS', 'JPG', 'PNG'], duration: '0:15', resolution: '4K', fps: '60 FPS',
    isLooping: true, hasAlpha: false
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    }
  }, [activeTab]);

  const loadUsers = async () => {
    const data = await fetchAllUsers();
    setUsers(data);
  };

  const handleToggleSuspension = async (userId: string, currentStatus: boolean) => {
    if (!window.confirm(`Are you sure you want to ${currentStatus ? 'Unblock' : 'Suspend'} this user?`)) return;
    await updateUserStatus(userId, !currentStatus);
    loadUsers();
  };

  const chartData = useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => ({
      name: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      downloads: logs.filter(l => l.timestamp.startsWith(date)).length
    }));
  }, [logs]);

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) || 
      u.id.toLowerCase().includes(userSearch.toLowerCase())
    );
  }, [users, userSearch]);

  const openStudio = (mode: 'pattern' | 'motion' = 'pattern') => {
    setStudioMode(mode);
    setMasterFile(null);
    setPreviewFile(null);
    setWatermarkedFile(null);
    setWatermarkedPreviewUrl(null);
    setErrorMessage(null);
    setStatusMessage('');
    setForm({
      title: '', 
      category: mode === 'pattern' ? PATTERN_CATEGORIES[0] : MOTION_CATEGORIES[0], 
      description: '', 
      tags: [], 
      formats: mode === 'pattern' ? ['AI', 'EPS', 'JPG', 'PNG'] : ['MP4', 'MOV'],
      duration: '0:15',
      resolution: '4K',
      fps: '60 FPS',
      isLooping: true,
      hasAlpha: false
    });
    setIsStudioOpen(true);
  };

  const toggleFormat = (format: string) => {
    const currentFormats = [...form.formats];
    if (currentFormats.includes(format)) {
      setForm({ ...form, formats: currentFormats.filter(f => f !== format) });
    } else {
      setForm({ ...form, formats: [...currentFormats, format] });
    }
  };

  const applyWatermark = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Could not create image editor');
        canvas.width = 1600; canvas.height = 1600;
        ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, 1600, 1600);
        const scale = Math.max(1600 / img.width, 1600 / img.height);
        const x = (1600 - img.width * scale) / 2; const y = (1600 - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        ctx.save(); ctx.translate(canvas.width / 2, canvas.height / 2); ctx.rotate(-35 * Math.PI / 180);
        ctx.translate(-canvas.width, -canvas.height); ctx.textAlign = "center";
        for (let ix = 0; ix < canvas.width * 2.5; ix += 450) {
          for (let iy = 0; iy < canvas.height * 2.5; iy += 350) {
            ctx.font = "bold 65px Inter, sans-serif"; ctx.strokeStyle = "rgba(0, 0, 0, 0.15)"; ctx.strokeText("ELYMAND", ix, iy);
            ctx.fillStyle = "rgba(255, 255, 255, 0.25)"; ctx.fillText("ELYMAND", ix, iy);
          }
        }
        ctx.restore();
        canvas.toBlob((blob) => {
          if (blob) resolve(new File([blob], `wm_${file.name}.jpg`, { type: 'image/jpeg' }));
          else reject('Error saving watermarked image');
        }, 'image/jpeg', 0.95);
        URL.revokeObjectURL(url);
      };
      img.onerror = () => reject('Error loading image file');
      img.src = url;
    });
  };

  const handleMasterSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMasterFile(file);
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'webp'].includes(ext || '') && !previewFile) processPreview(file);
  };

  const processPreview = async (file: File) => {
    setPreviewFile(file);
    setStatusMessage('Protecting image...');
    try {
      const wmFile = await applyWatermark(file);
      setWatermarkedFile(wmFile);
      setWatermarkedPreviewUrl(URL.createObjectURL(wmFile));
    } catch (err) { setErrorMessage("Watermark failed."); }
    finally { setStatusMessage(''); }
  };

  const handleMagicFill = async () => {
    if (!form.title) return;
    setIsGenerating(true);
    setStatusMessage('Asking AI...');
    try {
      const result = await generatePatternMetadata(form.title, form.category);
      setForm({ ...form, description: result.description, tags: [...new Set([...form.tags, ...result.tags])] });
    } finally { setIsGenerating(false); setStatusMessage(''); }
  };

  const handleDeploy = async () => {
    if (!masterFile || !watermarkedFile || !form.title) return;
    setIsSaving(true);
    try {
      setStatusMessage('Uploading to Cloud...');
      const thumbUrl = await uploadFile(watermarkedFile, 'previews');
      const masterUrl = await uploadFile(masterFile, 'masters');
      const assetId = Math.random().toString(36).substring(2, 10).toUpperCase();
      if (studioMode === 'pattern') {
        await addPattern({ id: assetId, title: form.title, description: form.description, category: form.category, status: PatternStatus.PUBLISHED, thumbnail: thumbUrl, downloadUrl: masterUrl, createdAt: new Date().toISOString(), tags: form.tags, formats: form.formats });
      } else {
        await addMotionVideo({ id: assetId, title: form.title, description: form.description, category: form.category, duration: form.duration, resolution: form.resolution, fps: form.fps, format: masterFile.name.split('.').pop()?.toUpperCase() || 'MP4', thumbnail: thumbUrl, previewUrl: thumbUrl, downloadUrl: masterUrl, isLooping: form.isLooping, hasAlpha: form.hasAlpha, tags: form.tags, createdAt: new Date().toISOString() } as any);
      }
      setShowSuccess(true);
      setTimeout(() => { setIsStudioOpen(false); refreshData(); setShowSuccess(false); }, 1500);
    } catch (e: any) { setErrorMessage(e.message); }
    finally { setIsSaving(false); setStatusMessage(''); }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] selection:bg-indigo-600">
      <nav className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-100 shadow-lg">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight uppercase tracking-tighter">Command Studio</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Master Admin Protocol</p>
          </div>
        </div>
        <div className="flex space-x-4">
           <button onClick={() => refreshData()} className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"><RefreshCw className="w-4 h-4" /></button>
           <button onClick={() => openStudio('pattern')} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center space-x-3 shadow-xl hover:bg-indigo-600 transition-all active:scale-95"><Plus className="w-4 h-4" /> <span>Add Pattern</span></button>
           <button onClick={() => openStudio('motion')} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center space-x-3 shadow-xl hover:bg-slate-900 transition-all active:scale-95"><Film className="w-4 h-4" /> <span>Add Motion</span></button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10 grid lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 space-y-3">
           {[
             { id: 'overview', label: 'Library Analytics', icon: BarChart3 },
             { id: 'patterns', label: 'Pattern Assets', icon: Layout },
             { id: 'motion', label: 'Motion Graphics', icon: Film },
             { id: 'users', label: 'Studio Members', icon: Users }
           ].map(tab => (
             <button key={tab.id} onClick={() => setActiveTab(tab.id as AdminTab)} className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === tab.id ? 'bg-white text-indigo-600 shadow-md border border-slate-100' : 'text-slate-400 hover:bg-white/50'}`}>
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-indigo-600' : ''}`} />
                <span>{tab.label}</span>
             </button>
           ))}
        </aside>

        <main className="lg:col-span-9 space-y-8">
           {activeTab === 'overview' && (
             <div className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 {[
                   { label: "Active Designers", val: users.length || '...', icon: Users, color: "text-indigo-600" },
                   { label: "Pattern Archive", val: patterns.length, icon: Layout, color: "text-emerald-600" },
                   { label: "Motion Collection", val: motionVideos.length, icon: Film, color: "text-violet-600" },
                   { label: "Studio Output", val: logs.length, icon: TrendingUp, color: "text-amber-600" }
                 ].map((stat, i) => (
                   <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-40">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                         <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <p className="text-3xl font-black text-slate-900">{stat.val}</p>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-tight">Verified Protocol 4.0</div>
                   </div>
                 ))}
               </div>

               {/* Download Chart */}
               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                  <div className="flex items-center justify-between">
                     <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Download Trends</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time Studio Interaction</p>
                     </div>
                     <div className="flex items-center space-x-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase border border-emerald-100">
                        <Zap className="w-3 h-3" />
                        <span>Live Sync</span>
                     </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="downloads" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorDownloads)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>

               <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                   <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Master Activity Log</h3>
                   <RefreshCw className="w-4 h-4 text-slate-300" />
                 </div>
                 <div className="divide-y divide-slate-50">
                   {logs.slice(0, 10).map((log) => {
                     const asset = log.assetType === 'pattern' ? patterns.find(p => p.id === log.assetId) : motionVideos.find(m => m.id === log.assetId);
                     return (
                       <div key={log.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                         <div className="flex items-center gap-6">
                           <div className="w-12 h-12 bg-slate-900 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                             {asset?.thumbnail ? <img src={asset.thumbnail} className="w-full h-full object-cover" /> : <Layers className="w-5 h-5 text-white/20" />}
                           </div>
                           <div>
                             <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{asset?.title || 'Unknown File'}</p>
                             <div className="flex items-center gap-3 mt-1">
                               <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${log.assetType === 'pattern' ? 'bg-violet-50 text-violet-600' : 'bg-amber-50 text-amber-600'}`}>{log.assetType}</span>
                               <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">User ID: #{log.userId.slice(0, 8)}</span>
                             </div>
                           </div>
                         </div>
                         <div className="text-right">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(log.timestamp).toLocaleTimeString()}</p>
                           <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">{new Date(log.timestamp).toLocaleDateString()}</p>
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </div>
             </div>
           )}

           {activeTab === 'users' && (
             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[600px] animate-in slide-in-from-right duration-500">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Studio Members</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Manage designer access levels</p>
                   </div>
                   <div className="relative w-full md:w-80">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search member ID or name..." 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                      />
                   </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Designer Info</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Plan</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Studio Usage</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-slate-50/30 transition-all group">
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-[10px] border border-indigo-100 uppercase">
                                   {user.name?.[0] || 'U'}
                                </div>
                                <div>
                                   <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{user.name || 'Anonymous Studio'}</p>
                                   <p className="text-[10px] font-bold text-slate-400 tracking-tight">{user.id.slice(0, 16)}...</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${user.subscription?.plan_name?.includes('Pro') ? 'bg-violet-50 text-violet-600 border-violet-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                                {user.subscription?.plan_name || 'Free Trial'}
                             </span>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-2">
                                <TrendingUp className="w-3 h-3 text-slate-300" />
                                <span className="text-xs font-bold text-slate-600">{user.downloadCount} Assets</span>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             {user.is_suspended ? (
                               <div className="flex items-center gap-2 text-rose-500 font-black text-[9px] uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-lg border border-rose-100 w-fit">
                                 <ShieldAlert className="w-3 h-3" /> Suspended
                               </div>
                             ) : (
                               <div className="flex items-center gap-2 text-emerald-500 font-black text-[9px] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 w-fit">
                                 <ShieldCheck className="w-3 h-3" /> Active
                               </div>
                             )}
                          </td>
                          <td className="px-8 py-6 text-right">
                             <button 
                               onClick={() => handleToggleSuspension(user.id, user.is_suspended)}
                               className={`p-2.5 rounded-xl transition-all ${user.is_suspended ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white' : 'bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white'}`}
                               title={user.is_suspended ? "Unblock Account" : "Suspend Account"}
                             >
                                {user.is_suspended ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredUsers.length === 0 && (
                    <div className="py-32 text-center space-y-6">
                       <Users className="w-12 h-12 text-slate-100 mx-auto" />
                       <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No members found matching your search.</p>
                    </div>
                  )}
                </div>
             </div>
           )}

           {activeTab === 'patterns' && (
             <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px] animate-in slide-in-from-right duration-500">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                   <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Pattern Library</h3>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{patterns.length} Items Available</span>
                </div>
                <div className="divide-y divide-slate-50">
                   {patterns.length > 0 ? patterns.map(p => (
                     <div key={p.id} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-all">
                        <div className="flex items-center space-x-6">
                           <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 bg-slate-900 shadow-inner group-hover:scale-105 transition-transform">
                              <img src={p.thumbnail} className="w-full h-full object-cover" alt="" />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900">{p.title}</h4>
                              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">{p.category}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <button onClick={() => deletePattern(p.id)} className="p-3 bg-rose-50 text-rose-500 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                             <Trash className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                   )) : (
                     <div className="py-40 text-center space-y-6">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                          <Layout className="w-10 h-10 text-slate-200" />
                        </div>
                        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">No patterns in library.</p>
                     </div>
                   )}
                </div>
             </div>
           )}

           {activeTab === 'motion' && (
             <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[600px] animate-in slide-in-from-right duration-500">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                   <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Motion Collection</h3>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{motionVideos.length} Videos Available</span>
                </div>
                <div className="divide-y divide-slate-50">
                   {motionVideos.length > 0 ? motionVideos.map(v => (
                     <div key={v.id} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-all">
                        <div className="flex items-center space-x-6">
                           <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 bg-slate-900 shadow-inner group-hover:scale-105 transition-transform">
                              <img src={v.thumbnail} className="w-full h-full object-cover" alt="" />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900">{v.title}</h4>
                              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">{v.category}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <button onClick={() => deleteMotionVideo(v.id)} className="p-3 bg-rose-50 text-rose-500 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                             <Trash className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                   )) : (
                     <div className="py-40 text-center space-y-6">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                          <Film className="w-10 h-10 text-slate-200" />
                        </div>
                        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">No motion videos in library.</p>
                     </div>
                   )}
                </div>
             </div>
           )}
        </main>
      </div>

      {/* UPLOAD MODAL */}
      {isStudioOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden border border-slate-200">
              <div className="p-8 md:p-10 border-b border-slate-100 flex items-center justify-between">
                 <div>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                      Upload {studioMode === 'pattern' ? 'New Pattern' : 'New Motion Video'}
                    </h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Add professional quality assets to your library</p>
                 </div>
                 <button onClick={() => setIsStudioOpen(false)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-95"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 md:p-12 bg-[#fcfcfd]">
                 <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-5 space-y-10">
                       <div className="space-y-4">
                          <div className="flex items-center gap-3 mb-2">
                             <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">1</div>
                             <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">High-Quality File</h4>
                          </div>
                          <label className={`block w-full p-10 border-2 border-dashed rounded-3xl cursor-pointer transition-all ${masterFile ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-indigo-400 bg-white'}`}>
                             <div className="flex flex-col items-center text-center space-y-4">
                                <div className={`p-5 rounded-2xl ${masterFile ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-50 text-slate-400'}`}><Upload className="w-6 h-6" /></div>
                                <div className="max-w-full overflow-hidden px-4">
                                   <span className="block text-sm font-bold text-slate-900 truncate">{masterFile ? masterFile.name : 'Choose file to upload'}</span>
                                   <span className="block text-[10px] font-bold text-slate-400 uppercase mt-2">{studioMode === 'pattern' ? 'Supports: EPS, AI, ZIP' : 'Supports: MP4, MOV, MKV'}</span>
                                </div>
                             </div>
                             <input type="file" className="hidden" onChange={handleMasterSelect} />
                          </label>
                       </div>
                       <div className="space-y-4">
                          <div className="flex items-center gap-3 mb-2">
                             <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">2</div>
                             <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Thumbnail Image</h4>
                          </div>
                          <label className="block aspect-[4/3] w-full bg-white border-2 border-slate-100 rounded-[2.5rem] cursor-pointer hover:border-indigo-400 overflow-hidden transition-all shadow-md group relative">
                             {watermarkedPreviewUrl ? <img src={watermarkedPreviewUrl} className="w-full h-full object-cover" alt="Preview" /> : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-center p-12">
                                   <div className="p-6 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-colors"><Eye className="w-8 h-8 text-slate-300 group-hover:text-indigo-400 transition-colors" /></div>
                                   <span className="text-xs font-bold text-slate-500 uppercase">Upload Preview Image</span>
                                </div>
                             )}
                             <input type="file" className="hidden" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if(f) processPreview(f); }} />
                          </label>
                       </div>
                    </div>

                    <div className="lg:col-span-7 space-y-8">
                       <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Title</label>
                               <input type="text" placeholder="E.g. Minimal Flow Pattern" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                               <div className="relative">
                                 <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none cursor-pointer appearance-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                                    {studioMode === 'pattern' ? PATTERN_CATEGORIES.map(c => <option key={c}>{c}</option>) : MOTION_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                 </select>
                                 <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none rotate-90" />
                               </div>
                            </div>
                          </div>

                          {studioMode === 'pattern' && (
                            <div className="space-y-3">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">File Formats Included</label>
                              <div className="flex flex-wrap gap-2 pt-1">
                                {AVAILABLE_FORMATS.map(fmt => (
                                  <button key={fmt} type="button" onClick={() => toggleFormat(fmt)} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${form.formats.includes(fmt) ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-indigo-200'}`}>{fmt}</button>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                             <div className="flex items-center justify-between mb-1 px-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</label>
                                <button type="button" onClick={handleMagicFill} disabled={isGenerating || !form.title} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 hover:text-indigo-800 transition-colors disabled:text-slate-300">{isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}<span>Auto-fill with AI</span></button>
                             </div>
                             <textarea placeholder="Write a brief description about this asset..." className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-600 outline-none h-32 resize-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                          </div>

                          <div className="space-y-3">
                             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tags (Search Keywords)</label>
                             <div className="flex gap-2">
                                <input type="text" placeholder="Add tag..." className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none" value={newTag} onChange={e => setNewTag(e.target.value)} onKeyPress={e => e.key === 'Enter' && (newTag.trim() && !form.tags.includes(newTag.trim()) && (setForm({...form, tags: [...form.tags, newTag.trim()]}), setNewTag('')))} />
                                <button type="button" onClick={() => (newTag.trim() && !form.tags.includes(newTag.trim()) && (setForm({...form, tags: [...form.tags, newTag.trim()]}), setNewTag('')))} className="px-6 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors">Add</button>
                             </div>
                             <div className="flex flex-wrap gap-2 pt-2">
                                {form.tags.map((tag: string) => (
                                  <div key={tag} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100 group"><span>{tag}</span><button type="button" onClick={() => setForm({ ...form, tags: form.tags.filter((t: string) => t !== tag) })} className="hover:text-rose-500 transition-colors"><X className="w-3 h-3" /></button></div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 md:p-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between bg-white gap-6">
                 <div className="flex items-center gap-4">
                    {isSaving || isGenerating || statusMessage ? (
                      <div className="flex items-center gap-3"><Loader2 className="w-5 h-5 text-indigo-600 animate-spin" /><span className="text-sm font-bold text-slate-600">{statusMessage || 'Processing...'}</span></div>
                    ) : errorMessage ? (
                      <div className="flex items-center gap-3 text-rose-500"><AlertTriangle className="w-5 h-5" /><span className="text-xs font-bold uppercase tracking-widest">{errorMessage}</span></div>
                    ) : (
                      <div className="flex items-center gap-3 text-emerald-500"><CheckCircle2 className="w-5 h-5" /><span className="text-xs font-bold uppercase tracking-widest">System Ready</span></div>
                    )}
                 </div>
                 <div className="flex items-center gap-4 w-full md:w-auto">
                    <button type="button" onClick={() => setIsStudioOpen(false)} className="flex-1 md:flex-none px-10 py-5 border border-slate-200 text-slate-500 rounded-2xl font-bold text-xs hover:bg-slate-50 transition-all">Cancel</button>
                    <button type="button" onClick={handleDeploy} disabled={isSaving || !masterFile || !watermarkedFile || !form.title} className={`flex-1 md:flex-none px-16 py-5 rounded-2xl font-black uppercase text-[12px] tracking-[0.4em] shadow-2xl transition-all flex items-center justify-center space-x-4 active:scale-95 ${showSuccess ? 'bg-emerald-500 text-white' : 'bg-slate-900 hover:bg-indigo-600 text-white shadow-indigo-100'}`}>{isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : showSuccess ? <Check className="w-6 h-6" /> : <span>Publish Asset</span>}</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
