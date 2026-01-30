
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Monitor, 
  Clock, 
  ShieldCheck, 
  Info, 
  Maximize2, 
  Zap, 
  Layers, 
  RefreshCw,
  Film,
  Download,
  Play,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Crown,
  Lock,
  ArrowUpCircle,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../store';
import { SubscriptionPlan, SubscriptionStatus } from '../types';

const MotionVideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { auth, addLog, logs, motionVideos, getSignedDownloadUrl, refreshData } = useApp();
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStage, setDownloadStage] = useState('');

  const video = useMemo(() => motionVideos.find(v => v.id === id), [id, motionVideos]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // CRITICAL: Strict enforcement of the 1-motion / 2-total limit for FREE users
  const isLimitReached = useMemo(() => {
    if (!auth.isAuthenticated || !auth.user) return false;
    
    const sub = auth.subscription;
    const rawPlan = sub?.plan?.toLowerCase() || 'free';
    const plan = Object.values(SubscriptionPlan).find(v => v.toLowerCase() === rawPlan) || SubscriptionPlan.FREE;
    const status = sub?.status || SubscriptionStatus.ACTIVE;

    // Pro accounts only get patterns, so motion is blocked
    if (plan === SubscriptionPlan.PRO) return true; 
    if (plan !== SubscriptionPlan.FREE && status !== SubscriptionStatus.ACTIVE) return true;

    // ID Normalization for matching
    const currentId = (id || "").trim().toUpperCase();
    const uniquePatterns = new Set(logs.filter(l => l.assetType === 'pattern').map(l => l.assetId.trim().toUpperCase()));
    const uniqueMotions = new Set(logs.filter(l => l.assetType === 'motion').map(l => l.assetId.trim().toUpperCase()));
    const totalUnique = uniquePatterns.size + uniqueMotions.size;
    
    const isThisAssetDownloaded = uniqueMotions.has(currentId);

    // FREE Account: Max 1 Motion AND Max 2 Total Assets
    if (plan === SubscriptionPlan.FREE) {
      if (isThisAssetDownloaded) return false; // Allow re-downloading owned asset
      // Block if motion slot used OR total quota used
      return uniqueMotions.size >= 1 || totalUnique >= 2; 
    }

    // Paid account monthly limits
    const subStart = sub?.startDate ? new Date(sub.startDate).getTime() : 0;
    const currentPeriodUniqueVideos = new Set(
      logs.filter(l => l.assetType === 'motion' && new Date(l.timestamp).getTime() >= subStart)
          .map(l => l.assetId.trim().toUpperCase())
    ).size;

    const limit = plan === SubscriptionPlan.ALL_ACCESS ? 10 : Infinity;
    
    if (isThisAssetDownloaded) return false;
    return currentPeriodUniqueVideos >= limit;
  }, [auth, logs, id]);

  if (!video) return null;

  const handleDownload = async () => {
    if (!auth.isAuthenticated) return navigate('/login');
    if (!auth.user?.isVerified) return navigate('/verify-email');
    
    // Final logic lock
    if (isLimitReached) {
      alert("Motion quota reached. Please upgrade your studio plan to continue.");
      return;
    }

    setIsDownloading(true);
    setDownloadStage('Authorizing...');
    
    try {
      const safeTitle = video.title.replace(/[^a-z0-9]/gi, '_');
      const fileName = `Elymand_${safeTitle}_4K_Master.${video.format.toLowerCase()}`;
      
      const signedUrl = await getSignedDownloadUrl('masters', video.downloadUrl, fileName);

      if (signedUrl) {
        setDownloadStage('Transferring...');

        await addLog({
          userId: auth.user!.id,
          assetId: video.id,
          assetType: 'motion'
        });

        const downloadLink = document.createElement('a');
        downloadLink.href = signedUrl;
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();

        setTimeout(() => {
          document.body.removeChild(downloadLink);
          setIsDownloading(false);
          setDownloadStage('');
        }, 2000);
      }
    } catch (error: any) {
      console.error("Motion Video Download Error:", error);
      setIsDownloading(false);
      setDownloadStage('');
      alert("Transfer was interrupted. Please retry.");
    }
  };

  const technicalSpecs = [
    { label: "Resolution", value: video.resolution, icon: Monitor },
    { label: "Frame Rate", value: video.fps, icon: Zap },
    { label: "Duration", value: video.duration, icon: Clock },
    { label: "File Type", value: video.format, icon: Film },
    { label: "Loopable", value: video.isLooping ? "Yes" : "No", icon: RefreshCw },
    { label: "Alpha", value: video.hasAlpha ? "Included" : "Solid", icon: Layers }
  ];

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-violet-600 selection:text-white">
      <div className="max-w-[1536px] mx-auto px-6 py-10 flex items-center justify-between border-b border-slate-100">
        <button onClick={() => navigate('/motion-videos')} className="group flex items-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-slate-900 transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Gallery</span>
        </button>
      </div>

      <div className="max-w-[1536px] mx-auto px-6 pt-12 md:pt-24">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-7 space-y-12">
               <div className="relative aspect-video rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl border border-slate-100 group">
                  {video.previewUrl ? (
                    <video src={video.previewUrl} controls autoPlay loop muted className="w-full h-full object-cover" poster={video.thumbnail}/>
                  ) : (
                    <img src={video.thumbnail} className="w-full h-full object-cover grayscale opacity-50" alt="" />
                  )}
               </div>

               <div className="space-y-6 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-4 text-violet-600">
                     <span className="text-[11px] font-black uppercase tracking-[0.5em] px-4 py-1.5 bg-violet-50 rounded-full border border-violet-100">{video.category}</span>
                  </div>
                  <h1 className="text-4xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">{video.title}</h1>
                  <p className="text-slate-500 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">{video.description}</p>
               </div>
            </div>

            <div className="lg:col-span-5 space-y-12 pb-20">
               <div className="pt-6 space-y-8">
                  {!auth.isAuthenticated ? (
                    <Link to="/register" className="w-full py-8 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[12px] tracking-[0.4em] flex items-center justify-center space-x-5 shadow-2xl hover:bg-violet-600 transition-all">
                       <Lock className="w-6 h-6" />
                       <span>Join to Download</span>
                    </Link>
                  ) : isLimitReached ? (
                    <div className="space-y-6">
                      <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-start space-x-4">
                        <ShieldAlert className="w-6 h-6 text-rose-500 shrink-0" />
                        <div className="space-y-1">
                            <p className="text-xs font-black text-rose-900 uppercase mb-1">Quota Full</p>
                            <p className="text-[10px] font-bold text-rose-600 uppercase tracking-tight leading-relaxed">
                              {auth.subscription?.plan === SubscriptionPlan.PRO 
                                ? "Your Pattern Pro account does not include motion assets. Please upgrade your plan." 
                                : "Your free studio account is limited to 1 unique motion download. Upgrade for full access."
                              }
                            </p>
                        </div>
                      </div>
                      <button onClick={() => navigate('/pricing')} className="w-full py-8 bg-violet-600 text-white rounded-[2rem] font-black uppercase text-[12px] tracking-[0.4em] flex items-center justify-center space-x-5 shadow-2xl">
                        <Crown className="w-7 h-7 text-amber-400" />
                        <span>Upgrade Membership</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                       <button disabled={isDownloading} onClick={handleDownload} className={`w-full py-8 rounded-[2rem] font-black uppercase text-[12px] tracking-[0.4em] transition-all shadow-xl flex flex-col items-center justify-center active:scale-[0.98] ${isDownloading ? 'bg-violet-600 text-white cursor-wait' : 'bg-slate-900 text-white hover:bg-violet-600'}`}>
                          {isDownloading ? (
                            <div className="flex items-center space-x-5">
                                <Loader2 className="w-6 h-6 animate-spin" />
                                <span>{downloadStage}</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-6">
                               <Download className="w-7 h-7" />
                               <span>Download Master File</span>
                            </div>
                          )}
                       </button>
                    </div>
                  )}
               </div>

               <div className="space-y-12 pt-8">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                     {technicalSpecs.map((spec, i) => (
                       <div key={i} className="space-y-3 group text-center sm:text-left">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center sm:justify-start group-hover:text-violet-600 transition-colors">
                             <spec.icon className="w-4 h-4 mr-3 text-violet-400 group-hover:scale-110 transition-transform" /> {spec.label}
                          </p>
                          <p className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight">{spec.value}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MotionVideoDetail;
