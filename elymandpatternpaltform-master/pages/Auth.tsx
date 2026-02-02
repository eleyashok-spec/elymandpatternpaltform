
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { Mail, Lock, User, ArrowLeft, AlertCircle, CheckCircle2, Loader2, ShieldCheck, ChevronRight } from 'lucide-react';
import { supabase } from '../supabase';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { login, register, auth, refreshData } = useApp();
  
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  // Regular check for existing sessions
  useEffect(() => {
    if (auth.isAuthenticated && !loading) {
       const role = auth.user?.role || 'user';
       navigate(role === 'admin' ? '/admin' : '/dashboard', { replace: true });
    }
  }, [auth.isAuthenticated, auth.user?.role, navigate, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error: loginError } = await login(formData.email, formData.password);
        
        if (loginError) {
          setError(loginError.message);
          setLoading(false);
        } else if (data?.user) {
          setSuccessMessage("Verifying...");
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .maybeSingle();

          const detectedRole = profile?.role || data.user.app_metadata?.role || 'user';
          await refreshData();
          
          setLoading(false);
          const target = detectedRole === 'admin' ? '/admin' : '/dashboard';
          navigate(target, { replace: true });
        }
      } else {
        const { data, error: regError } = await register(formData.email, formData.password, formData.name);
        
        if (regError) {
          setError(regError.message);
          setLoading(false);
        } else {
          setSuccessMessage("Registration successful.");
          setTimeout(() => navigate('/dashboard', { replace: true }), 1000);
        }
      }
    } catch (err) {
      setError("Connectivity issue. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 selection:bg-violet-600 selection:text-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:40px_40px] opacity-40"></div>
      <div className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] bg-violet-100/50 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Floating Home Link */}
      <div className="absolute top-8 left-8 z-20">
        <Link to="/" className="flex items-center space-x-3 bg-white/80 backdrop-blur-md border border-slate-200 px-5 py-2.5 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] hover:text-violet-600 hover:border-violet-300 transition-all shadow-sm group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
          
          {/* Header Area */}
          <div className="px-10 pt-12 pb-8 text-center border-b border-slate-50">
            <div className="flex justify-center mb-6">
               <div className="w-16 h-16 bg-slate-900 text-violet-400 rounded-2xl flex items-center justify-center shadow-2xl">
                  <ShieldCheck className="w-8 h-8" />
               </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-3">
              {isLogin ? 'Login' : 'Join Us'}
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              {isLogin ? 'Access the Master Archive' : 'Start your creative journey'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex p-2 bg-slate-50/80 mx-10 mt-8 rounded-2xl border border-slate-100">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${isLogin ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${!isLogin ? 'bg-white text-violet-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Register
            </button>
          </div>

          <div className="p-10 md:p-12">
            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center space-x-3 text-rose-600 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="text-[10px] font-black uppercase tracking-tight leading-none">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center space-x-3 text-emerald-600 animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <p className="text-[10px] font-black uppercase tracking-tight leading-none">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" required placeholder="Design Studio / Name" value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 pl-12 text-sm font-bold text-slate-900 outline-none focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-500/5 transition-all"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" required placeholder="your@email.com" value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 pl-12 text-sm font-bold text-slate-900 outline-none focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-500/5 transition-all"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                   {isLogin && (
                     /* Removed invalid 'size' prop */
                     <Link to="/forgot-password" className="text-[9px] font-black text-violet-600 uppercase tracking-widest hover:text-slate-900 transition-colors">
                        Forgot Password?
                     </Link>
                   )}
                </div>
                <div className="relative">
                  <input 
                    type="password" required minLength={8} placeholder="••••••••" value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 pl-12 text-sm font-bold text-slate-900 outline-none focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-500/5 transition-all"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={`w-full py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] transition-all shadow-xl flex items-center justify-center space-x-3 active:scale-[0.98] ${loading ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 hover:bg-violet-600 text-white shadow-slate-200'}`}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <span>{isLogin ? 'Login' : 'Create Account'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                By continuing, you agree to the <br /> 
                <Link to="/terms" className="text-slate-900 font-black hover:text-violet-600">Terms of Service</Link> and <Link to="/privacy" className="text-slate-900 font-black hover:text-violet-600">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Footer Reassurance */}
      <div className="mt-12 flex items-center space-x-6 opacity-40 grayscale">
         <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[8px] font-black uppercase tracking-widest">256-bit Secure</span>
         </div>
         <div className="w-px h-3 bg-slate-300"></div>
         <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="text-[8px] font-black uppercase tracking-widest">Privacy Protected</span>
         </div>
      </div>
    </div>
  );
};

export default Auth;
