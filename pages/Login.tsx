
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { Mail, Lock, ArrowLeft, AlertCircle, Loader2, ShieldCheck, ChevronRight } from 'lucide-react';
import { supabase } from '../supabase';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, auth, refreshData } = useApp();
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (auth.isAuthenticated && !loading) {
       const role = auth.user?.role || 'user';
       navigate(role === 'admin' ? '/admin' : '/dashboard', { replace: true });
    }
  }, [auth.isAuthenticated, auth.user?.role, navigate, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: loginError } = await login(formData.email, formData.password);
      
      if (loginError) {
        setError("Account details incorrect. Please verify your email and password.");
        setLoading(false);
      } else if (data?.user) {
        // Explicitly wait for fresh data and session propagation
        await refreshData();
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .maybeSingle();

        const detectedRole = profile?.role || data.user.app_metadata?.role || 'user';
        
        setLoading(false);
        const target = detectedRole === 'admin' ? '/admin' : '/dashboard';
        navigate(target, { replace: true });
      }
    } catch (err) {
      setError("Network error. Please check your connectivity.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 selection:bg-violet-600 selection:text-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:40px_40px] opacity-40"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
          
          <div className="px-10 pt-10 pb-8 text-center border-b border-slate-50 relative">
            {/* Home Link Inside the Box */}
            <div className="flex justify-start mb-6">
              <Link to="/" className="flex items-center space-x-2 text-[11px] font-bold text-slate-400 hover:text-violet-600 transition-colors uppercase tracking-widest group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Home</span>
              </Link>
            </div>

            <div className="flex justify-center mb-6">
               <div className="w-16 h-16 bg-slate-900 text-violet-400 rounded-2xl flex items-center justify-center shadow-2xl">
                  <ShieldCheck className="w-8 h-8" />
               </div>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-3">
              Login
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Please sign in to your account.
            </p>
          </div>

          <div className="p-10 md:p-12">
            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center space-x-3 text-rose-600 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="text-[10px] font-black uppercase tracking-tight leading-none">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" required placeholder="name@email.com" value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 pl-12 text-sm font-bold text-slate-900 outline-none focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-500/5 transition-all"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                   <Link to="/forgot-password" className="text-[9px] font-black text-violet-600 uppercase tracking-widest hover:text-slate-900 transition-colors">
                      Forgot Password?
                   </Link>
                </div>
                <div className="relative">
                  <input 
                    type="password" required placeholder="••••••••" value={formData.password}
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
                    <span>Login</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Don't have an account? <Link to="/register" className="text-violet-600 font-black hover:underline">Create one here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
