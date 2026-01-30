
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, ShieldCheck, Key, CheckCircle2, Loader2, HelpCircle, Lock, AlertCircle, RefreshCw, Sparkles, UserCheck } from 'lucide-react';
import { useApp } from '../store';

type ResetStep = 'request' | 'validating-email' | 'verify' | 'validating-otp' | 'success';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { requestPasswordReset, completePasswordReset } = useApp();
  
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<ResetStep>('request');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [error, setError] = useState<string | null>(null);
  const [debugCode, setDebugCode] = useState<string | null>(null);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 1 -> Step 2
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep('validating-email');
    
    // Simulate real network check
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const code = requestPasswordReset(email);
    setDebugCode(code);
    setStep('verify');
    
    // Auto-hide debug code after 15s
    setTimeout(() => setDebugCode(null), 15000);
  };

  // Step 3 -> Step 4 -> Step 5
  const handleCompleteReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setError('The passwords you entered do not match. Please try again.');
      return;
    }
    if (passwords.new.length < 8) {
      setError('For your security, your password must be at least 8 characters long.');
      return;
    }

    setStep('validating-otp');
    const code = otp.join('');
    
    // Simulate deep token validation
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const success = completePasswordReset(email, code);
    if (success) {
      setStep('success');
    } else {
      setError('The security code you entered is invalid or has expired.');
      setStep('verify');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError(null);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-6 relative overflow-hidden selection:bg-violet-600 selection:text-white">
      {/* Debug Assistant - Helpful for local testing/deployment preview */}
      {debugCode && (
        <div className="fixed bottom-10 right-10 z-[300] bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl border border-white/10 animate-in slide-in-from-right duration-500 max-w-xs">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-violet-400">Security Notification</p>
              <p className="text-sm font-bold leading-relaxed">System-generated recovery code: <span className="text-violet-400 font-black">{debugCode}</span></p>
            </div>
          </div>
        </div>
      )}

      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-slate-900 select-none">
          ELYMAND
        </div>
      </div>

      <div className="w-full max-w-lg bg-white rounded-[3rem] border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] p-10 md:p-16 relative z-10 transition-all min-h-[500px] flex flex-col justify-center">
        
        {/* PROGRESSIVE HEADERS */}
        {(step === 'request' || step === 'verify' || step === 'success') && (
          <div className="mb-10 text-left">
            {step !== 'success' && (
              <Link to="/login" className="inline-flex items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-violet-600 transition-colors mb-8 group">
                <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Login
              </Link>
            )}

            {step === 'request' && (
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                  Reset Password
                </h1>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  Enter your email address and we'll send you a professional security code to reset your password.
                </p>
              </div>
            )}

            {step === 'verify' && (
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                  Verify Identity
                </h1>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  We have sent your security code to <span className="text-slate-900 font-bold">{email}</span>. Please enter it below.
                </p>
              </div>
            )}

            {step === 'success' && (
              <div className="space-y-6 text-center">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-emerald-100 border border-emerald-100 mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                    All set!
                  </h1>
                  <p className="text-slate-500 font-medium text-base leading-relaxed">
                    Your password has been successfully updated. You can now log back into your Elymand account.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* INTERMEDIATE LOADING STATES ("VALIDATING TOKEN..." EQUIVALENT IN NORMAL ENGLISH) */}
        {step === 'validating-email' && (
          <div className="text-center space-y-8 py-12 animate-in fade-in duration-500">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-200 blur-2xl rounded-full animate-pulse"></div>
                <Loader2 className="w-16 h-16 text-violet-600 animate-spin relative z-10" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Searching for account...</h2>
              <p className="text-slate-500 font-medium text-sm uppercase tracking-widest leading-relaxed">
                We are checking our database to securely identify your registered email.
              </p>
            </div>
          </div>
        )}

        {step === 'validating-otp' && (
          <div className="text-center space-y-8 py-12 animate-in fade-in duration-500">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-200 blur-2xl rounded-full animate-pulse"></div>
                <Loader2 className="w-16 h-16 text-emerald-600 animate-spin relative z-10" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Validating Token...</h2>
              <p className="text-slate-500 font-medium text-sm uppercase tracking-widest leading-relaxed">
                We are confirming your security token and updating your account credentials.
              </p>
            </div>
          </div>
        )}

        {/* FORMS */}
        {step === 'request' && (
          <form onSubmit={handleRequestReset} className="space-y-8 animate-in fade-in duration-500">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Account Email</label>
              <div className="relative group">
                <input 
                  type="email" 
                  required
                  placeholder="your@email.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 pl-12 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-600 transition-all placeholder:text-slate-300"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-violet-600 transition-colors" />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 hover:bg-violet-600 text-white py-6 rounded-[1.8rem] font-black uppercase text-[11px] tracking-[0.4em] transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-3 group"
            >
              <Key className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Continue Recovery</span>
            </button>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={handleCompleteReset} className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
            {/* OTP Grid */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-center block">Security Code</label>
              <div className="flex justify-center gap-2 md:gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    // Fix: Ensure ref callback returns void to satisfy TypeScript types
                    ref={el => { inputRefs.current[idx] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(idx, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(idx, e)}
                    className={`w-11 h-16 md:w-14 md:h-20 text-center text-3xl font-black bg-slate-50 border-2 rounded-2xl outline-none transition-all text-black ${
                      error ? 'border-rose-200 text-rose-600 bg-rose-50' : 'border-slate-100 focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-500/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Create New Password</label>
                <div className="relative group">
                  <input 
                    type="password" 
                    required
                    minLength={8}
                    placeholder="••••••••" 
                    value={passwords.new}
                    onChange={e => setPasswords({...passwords, new: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 pl-12 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-600 transition-all placeholder:text-slate-300"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-violet-600 transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm Your Password</label>
                <div className="relative group">
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••" 
                    value={passwords.confirm}
                    onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 pl-12 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-600 transition-all placeholder:text-slate-300"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-violet-600 transition-colors" />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center justify-center space-x-2 text-rose-500 font-bold uppercase text-[10px] tracking-widest animate-in fade-in">
                <AlertCircle className="w-4 h-4" />
                <span className="text-center">{error}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-slate-900 hover:bg-violet-600 text-white py-6 rounded-[1.8rem] font-black uppercase text-[11px] tracking-[0.4em] transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-3 group"
            >
              <span>Update Password</span>
            </button>
            
            <button 
              type="button"
              onClick={() => setStep('request')}
              className="w-full text-slate-400 font-black uppercase text-[9px] tracking-widest hover:text-slate-900 transition-colors py-2"
            >
              Use a different email address
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="space-y-6 animate-in zoom-in-95 duration-700">
            <button 
              onClick={() => navigate('/login')}
              className="w-full py-6 bg-slate-900 hover:bg-violet-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] transition-all shadow-xl flex items-center justify-center space-x-4 group"
            >
              <span>Login to Elymand</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col items-center space-y-6">
          {step === 'request' && (
            <Link 
              to="/contact" 
              className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors group"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Need help? Contact our security team</span>
            </Link>
          )}
          
          <div className="flex items-center space-x-3 text-slate-300 opacity-80">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Elymand Recovery Protocol V2.1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
