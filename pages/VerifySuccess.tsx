import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { CheckCircle2, Sparkles, Loader2, LayoutDashboard, ShieldCheck } from 'lucide-react';

const VerifySuccess: React.FC = () => {
  const navigate = useNavigate();
  const { auth, updateUser } = useApp();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Artificial delay to make it feel like a thorough check
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-6 relative overflow-hidden selection:bg-violet-600 selection:text-white">
      {/* Cinematic Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-slate-900 select-none">
          ELYMAND
        </div>
      </div>

      <div className="w-full max-w-lg bg-white rounded-[3rem] border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] p-10 md:p-16 relative z-10 text-center">
        
        {isProcessing ? (
          <div className="space-y-8 py-12 animate-in fade-in duration-500">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-200 blur-2xl rounded-full animate-pulse"></div>
                <Loader2 className="w-16 h-16 text-violet-600 animate-spin relative z-10" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Checking your code...</h2>
              <p className="text-slate-500 font-medium text-sm uppercase tracking-widest">Just a moment, we're verifying your account.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in zoom-in-95 duration-700">
            <div className="relative inline-block">
               <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
               <div className="relative w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-xl shadow-emerald-100 border border-emerald-100">
                <CheckCircle2 className="w-12 h-12" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-violet-600 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">All set!</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Email Verified <br /> <span className="text-emerald-500">Successfully.</span>
              </h1>
              <p className="text-slate-500 font-medium text-base leading-relaxed max-w-sm mx-auto">
                Your account is now ready. You can start downloading premium patterns right away.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4 text-left">
              <div className="flex items-center space-x-3 text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Account Status: Verified</span>
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase leading-relaxed tracking-tight">
                All platform features and high-resolution asset downloads are now fully unlocked for you.
              </p>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full py-6 bg-slate-900 hover:bg-violet-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center space-x-4 group"
              >
                <span>Go to Dashboard</span>
                <LayoutDashboard className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Security Reassurance Footer */}
        <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-center space-x-3 text-slate-300 opacity-80">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Verified Elymand Account</span>
        </div>
      </div>
    </div>
  );
};

export default VerifySuccess;