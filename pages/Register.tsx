
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { Mail, Lock, User, ArrowLeft, AlertCircle, CheckCircle2, Loader2, ShieldCheck, ChevronRight } from 'lucide-react';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, auth, refreshData } = useApp();
  
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  useEffect(() => {
    // If already logged in, redirect away from register
    if (auth.isAuthenticated && !loading) {
       navigate('/dashboard', { replace: true });
    }
  }, [auth.isAuthenticated, navigate, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const { data, error: regError } = await register(formData.email, formData.password, formData.name);
      
      if (regError) {
        setError(regError.message);
        setLoading(false);
      } else {
        setSuccessMessage("Account created successfully!");
        
        // Ensure the global state is synced with the new session
        await refreshData();
        
        // Handle redirect based on whether user is automatically logged in or needs verification
        if (data?.session) {
          setLoading(false);
          navigate('/dashboard', { replace: true });
        } else {
          // If email verification is required (no session returned)
          setTimeout(() => {
            setLoading(false);
            navigate('/verify-email', { replace: true });
          }, 1500);
        }
      }
    } catch (err) {
      setError("Registration failed. Please check your data and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 selection:bg-violet-600 selection:text-white relative overflow-hidden">
      
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:40px_40px] opacity-40"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
          
          <div className="px-10 pt-10 pb-8 text-center border-b border-slate-50 relative">
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
              Create Account
            </h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Join us to start downloading assets.
            </p>
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
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
                <div className="relative">
                  <input 
                    type="text" required placeholder="Full Name" value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 pl-12 text-sm font-bold text-slate-900 outline-none focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-500/5 transition-all"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>

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
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <input 
                    type="password" required minLength={8} placeholder="At least 8 characters" value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 pl-12 text-sm font-bold text-slate-900 outline-none focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-500/5 transition-all"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] transition-all shadow-xl flex items-center justify-center space-x-3 active:scale-[0.98] ${loading ? 'bg-slate-100 text-slate-300' : 'bg-slate-900 hover:bg-violet-600 text-white shadow-slate-200'}`}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      <span>Create Account</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest leading-relaxed px-4">
                By creating an account, I agree to Elymand's <Link to="/terms" className="text-slate-900 font-black hover:text-violet-600 hover:underline">Website Terms</Link>, <Link to="/privacy" className="text-slate-900 font-black hover:text-violet-600 hover:underline">Privacy Policy</Link>, and <Link to="/license" className="text-slate-900 font-black hover:text-violet-600 hover:underline">Licensing Terms</Link>
              </p>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Already have an account? <Link to="/login" className="text-violet-600 font-black hover:underline">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
