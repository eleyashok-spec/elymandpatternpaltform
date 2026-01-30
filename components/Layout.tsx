
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../store';
import { 
  LogOut, 
  Menu, 
  X, 
  ChevronRight, 
  Settings2, 
  Instagram, 
  Twitter, 
  Linkedin,
  Globe,
  CheckCircle2,
  Facebook,
  Headphones,
  Film,
  LayoutGrid,
  ShieldCheck,
  Zap,
  Box,
  ArrowUpRight,
  Shield,
  CreditCard,
  Lock
} from 'lucide-react';
import { Logo, LogoText } from './Logo';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, logout } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = auth.user?.role === 'admin';
  const isAuthPage = ['/login', '/register', '/forgot-password', '/verify-email', '/verify-success'].includes(location.pathname);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Patterns', path: '/category' },
    { name: 'Motion', path: '/motion-videos' },
    { name: 'Contact', path: '/contact' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  const userInitials = auth.user?.name ? auth.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isAuthPage && (
        <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-[100] h-16 md:h-20 shadow-sm flex items-center">
          <div className="max-w-[1536px] mx-auto px-4 md:px-6 w-full">
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center space-x-2 md:space-x-3">
                  <Logo size={22} className="md:w-8 md:h-8 shrink-0" />
                  <div className="text-base md:text-xl shrink-0"><LogoText /></div>
                </Link>
              </div>
              
              <div className="hidden lg:flex flex-1 justify-center space-x-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-violet-600 ${location.pathname === link.path ? 'text-violet-600' : 'text-slate-400'}`}
                  >
                    {link.name}
                  </Link>
                ))}
                {isAdmin && (
                  <Link to="/admin" className={`text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 flex items-center space-x-2`}>
                    <Settings2 className="w-3.5 h-3.5" /><span>Admin Panel</span>
                  </Link>
                )}
              </div>

              <div className="hidden lg:flex items-center space-x-6">
                {auth.isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <Link to="/dashboard" className="group flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-slate-50 overflow-hidden hover:scale-105 transition-all shadow-sm active:scale-95">
                      {auth.user?.profileImage ? (
                        <img src={auth.user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-violet-50 text-violet-600 text-[10px] font-black">{userInitials}</div>
                      )}
                    </Link>
                    <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-6">
                    <Link to="/login" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-violet-600">Login</Link>
                    <Link to="/register" className="bg-black text-white px-6 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-violet-600 transition-all shadow-lg shadow-violet-200">Join Pro</Link>
                  </div>
                )}
              </div>

              <div className="lg:hidden">
                <button onClick={toggleMobileMenu} className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 active:bg-slate-200 transition-colors">
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {!isAuthPage && (
        <>
          <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu} />
          <div className={`fixed top-0 right-0 h-full w-[85%] max-w-xs bg-white z-[250] lg:hidden shadow-2xl transition-transform duration-300 transform border-l border-slate-100 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center space-x-2"><Logo size={20} /><div className="text-sm"><LogoText /></div></div>
              <button onClick={closeMenu} className="p-2 text-slate-400 hover:text-slate-900"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-grow overflow-y-auto px-6 py-8 space-y-8">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4 ml-1">Menu</p>
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} className={`flex items-center justify-between p-3 rounded-xl transition-all ${location.pathname === link.path ? 'bg-violet-50 text-violet-600' : 'text-slate-600 active:bg-slate-50'}`}>
                    <span className="text-[11px] font-bold uppercase tracking-widest">{link.name}</span>
                    <ChevronRight className={`w-4 h-4 ${location.pathname === link.path ? 'opacity-100' : 'opacity-20'}`} />
                  </Link>
                ))}
                {isAdmin && (
                   <Link to="/admin" className="flex items-center justify-between p-3 rounded-xl transition-all text-emerald-600 border border-emerald-50 bg-emerald-50/30">
                    <span className="text-[11px] font-bold uppercase tracking-widest">Admin Panel</span>
                    <Settings2 className="w-4 h-4" />
                   </Link>
                )}
              </div>
              {auth.isAuthenticated ? (
                <div className="pt-6 border-t border-slate-100">
                  <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-3 p-4 bg-rose-50 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    <LogOut className="w-4 h-4" />
                    <span>Logout Account</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <Link to="/login" className="block w-full text-center p-4 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900">Login</Link>
                  <Link to="/register" className="block w-full text-center p-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Join Now</Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <main className="flex-grow">{children}</main>

      {!isAuthPage && (
        <footer className="bg-slate-900 text-white pt-24 pb-12 border-t border-slate-800">
          <div className="max-w-[1536px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-12 lg:gap-24 mb-24">
              {/* BRAND COLUMN */}
              <div className="lg:col-span-4 space-y-8">
                <div className="flex items-center space-x-3">
                  <Logo size={28} className="text-violet-400" />
                  <LogoText className="text-2xl text-white" />
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm uppercase tracking-tight">
                  Elymand is a premium digital library providing high-resolution vector patterns and cinematic motion graphics. Built for agencies, designers, and professional brands seeking global commercial readiness.
                </p>
                <div className="pt-4 flex flex-col space-y-4">
                  <div className="flex items-center space-x-3 text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Human-Vetted Original Assets</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-500">
                    <Lock className="w-4 h-4 text-violet-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Secure 256-bit Encrypted Payments</span>
                  </div>
                </div>
              </div>

              {/* LINKS COLUMNS */}
              <div className="lg:col-span-2 space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-b border-white/5 pb-4">Archive</h4>
                <nav className="flex flex-col space-y-4">
                  <Link to="/category" className="text-[11px] font-bold uppercase tracking-widest hover:text-violet-400 transition-colors">Patterns</Link>
                  <Link to="/motion-videos" className="text-[11px] font-bold uppercase tracking-widest hover:text-violet-400 transition-colors">Motion</Link>
                  <Link to="/pricing" className="text-[11px] font-bold uppercase tracking-widest text-violet-400 flex items-center group">
                    Membership <ArrowUpRight className="ml-1 w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </nav>
              </div>

              <div className="lg:col-span-2 space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-b border-white/5 pb-4">Company</h4>
                <nav className="flex flex-col space-y-4">
                  <Link to="/about" className="text-[11px] font-bold uppercase tracking-widest hover:text-violet-400 transition-colors">About Us</Link>
                  <Link to="/contact" className="text-[11px] font-bold uppercase tracking-widest hover:text-violet-400 transition-colors">Contact</Link>
                  <Link to="/faq" className="text-[11px] font-bold uppercase tracking-widest hover:text-violet-400 transition-colors">FAQ</Link>
                </nav>
              </div>

              <div className="lg:col-span-2 space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-b border-white/5 pb-4">Legal</h4>
                <nav className="flex flex-col space-y-4">
                  <Link to="/terms" className="text-[11px] font-bold uppercase tracking-widest hover:text-violet-400 transition-colors">Terms of Service</Link>
                  <Link to="/privacy" className="text-[11px] font-bold uppercase tracking-widest hover:text-violet-400 transition-colors">Privacy Policy</Link>
                  <Link to="/license" className="text-[11px] font-bold uppercase tracking-widest hover:text-violet-400 transition-colors">License Agreement</Link>
                  <Link to="/refund" className="text-[11px] font-bold uppercase tracking-widest hover:text-violet-400 transition-colors">Refund Policy</Link>
                </nav>
              </div>

              {/* MEMBERSHIP CTA */}
              <div className="lg:col-span-2 space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-b border-white/5 pb-4">Membership</h4>
                <div className="space-y-6">
                  <Link to="/pricing" className="block w-full text-center py-4 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-violet-600 hover:text-white transition-all shadow-xl">
                    Join Pro Plan
                  </Link>
                  <div className="flex justify-center space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
                    <Facebook className="w-4 h-4 hover:text-blue-500" />
                    <Twitter className="w-4 h-4 hover:text-sky-400" />
                    <Instagram className="w-4 h-4 hover:text-pink-500" />
                    <Linkedin className="w-4 h-4 hover:text-blue-700" />
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <p className="text-[10px] font-black text-slate-500 tracking-tight">&copy; 2026 Elymand. All Rights Reserved.</p>
                <div className="flex items-center space-x-3 text-slate-600">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[8px] font-black uppercase tracking-widest">Global Payments via 2Checkout (Verifone)</span>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-slate-400">
                <div className="flex items-center space-x-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em]">Safe Checkout Verified</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
