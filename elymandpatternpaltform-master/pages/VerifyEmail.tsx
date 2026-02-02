
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailOpen, ArrowLeft, RefreshCw, ShieldCheck, CheckCircle2, Inbox, Key, AlertCircle, Loader2 } from 'lucide-react';
import { useApp } from '../store';

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const { auth, sendVerificationCode, confirmVerification } = useApp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [showDebugCode, setShowDebugCode] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Safety check: if already verified, go to dashboard
    if (auth.user?.isVerified) {
      navigate('/dashboard', { replace: true });
      return;
    }

    // Generate initial code on mount
    if (auth.isAuthenticated && !auth.user?.isVerified) {
      const code = sendVerificationCode();
      setShowDebugCode(code);
      // Hide debug code after 10 seconds
      const timer = setTimeout(() => setShowDebugCode(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [auth.user?.isVerified, auth.isAuthenticated, navigate, sendVerificationCode]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...otp];
    // Take only the last character entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError(null);

    // Focus next input if a value was entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter the full 6-digit code');
      return;
    }

    setIsVerifying(true);
    // Simulate real verification network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const success = confirmVerification(code);
    if (success) {
      navigate('/verify-success');
    } else {
      setError('The code you entered is incorrect. Please try again.');
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError(null);
    setOtp(['', '', '', '', '', '']);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const code = sendVerificationCode();
    setShowDebugCode(code);
    setIsResending(false);
    // Hide debug code after 10 seconds
    setTimeout(() => setShowDebugCode(null), 10000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-4 md:p-6 relative overflow-hidden selection:bg-violet-600 selection:text-white">
      {/* Debug Notification for testing/demo purposes */}
      {showDebugCode && (
        <div className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-[300] bg-slate-900 text-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border border-white/10 animate-in slide-in-from-right duration-500 max-w-[280px] md:max-w-xs">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-violet-400">Security Assistant</p>
              <p className="text-sm font-bold leading-relaxed">Your code is: <span className="text-violet-400 font-black">{showDebugCode}</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="w-full max-w-lg bg-white rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] p-6 md:p-16 relative z-10 text-center">
        
        <div className="text-left mb-8 md:mb-10">
          <Link to="/" className="inline-flex items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-violet-600 transition-colors group">
            <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-violet-50 text-violet-600 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mx-auto shadow-lg border border-violet-100">
            <Key className="w-6 h-6 md:w-8 md:h-8" />
          </div>

          <div className="space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Verify your Elymand Account
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
              We've sent a 6-digit verification code to <br />
              <span className="text-slate-900 font-bold break-all">{auth.user?.email}</span>
            </p>
          </div>

          {/* OTP Input Grid - Fixed for Mobile */}
          <div className="space-y-6">
            <div className="flex justify-center gap-1.5 md:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => { inputRefs.current[idx] = el; }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(idx, e.target.value)}
                  onKeyDown={e => handleKeyDown(idx, e)}
                  className={`w-10 h-14 md:w-16 md:h-20 text-center text-2xl md:text-3xl font-black bg-slate-50 border-2 rounded-xl md:rounded-2xl outline-none transition-all flex items-center justify-center text-black caret-violet-600 ${
                    error 
                      ? 'border-rose-200 text-rose-600 bg-rose-50' 
                      : 'border-slate-100 focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-500/10'
                  }`}
                />
              ))}
            </div>

            {error && (
              <div className="flex items-center justify-center space-x-2 text-rose-500 font-bold uppercase text-[10px] tracking-widest animate-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-2 md:pt-4">
            <button 
              onClick={handleVerify}
              disabled={isVerifying || otp.includes('')}
              className={`w-full py-5 md:py-6 rounded-xl md:rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-3 ${
                isVerifying || otp.includes('') 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                : 'bg-slate-900 text-white hover:bg-violet-600 shadow-slate-200'
              }`}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <span>Verify Account</span>
              )}
            </button>
            
            <div className="pt-2 md:pt-4 flex flex-col items-center space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Didn't receive the email?</p>
              <button 
                onClick={handleResend}
                disabled={isResending}
                className="group flex items-center space-x-2 text-violet-600 font-black uppercase text-[10px] tracking-[0.2em] hover:text-slate-900 transition-colors disabled:opacity-50"
              >
                {isResending ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-700" />
                )}
                <span>Resend code</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-50 flex items-center justify-center space-x-3 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Secure Verification Protocol</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
