
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Film, 
  Play, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Video, 
  Monitor, 
  Smartphone, 
  Layers, 
  Zap,
  PlayCircle,
  Search,
  Lock,
  Crown,
  ShieldAlert,
  Sparkles,
  Waves
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../store';

const MOTION_CATEGORIES = [
  "Abstract Organic Motion",
  "Liquid / Glossy Motion"
];

const MotionVideos: React.FC = () => {
  const { motionVideos, auth } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredVideos = useMemo(() => {
    return motionVideos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           video.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? video.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, motionVideos]);

  const getCategoryIcon = (category: string) => {
    if (category.includes('Organic')) return <Sparkles className="w-3 h-3" />;
    if (category.includes('Liquid')) return <Waves className="w-3 h-3" />;
    return <Video className="w-3 h-3" />;
  };

  return (
    <div className="bg-white min-h-screen selection:bg-violet-600 selection:text-white">
      <header className="relative py-24 md:py-48 overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.4] pointer-events-none"></div>
        <div className="max-w-[1536px] mx-auto px-6 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 md:gap-24">
            <div className="lg:max-w-3xl space-y-8">
              <div className="flex items-center space-x-4 text-violet-600">
                <div className="w-12 h-px bg-violet-600"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Professional Motion Archive</span>
              </div>
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter uppercase leading-[0.8] animate-in fade-in slide-in-from-bottom-8 duration-700">
                Motion <br />
                <span className="text-violet-600">Archive.</span>
              </h1>
              <p className="text-slate-500 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
                A premium collection of high-bitrate animations and cinematic backgrounds for modern creators.
              </p>
            </div>
            <div className="lg:w-1/3 grid grid-cols-2 gap-4">
               {[
                 { icon: Monitor, label: "4K Resolution" },
                 { icon: Smartphone, label: "Vertical Ready" },
                 { icon: Layers, label: "Alpha Channels" },
                 { icon: Zap, label: "Perfect Loops" }
               ].map((item, idx) => (
                 <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center text-center space-y-4 hover:bg-white hover:shadow-xl transition-all group">
                    <item.icon className="w-6 h-6 text-slate-400 group-hover:text-violet-600 transition-colors" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 md:py-24 bg-slate-50/50">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16">
          <div className="mb-16 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                  Elite <span className="text-violet-600">Motion.</span>
                </h2>
                <p className="text-slate-500 font-medium text-[10px] uppercase tracking-[0.2em]">Select a category to filter the archive</p>
              </div>
              <div className="relative group w-full md:w-80">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-violet-600" />
                <input 
                  type="text" 
                  placeholder="Search motion assets..." 
                  className="bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-8 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-violet-600/5 focus:border-violet-600 transition-all w-full shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => setSelectedCategory(null)} 
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${selectedCategory === null ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-slate-200 hover:border-violet-600 hover:text-slate-900 shadow-sm'}`}
              >
                All Master Videos
              </button>
              {MOTION_CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)} 
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-3 ${selectedCategory === cat ? 'bg-violet-600 text-white border-violet-600 shadow-xl' : 'bg-white text-slate-400 border-slate-200 hover:border-violet-600 hover:text-slate-900 shadow-sm'}`}
                >
                  {getCategoryIcon(cat)}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
             {filteredVideos.length > 0 ? filteredVideos.map((video) => (
               <Link key={video.id} to={`/motion-videos/${video.id}`} className="group relative bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-video relative overflow-hidden bg-slate-900">
                     <img src={video.thumbnail} className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" alt={video.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500"><Play className="w-6 h-6 text-slate-900 ml-1" /></div>
                     </div>
                     <div className="absolute bottom-6 left-6 flex items-center space-x-2">
                        <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-white/10"><Clock className="w-3 h-3" /> {video.duration}</div>
                        <div className="bg-violet-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-violet-400">{video.resolution}</div>
                     </div>
                  </div>
                  <div className="p-8 space-y-2">
                     <div className="flex items-center space-x-2">
                        {getCategoryIcon(video.category)}
                        <span className="text-[9px] font-black text-violet-600 uppercase tracking-widest">{video.category}</span>
                     </div>
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none group-hover:text-violet-600 transition-colors">{video.title}</h3>
                  </div>
               </Link>
             )) : (
               <div className="col-span-full py-40 text-center space-y-6">
                 <Film className="w-16 h-16 text-slate-100 mx-auto" />
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No motion assets found in this category.</p>
                 <button onClick={() => { setSearchTerm(''); setSelectedCategory(null); }} className="text-violet-600 font-black uppercase text-[10px] tracking-widest underline">Reset Gallery</button>
               </div>
             )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MotionVideos;
