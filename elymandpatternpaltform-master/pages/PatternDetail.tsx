
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../store';
import { 
  ArrowLeft, 
  Download,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Loader2,
  AlertTriangle,
  Crown,
  Maximize2,
  Grid3X3,
  Scaling,
  Info,
  CalendarDays,
  Layers,
  FileImage,
  FileText,
  Lock,
  UserPlus,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { SubscriptionPlan, SubscriptionStatus } from '../types';
import { Logo } from '../components/Logo';

const PatternDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patterns, auth, addLog, logs, getSignedDownloadUrl, refreshData } = useApp();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStage, setDownloadStage] = useState('');

  const pattern = patterns.find(p => p.id === id);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // CRITICAL: Strict enforcement of the 1-pattern / 2-total limit for FREE users
  const isLimitReached = useMemo(() => {
    if (!auth.isAuthenticated || !auth.user) return false;
    
    const sub = auth.subscription;
    const rawPlan = sub?.plan?.toLowerCase() || 'free';
    const plan = Object.values(SubscriptionPlan).find(v => v.toLowerCase() === rawPlan) || SubscriptionPlan.FREE;
    const status = sub?.status || SubscriptionStatus.ACTIVE;

    // Paid plan but inactive status
    if (plan !== SubscriptionPlan.FREE && status !== SubscriptionStatus.ACTIVE) return true;

    // ID Normalization for matching
    const currentId = (id || "").trim().toUpperCase();
    const uniquePatterns = new Set(logs.filter(l => l.assetType === 'pattern').map(l => l.assetId.trim().toUpperCase()));
    const uniqueMotions = new Set(logs.filter(l => l.assetType === 'motion').map(l => l.assetId.trim().toUpperCase()));
    const totalUnique = uniquePatterns.size + uniqueMotions.size;
    
    const isThisAssetDownloaded = uniquePatterns.has(currentId);

    // FREE Account: Max 1 Pattern AND Max 2 Total Assets
    if (plan === SubscriptionPlan.FREE) {
      if (isThisAssetDownloaded) return false; // Allow re-downloading owned asset
      // Block if pattern slot used OR total quota used
      return uniquePatterns.size >= 1 || totalUnique >= 2; 
    }

    // Paid account monthly limits
    const subStart = sub?.startDate ? new Date(sub.startDate).getTime() : 0;
    const currentPeriodUniquePatterns = new Set(
      logs.filter(l => l.assetType === 'pattern' && new Date(l.timestamp).getTime() >= subStart)
          .map(l => l.assetId.trim().toUpperCase())
    ).size;

    const limit = plan === SubscriptionPlan.PRO ? 15 : plan === SubscriptionPlan.ALL_ACCESS ? 20 : Infinity;
    
    if (isThisAssetDownloaded) return false;
    return currentPeriodUniquePatterns >= limit;
  }, [auth, logs, id]);

  if (!pattern) return null;

  const handleDownload = async () => {
    if (!auth.isAuthenticated) return navigate('/login');
    if (!auth.user?.isVerified) {
      navigate('/verify-email');
      return;
    }
    
    // Final logic lock
    if (isLimitReached) {
      alert("Quota reached. Please upgrade to Pro for more downloads.");
      return;
    }

    setIsDownloading(true);
    setDownloadStage('Authorizing...');

    try {
      const safeTitle = pattern.title.replace(/[^a-z0-9]/gi, '_');
      const extension = pattern.downloadUrl.split('.').pop()?.split('?')[0]?.toLowerCase() || 'zip';
      const fileName = `Elymand_${safeTitle}_Master.${extension}`;
      
      const signedUrl = await getSignedDownloadUrl('masters', pattern.downloadUrl, fileName);

      if (signedUrl) {
        setDownloadStage('Transferring...');
        
        await addLog({
          userId: auth.user!.id,
          assetId: pattern.id,
          assetType: 'pattern'
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
    } catch (e: any) {
      console.error("Pattern Download Error:", e);
      setIsDownloading(false);
      setDownloadStage('');
      alert("Transfer was interrupted. Please check your connection.");
    }
  };

  const getFormatIcon = (format: string) => {
    const f = format.toUpperCase();
    if (['AI', 'EPS', 'SVG'].includes(f)) return <FileCode className="w-4 h-4" />;
    if (['PSD', 'TIFF'].includes(f)) return <Layers className="w-4 h-4" />;
    if (['JPG', 'PNG', 'JPEG', 'WEBP'].includes(f)) return <FileImage className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const availableFormatsList = pattern.formats?.length > 0 ? pattern.formats.join(', ') : 'AI, EPS, PSD, JPG, PNG';

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-32 selection:bg-violet-600 selection:text-white">
      <div className="max-w-[1536px] mx-auto px-6 py-6 md:py-10 flex items-center justify-between border-b border-slate-50 md:border-none">
        <button onClick={() => navigate(-1)} className="group flex items-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-slate-900 transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Library</span>
        </button>
        <div className="hidden sm:flex items-center space-x-6">
           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">#{pattern.id.toUpperCase()}</span>
           <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase border border-emerald-100">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Asset</span>
           </div>
        </div>
      </div>

      <div className="max-w-[1536px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 mt-8 md:mt-0">
        <div className="lg:col-span-6 space-y-8 flex flex-col items-center lg:items-start">
          <div className="relative aspect-square rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl bg-slate-50 w-full max-w-2xl group">
             <img src={pattern.thumbnail} alt={pattern.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 w-full max-w-2xl">
             <div className="flex items-center space-x-3 text-slate-400">
                <CalendarDays className="w-5 h-5 text-violet-500" />
                <div className="space-y-0.5 text-center sm:text-left">
                   <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Published</p>
                   <p className="text-[11px] font-black text-slate-900 uppercase">{new Date(pattern.createdAt).toLocaleDateString()}</p>
                </div>
             </div>
             <div className="flex flex-col items-center sm:items-end space-y-2">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest opacity-60">File Package</p>
                <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
                   {pattern.formats.map((format) => (
                     <div key={format} className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg shadow-sm">
                        <div className="text-violet-500">{getFormatIcon(format)}</div>
                        <span className="text-[10px] font-black text-slate-900 uppercase">{format}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-10 md:space-y-12 pb-10">
          <div className="space-y-6 text-center lg:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-600 inline-block px-4 py-1.5 bg-violet-50 rounded-full border border-violet-100">{pattern.category}</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">{pattern.title}</h1>
            <p className="text-slate-500 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">{pattern.description}</p>
          </div>

          <div className="space-y-8">
             <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.5em] text-center lg:text-left border-b border-slate-50 pb-4">Studio Specs</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                {[
                  { label: "1. Repeating", val: "Seamless Pattern", icon: Grid3X3 },
                  { label: "2. Quality", val: "High Resolution (300 DPI)", icon: Maximize2 },
                  { label: "3. Dimensions", val: "4000 x 4000 px", icon: Scaling },
                  { label: "4. Package", val: availableFormatsList, icon: FileCode }
                ].map((spec, i) => (
                  <div key={i} className="space-y-2 group text-center sm:text-left">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center sm:justify-start group-hover:text-violet-600 transition-colors">
                        <spec.icon className="w-4 h-4 mr-2 text-violet-400 group-hover:scale-110 transition-transform" /> {spec.label}
                     </p>
                     <p className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight leading-relaxed">{spec.val}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="pt-6 space-y-6">
             {!auth.isAuthenticated ? (
               <Link to="/register" className="w-full py-6 md:py-8 bg-slate-900 text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-[10px] md:text-[12px] tracking-[0.4em] flex items-center justify-center gap-4 shadow-2xl hover:bg-violet-600 transition-all">
                  <UserPlus className="w-5 h-5" />
                  <span>Join to Download</span>
               </Link>
             ) : !auth.user?.isVerified ? (
               <Link to="/verify-email" className="w-full py-6 sm:py-8 bg-amber-500 text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-[11px] sm:text-[12px] tracking-[0.4em] flex items-center justify-center space-x-4 shadow-xl active:scale-95">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Verify Email to Download</span>
               </Link>
             ) : isLimitReached ? (
                <div className="space-y-6">
                  <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-start space-x-4">
                     <ShieldAlert className="w-6 h-6 text-rose-500 shrink-0" />
                     <div className="space-y-1">
                        <p className="text-xs font-black text-rose-900 uppercase leading-none mb-1">Quota Reached</p>
                        <p className="text-[10px] font-bold text-rose-600 uppercase tracking-tight leading-relaxed">
                          Your free studio account is limited to 1 unique pattern and 1 unique motion asset. Upgrade now to unblock all downloads.
                        </p>
                     </div>
                  </div>
                  <button onClick={() => navigate('/pricing')} className="w-full py-6 sm:py-8 bg-violet-600 text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-[11px] sm:text-[12px] tracking-[0.4em] flex items-center justify-center space-x-3 shadow-2xl active:scale-95">
                    <Crown className="w-6 h-6 text-amber-400" />
                    <span>View Pro Plans</span>
                  </button>
                </div>
             ) : (
                <div className="space-y-5">
                  <button disabled={isDownloading} onClick={handleDownload} className={`w-full py-6 sm:py-8 rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-[11px] sm:text-[12px] tracking-[0.4em] transition-all shadow-xl flex flex-col items-center justify-center active:scale-[0.98] ${isDownloading ? 'bg-violet-600 text-white cursor-wait' : 'bg-slate-900 text-white hover:bg-violet-600'}`}>
                    {isDownloading ? (
                      <div className="flex items-center space-x-4">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-xs sm:text-sm">{downloadStage}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-5">
                         <Download className="w-6 h-6" />
                         <span>Download Assets</span>
                      </div>
                    )}
                  </button>
                  <div className="flex items-center justify-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Global License Included</span>
                  </div>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternDetail;
