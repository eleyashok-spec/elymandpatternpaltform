
import React, { useMemo, useState } from 'react';
import { useApp } from '../store';
import { 
  ArrowRight, 
  Crown, 
  Layers, 
  Monitor, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Zap, 
  PenTool,
  Clock,
  Globe,
  Palette,
  Eye,
  Box,
  LayoutGrid,
  ChevronRight,
  Video
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const { auth, patterns } = useApp();
  const navigate = useNavigate();
  const [aiSearch, setAiSearch] = useState('');

  const gridAssets = useMemo(() => {
    const base = patterns.length > 0 ? patterns : [
      { id: '1', thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800' },
      { id: '2', thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800' },
      { id: '3', thumbnail: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800' },
      { id: '4', thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800' },
      { id: '5', thumbnail: 'https://images.unsplash.com/photo-1618004912976-3b585184353e?auto=format&fit=crop&q=80&w=800' },
      { id: '6', thumbnail: 'https://images.unsplash.com/photo-1627163439134-7a8c47ee8020?auto=format&fit=crop&q=80&w=800' },
    ];
    return [...base, ...base, ...base, ...base];
  }, [patterns]);

  const featuredPatterns = useMemo(() => {
    return patterns.slice(0, 6);
  }, [patterns]);

  const handleAiSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiSearch.trim()) {
      navigate(`/category?search=${encodeURIComponent(aiSearch)}`);
    }
  };

  const steps = [
    { 
      title: "Browse & Discover", 
      desc: "Use our search or AI tools to find the perfect pattern or video for your project.", 
      icon: Search,
      color: "bg-violet-50 text-violet-600"
    },
    { 
      title: "Instant Download", 
      desc: "Get high-quality files immediately. No waiting, no complicated steps.", 
      icon: Zap,
      color: "bg-emerald-50 text-emerald-600"
    },
    { 
      title: "Create & Publish", 
      desc: "Use your assets in any design software with our simple, safe commercial license.", 
      icon: PenTool,
      color: "bg-blue-50 text-blue-600"
    }
  ];

  const collections = [
    {
      title: "Geometric Minimalism",
      desc: "Sharp, high-res vector patterns for modern branding.",
      img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800",
      query: "Geometric"
    },
    {
      title: "Artisanal Florals",
      desc: "Hand-painted botanical designs in layered formats.",
      img: "https://images.unsplash.com/photo-1576016770956-debb63d92058?auto=format&fit=crop&q=80&w=800",
      query: "Floral"
    },
    {
      title: "Refractive Glass",
      desc: "High-end 4K liquid motion with realistic light physics.",
      img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800",
      query: "Liquid"
    },
    {
      title: "Cinematic Overlays",
      desc: "Atmospheric motion graphics for high-end video.",
      img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
      query: "Abstract"
    }
  ];

  const trustSignals = [
    { 
      title: "Commercial License", 
      desc: "Safe to use for any business or client project.", 
      icon: Globe 
    },
    { 
      title: "High-Quality Assets", 
      desc: "Professional 4K files ready for high-end production.", 
      icon: Monitor 
    },
    { 
      title: "24/7 Global Support", 
      desc: "We're here to help whenever you have a question.", 
      icon: Clock 
    }
  ];

  return (
    <div className="bg-white selection:bg-violet-600 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-32 pb-24">
        
        {/* Animated Background - Enhanced Visibility */}
        <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-40 px-4">
           {[0, 1, 2, 3].map(col => (
             <div key={col} className={`flex flex-col gap-6 ${col % 2 === 0 ? 'animate-marquee-up' : 'animate-marquee-down'}`}>
                {gridAssets.map((asset, i) => (
                  <div key={`${asset.id}-${col}-${i}`} className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                     <img src={asset.thumbnail} className="w-full h-full object-cover" alt="" />
                  </div>
                ))}
             </div>
           ))}
        </div>

        {/* Softened Overlays to show more background patterns */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20 z-[1]"></div>
        <div className="absolute inset-0 bg-slate-950/30 z-[1]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-10 md:space-y-12">
           <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/20 px-4 sm:px-6 py-2 rounded-full shadow-2xl">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-white">Professional Asset Library</span>
           </div>

           <div className="space-y-6 md:space-y-10">
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8.5rem] font-black text-white tracking-tighter uppercase leading-[0.9] drop-shadow-2xl">
                Professional <br />
                Assets For Your <br />
                Next <span className="text-violet-500">Project.</span>
              </h1>
              <p className="text-slate-200 text-base sm:text-lg md:text-2xl font-medium leading-relaxed max-w-4xl mx-auto px-4 drop-shadow-lg">
                Discover thousands of high-quality patterns and 4K motion backgrounds. Built for designers and video editors who need professional results, fast.
              </p>
           </div>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6">
              {auth.isAuthenticated ? (
                <Link to="/dashboard" className="w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 bg-white text-slate-950 rounded-2xl font-black uppercase text-[11px] sm:text-[12px] tracking-widest hover:bg-violet-600 hover:text-white transition-all shadow-2xl flex items-center justify-center min-w-[240px]">
                   Go to My Account <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              ) : (
                <Link to="/register" className="w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 bg-violet-600 text-white rounded-2xl font-black uppercase text-[11px] sm:text-[12px] tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-2xl flex items-center justify-center min-w-[240px]">
                   Get 2 Free Downloads <Crown className="ml-3 w-5 h-5 text-amber-400" />
                </Link>
              )}
              <Link to="/category" className="w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 bg-white/5 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-black uppercase text-[11px] sm:text-[12px] tracking-widest hover:bg-white/10 transition-all flex items-center justify-center min-w-[240px]">
                 Browse The Collection <Layers className="ml-3 w-5 h-5 opacity-40" />
              </Link>
           </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-20 md:py-40 bg-white">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16">
           <div className="text-center mb-16 md:mb-20 space-y-4">
              <h2 className="text-[10px] sm:text-[11px] font-black text-violet-600 uppercase tracking-[0.6em]">Simple Process</h2>
              <h3 className="text-3xl sm:text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">From Idea to Finish <br className="hidden md:block" /> In Minutes.</h3>
              <p className="text-slate-500 text-base sm:text-lg md:text-2xl font-medium max-w-2xl mx-auto">Our platform is designed to be fast and easy to use.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((step, i) => (
                <div key={i} className="space-y-6 md:space-y-8 p-8 md:p-10 bg-slate-50 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                   <div className={`w-16 h-16 md:w-20 md:h-20 ${step.color} rounded-2xl md:rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <step.icon className="w-7 h-7 md:w-9 md:h-9" />
                   </div>
                   <div className="space-y-3 md:space-y-4">
                      <h4 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">{step.title}</h4>
                      <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">{step.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- FEATURED COLLECTIONS --- */}
      <section className="py-20 md:py-40 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 md:gap-12 mb-16 md:mb-20">
            <div className="space-y-6">
               <h2 className="text-[10px] sm:text-[11px] font-black text-violet-400 uppercase tracking-[0.6em]">Trending Styles</h2>
               <h3 className="text-3xl sm:text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">Explore Our <br /> Top Collections.</h3>
               <p className="text-slate-400 text-base sm:text-lg md:text-2xl font-medium max-w-2xl">Find the styles that are trending in design right now.</p>
            </div>
            <Link to="/category" className="w-full md:w-auto text-center px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all">View All Categories</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {collections.map((col, i) => (
              <Link 
                key={i} 
                to={`/category?search=${col.query}`} 
                className="group relative aspect-[3/4] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 bg-slate-900 transition-all duration-700"
              >
                <img src={col.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2s]" alt={col.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-10 space-y-2">
                  <h4 className="text-lg md:text-xl font-black uppercase tracking-tight leading-none">{col.title}</h4>
                  <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">{col.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY US --- */}
      <section className="py-20 md:py-40 bg-white">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16">
           <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
              <div className="lg:w-1/2 space-y-8 md:space-y-10">
                 <div className="space-y-6">
                    <h2 className="text-[10px] sm:text-[11px] font-black text-violet-600 uppercase tracking-[0.6em]">Professional Standards</h2>
                    <h3 className="text-3xl sm:text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">Design Quality <br /> You Can Trust.</h3>
                    <p className="text-slate-500 text-base sm:text-lg md:text-2xl font-medium leading-relaxed">
                       Join thousands of brands and designers who use our archive for their most important projects.
                    </p>
                 </div>
                 <Link to="/register" className="w-full sm:w-auto inline-flex items-center justify-center space-x-4 px-12 py-6 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] sm:text-[11px] tracking-widest hover:bg-violet-600 transition-all shadow-xl group">
                    <span>Get Started Today</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Link>
              </div>
              <div className="lg:w-1/2 w-full grid gap-6 md:gap-8">
                 {trustSignals.map((signal, i) => (
                   <div key={i} className="flex items-start space-x-6 md:space-x-8 p-8 md:p-10 bg-slate-50 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 group">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-violet-600 shadow-sm shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-all">
                         <signal.icon className="w-6 h-6 md:w-7 md:h-7" />
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">{signal.title}</h4>
                         <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">{signal.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* --- AI DISCOVERY STUDIO --- */}
      <section className="py-20 md:py-48 bg-slate-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-12 md:space-y-16">
          <div className="space-y-6">
            <h2 className="text-[10px] sm:text-[11px] font-black text-violet-600 uppercase tracking-[0.6em]">Smart Search</h2>
            <h3 className="text-3xl sm:text-4xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">The ELYMAND <br /><span className="text-violet-600">Smart Search Tool.</span></h3>
            <p className="text-slate-500 text-base sm:text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
              Find exactly what you need in seconds. Search by color, style, or resolution to find the perfect asset for your work.
            </p>
          </div>

          <form onSubmit={handleAiSearch} className="max-w-4xl mx-auto relative group px-2 sm:px-0">
            <div className="relative bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-5 flex flex-col md:flex-row gap-4 items-center shadow-2xl">
              <div className="flex-1 flex items-center px-4 sm:px-8 w-full">
                <Search className="w-5 h-5 md:w-7 md:h-7 text-slate-300 mr-4 md:mr-6" />
                <input 
                  type="text" 
                  value={aiSearch}
                  onChange={(e) => setAiSearch(e.target.value)}
                  placeholder="Try 'blue motion' or 'retro'..." 
                  className="w-full bg-transparent border-none outline-none text-base md:text-xl font-bold text-slate-900 placeholder:text-slate-200"
                />
              </div>
              <button type="submit" className="w-full md:w-auto px-10 md:px-12 py-5 md:py-6 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-widest hover:bg-violet-600 transition-all">
                Search Now
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 pt-4 md:pt-8 opacity-40">
             <div className="flex items-center space-x-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest"><Palette className="w-4 h-4 md:w-5 md:h-5" /> Color Match</div>
             <div className="flex items-center space-x-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest"><Eye className="w-4 h-4 md:w-5 md:h-5" /> Smart Filters</div>
             <div className="flex items-center space-x-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest"><Sparkles className="w-4 h-4 md:w-5 md:h-5" /> AI Features</div>
          </div>
        </div>
      </section>

      {/* --- RECENT ADDITIONS --- */}
      <section className="py-20 md:py-48 bg-white">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16">
           <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8 mb-16 md:mb-20">
              <div className="space-y-6">
                 <h2 className="text-[10px] sm:text-[11px] font-black text-violet-600 uppercase tracking-[0.6em]">The Archive</h2>
                 <h3 className="text-3xl sm:text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">Latest <br /> Additions.</h3>
              </div>
              <Link to="/category" className="w-full md:w-auto px-8 sm:px-10 py-5 bg-slate-50 border border-slate-100 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all group">
                 Explore Everything <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
              {featuredPatterns.length > 0 ? featuredPatterns.map((p) => (
                <Link key={p.id} to={`/pattern/${p.id}`} className="group relative aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-slate-100 bg-slate-50 shadow-sm hover:shadow-2xl transition-all duration-700">
                   <img src={p.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all" alt={p.title} />
                   <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="text-[8px] font-black text-white uppercase tracking-widest border border-white/30 px-3 py-2 rounded-lg backdrop-blur-md">View Asset</span>
                   </div>
                </Link>
              )) : (
                [...Array(6)].map((_, i) => <div key={i} className="aspect-square bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] animate-pulse" />)
              )}
           </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      {!auth.isAuthenticated && (
        <section className="py-24 md:py-64 bg-slate-950 text-white relative overflow-hidden text-center px-4">
           <div className="max-w-4xl mx-auto space-y-10 md:space-y-12 relative z-10">
              <h2 className="text-4xl sm:text-6xl md:text-[8rem] font-black text-white tracking-tighter uppercase leading-[0.8]">
                Join The <br /> <span className="text-violet-500">Community.</span>
              </h2>
              <p className="text-slate-400 text-lg sm:text-xl md:text-3xl font-light leading-relaxed max-w-2xl mx-auto">
                Sign up today and get instant access to the full archive. Get <span className="text-white font-black">2 Free Downloads</span> when you join.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 md:pt-10">
                <Link to="/register" className="w-full sm:w-auto px-10 sm:px-16 py-6 sm:py-8 bg-violet-600 text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-[11px] sm:text-[12px] tracking-[0.3em] md:tracking-[0.4em] shadow-2xl hover:bg-white hover:text-slate-900 transition-all">
                   Claim My 2 Free Downloads
                </Link>
                <Link to="/login" className="w-full sm:w-auto px-10 sm:px-16 py-6 sm:py-8 bg-transparent border border-white/20 text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase text-[11px] sm:text-[12px] tracking-[0.3em] md:tracking-[0.4em] hover:bg-white/5 transition-all">
                   Log In
                </Link>
              </div>
           </div>
        </section>
      )}

      <style>{`
        @keyframes marquee-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marquee-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-marquee-up {
          animation: marquee-up 120s linear infinite;
        }
        .animate-marquee-down {
          animation: marquee-down 120s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;
