
import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../store';
import { 
  Search, 
  Shapes,
  Flower2,
  LayoutGrid,
  Grid3X3,
  Layers,
  Leaf,
  Palette,
  Component,
  Filter,
  ArrowRight,
  Footprints,
  Image,
  Sparkles,
  Mountain
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const NEW_CATEGORIES = [
  "Abstract & Organic",
  "Floral & Botanical",
  "Nature",
  "Art",
  "Animal/Wildlife",
  "Geometric Minimal",
  "Background & Texture"
];

const CategoryPage: React.FC = () => {
  const { patterns, logs } = useApp();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'alphabetical' | 'popular'>('newest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) setSearchTerm(query);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const getCategoryIcon = (category: string | null, size: string = "w-4 h-4") => {
    if (!category) return <LayoutGrid className={size} />;
    const cat = category.toLowerCase();
    if (cat.includes('abstract')) return <Shapes className={size} />;
    if (cat.includes('floral')) return <Flower2 className={size} />;
    if (cat.includes('nature')) return <Mountain className={size} />;
    if (cat.includes('art')) return <Palette className={size} />;
    if (cat.includes('animal')) return <Footprints className={size} />;
    if (cat.includes('geometric')) return <Grid3X3 className={size} />;
    if (cat.includes('background')) return <Layers className={size} />;
    return <Component className={size} />;
  };

  const filteredPatterns = useMemo(() => {
    const downloadCounts: Record<string, number> = {};
    logs.forEach(log => { downloadCounts[log.assetId] = (downloadCounts[log.assetId] || 0) + 1; });

    return patterns.filter(p => {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch = p.title.toLowerCase().includes(lowerSearch) || p.category.toLowerCase().includes(lowerSearch);
      if (selectedSubCategory) return matchesSearch && p.category === selectedSubCategory;
      return matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
      if (sortBy === 'popular') return (downloadCounts[b.id] || 0) - (downloadCounts[a.id] || 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [patterns, searchTerm, selectedSubCategory, sortBy, logs]);

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header Section */}
      <section className="bg-white pt-10 md:pt-20 pb-8 md:pb-16 border-b border-slate-100">
        <div className="max-w-[1536px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center space-x-3 text-violet-600 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Professional Design Archive</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              Browse <br /><span className="text-violet-600">Assets.</span>
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-medium uppercase tracking-tight">
              An exclusive collection of patterns curated for high-end design projects.
            </p>
          </div>
          <div className="w-full lg:w-96 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by keyword or style..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 md:py-5 pl-14 pr-8 text-sm font-bold outline-none focus:ring-4 focus:ring-violet-500/5 focus:border-violet-600 transition-all placeholder:text-slate-300 shadow-sm" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1536px] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-16 flex flex-col lg:flex-row gap-16">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block lg:w-72 flex-shrink-0">
          <div className="sticky top-32 space-y-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
               <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center">
                 <Filter className="w-4 h-4 mr-3 text-violet-600" /> Filter Archive
               </h3>
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => setSelectedSubCategory(null)} 
                className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all ${selectedSubCategory === null ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <LayoutGrid className="w-4 h-4 mr-3" />
                <span className="text-[11px] font-bold uppercase tracking-widest">All Master Designs</span>
              </button>
              
              <div className="h-4"></div>
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] pl-4 mb-3">Categories</p>
              
              {NEW_CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedSubCategory(cat)} 
                  className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all ${selectedSubCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {getCategoryIcon(cat, "w-4 h-4 mr-3")} 
                  <span className="text-[11px] font-bold uppercase tracking-widest">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Assets Grid */}
        <main className="flex-1 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-50 pb-8 gap-4">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
               {selectedSubCategory || 'The Full Archive'}
             </span>
             <div className="flex items-center space-x-8 text-[10px] font-black">
                <div className="flex items-center space-x-3 text-slate-400">
                  <span>Displaying:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)} 
                    className="bg-transparent outline-none text-slate-900 cursor-pointer font-black border-none focus:ring-0 p-0"
                  >
                    <option value="newest">Recent Arrivals</option>
                    <option value="popular">Most Popular</option>
                    <option value="alphabetical">A - Z</option>
                  </select>
                </div>
                <span className="text-slate-900 px-4 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                  {filteredPatterns.length} Professional Assets
                </span>
             </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 border-t border-l border-slate-100/40">
            {isLoading ? (
              [...Array(12)].map((_, i) => (
                <div key={i} className="bg-slate-50 aspect-square animate-pulse border-r border-b border-slate-100/40" />
              ))
            ) : filteredPatterns.length > 0 ? (
              filteredPatterns.map((pattern) => (
                <Link to={`/pattern/${pattern.id}`} key={pattern.id} className="block relative aspect-square group overflow-hidden border-r border-b border-slate-100/40 bg-slate-50">
                  <img src={pattern.thumbnail} alt={pattern.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <span className="text-[8px] font-black text-violet-400 uppercase tracking-widest">{pattern.category}</span>
                    <h4 className="text-white text-lg font-black uppercase tracking-tight leading-none">{pattern.title}</h4>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-2xl scale-0 group-hover:scale-100 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-40 text-center space-y-6">
                <Image className="w-16 h-16 text-slate-100 mx-auto" />
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No assets found matching your selection.</p>
                <button onClick={() => { setSearchTerm(''); setSelectedSubCategory(null); }} className="text-violet-600 font-black uppercase text-[10px] tracking-widest underline">Reset Filters</button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
