
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../store';
import { 
  ArrowLeft, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  HelpCircle,
  Loader2,
  ChevronRight,
  Clock
} from 'lucide-react';

const CancelSubscription: React.FC = () => {
  const navigate = useNavigate();
  const { auth, cancelSubscription } = useApp();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const reasons = [
    "It's too expensive for me",
    "I don't need patterns anymore",
    "I'm looking for different features",
    "Technical issues with downloads",
    "Switching to another service",
    "Other reasons"
  ];

  const handleCancel = async () => {
    if (!selectedReason) return;
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    cancelSubscription();
    setIsProcessing(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 selection:bg-rose-600 selection:text-white">
        <div className="max-w-lg w-full text-center space-y-10 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-xl border border-rose-100">
              <CheckCircle2 className="w-12 h-12" />
           </div>
           <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                Auto-Renewal <br /> <span className="text-rose-500">Disabled.</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg leading-relaxed">
                Your subscription has been set to cancel at the end of the current period. 
                <br /><br />
                <span className="text-slate-900 font-black">Good news:</span> You can still use all your remaining download credits until <span className="text-violet-600 font-black">{new Date(auth.subscription?.endDate || "").toLocaleDateString()}</span>.
              </p>
           </div>
           <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
              <div className="flex items-center space-x-3 text-slate-900">
                <Clock className="w-5 h-5 text-violet-600" />
                <h4 className="text-[10px] font-black uppercase tracking-widest">Access Maintained</h4>
              </div>
              <p className="text-[11px] text-slate-500 font-bold uppercase leading-relaxed text-left">
                Downloads will be blocked only after you reach your plan limit or after your current month expires.
              </p>
           </div>
           <button 
             onClick={() => navigate('/dashboard')}
             className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] shadow-xl hover:bg-slate-800 transition-all active:scale-95"
           >
             Return to Dashboard
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-32 selection:bg-violet-600 selection:text-white">
      <div className="max-w-[1536px] mx-auto px-6 py-10">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-slate-900 transition-all"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="max-w-[1536px] mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Left: Info & Reassurance */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-rose-500">
              <div className="w-10 h-px bg-rose-500"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Account Protection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              Wait, <br />
              <span className="text-violet-600">Don't Go!</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
              When you cancel, you'll lose immediate access to 15,000+ premium patterns and high-bitrate motion assets after your cycle ends.
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
               <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 flex items-center">
                  <ShieldAlert className="w-5 h-5 mr-3 text-rose-500" /> What you lose:
               </h4>
               <ul className="space-y-4">
                  {[
                    "New weekly design drops",
                    "High-resolution 4K file access",
                    "Priority technical support",
                    "Commercial rights for NEW projects"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-sm font-bold text-slate-600 uppercase tracking-tight">
                       <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                       <span>{item}</span>
                    </li>
                  ))}
               </ul>
            </div>

            <div className="p-8 bg-violet-50 rounded-[2.5rem] border border-violet-100 flex items-start space-x-5">
               <HelpCircle className="w-6 h-6 text-violet-600 shrink-0" />
               <div className="space-y-2">
                  <p className="text-xs font-black text-violet-900 uppercase">Need a lower price?</p>
                  <p className="text-[10px] text-violet-600 font-bold uppercase leading-relaxed">Contact our support team for specialized regional pricing or individual student discounts before you leave.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Cancellation Form */}
        <div className="lg:col-span-7">
           <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-14 lg:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] space-y-12">
              <div>
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none mb-4">Reason for leaving</h3>
                 <p className="text-slate-400 font-medium text-sm">We're sorry to see you go. Help us improve by sharing your feedback.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {reasons.map((reason) => (
                   <button 
                    key={reason}
                    onClick={() => setSelectedReason(reason)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all group flex items-center justify-between ${
                      selectedReason === reason 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xl' 
                      : 'bg-slate-50 border-slate-50 text-slate-500 hover:border-violet-200 hover:bg-white'
                    }`}
                   >
                      <span className="text-[11px] font-black uppercase tracking-widest leading-none">{reason}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${selectedReason === reason ? 'rotate-90 text-violet-400' : 'text-slate-200 group-hover:translate-x-1'}`} />
                   </button>
                 ))}
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-50">
                 <button 
                  onClick={handleCancel}
                  disabled={isProcessing || !selectedReason}
                  className={`w-full py-7 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] transition-all shadow-xl flex items-center justify-center space-x-4 active:scale-[0.98] ${
                    isProcessing || !selectedReason
                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                    : 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200'
                  }`}
                 >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Cancellation</span>
                      <ShieldAlert className="w-5 h-5" />
                    </>
                  )}
                 </button>
                 
                 <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors py-2"
                 >
                    Nevermind, I'll stay for now
                 </button>
              </div>

              <div className="flex items-center justify-center space-x-3 text-[9px] font-black text-slate-300 uppercase tracking-widest pt-4">
                 <MessageSquare className="w-3.5 h-3.5" />
                 <span>Your feedback is securely processed and reviewed.</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscription;
