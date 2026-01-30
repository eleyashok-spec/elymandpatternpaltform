import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  CheckCircle2, 
  FileCode,
  Sparkles,
  Zap,
  Film,
  Layers,
  Video,
  Building2,
  Play,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen selection:bg-violet-600 selection:text-white">
      {/* --- THE ELYMAND STORY --- */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.4] pointer-events-none"></div>
        
        <div className="max-w-[1536px] mx-auto px-6 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 md:gap-24">
            <div className="lg:max-w-3xl space-y-8">
              <div className="flex items-center space-x-4 text-violet-600">
                <div className="w-12 h-px bg-violet-600"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Elymand Story</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85] animate-in fade-in slide-in-from-bottom-8 duration-700">
                Premium <br />
                <span className="text-violet-600">Creative Assets.</span>
              </h1>
              <p className="text-slate-500 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
                Elymand is a professional digital library dedicated to providing designers and brands with high-end patterns and cinematic <i>Motion Graphics</i>.
              </p>
            </div>
            
            <div className="lg:w-1/3 space-y-8 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">Curated</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Hundreds of assets</p>
                </div>
                <div className="p-8 bg-violet-600 text-white rounded-3xl shadow-xl shadow-violet-200">
                  <p className="text-3xl font-black tracking-tighter">Weekly</p>
                  <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mt-2">New designs added</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-bold uppercase tracking-tight">
                We focus on <b>Originality</b> and quality. Every asset is manually vetted to ensure it meets professional production standards for <b>Commercial Use</b>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR MISSION --- */}
      <section className="py-24 md:py-32 bg-slate-50/50">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16">
          <div className="max-w-4xl space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Our Mission</h2>
              <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
                At Elymand, our mission is to empower the global creative community. We provide a curated bridge between artistic vision and final production by offering <b>production-ready</b> digital elements that save time without compromising on style.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: "Human Creativity", desc: "No generic automated noise. Every pattern and motion asset is built by skilled designers for maximum <b>Originality</b>." },
                { title: "Legal Safety", desc: "We provide <b>Transparent Licensing</b> that gives you peace of mind for high-stakes <b>Commercial Projects</b>." },
                { title: "Technical Excellence", desc: "Files optimized for industry-standard software like <b>Adobe Illustrator</b> and <b>After Effects</b>." },
                { title: "Instant Access", desc: "A straightforward subscription model that makes high-end assets affordable and ready for <b>Immediate Download</b>." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 uppercase text-sm">{item.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR LIBRARY --- */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16 space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-[10px] font-black text-violet-600 uppercase tracking-[0.6em]">Premium Archive</h2>
            <h3 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">Our Library.</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            {/* Professional Patterns */}
            <div className="space-y-8 p-12 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-sm group">
              <div className="w-16 h-16 bg-white text-violet-600 rounded-2xl flex items-center justify-center shadow-sm">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Professional Patterns</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                Our seamless patterns are designed for high-resolution output. We provide versatile formats including <b>AI, EPS, PSD, JPG, and PNG</b>, ensuring your designs remain crisp at any scale.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "<b>Vector Scalability</b> (AI, EPS) for any size project",
                  "<b>300 DPI High-Res</b> (JPG, PNG) for professional printing",
                  "Seamless repeats for <b>Apparel & Packaging</b>",
                  "Fully layered <b>PSD & AI</b> source files"
                ].map((li, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600 font-medium">
                    <Check className="w-4 h-4 text-violet-600 mr-3 mt-1 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: li }} />
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Motion Graphics */}
            <div className="space-y-8 p-12 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-sm group">
              <div className="w-16 h-16 bg-white text-violet-600 rounded-2xl flex items-center justify-center shadow-sm">
                <Film className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Motion Graphics</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                Bring your story to life with cinematic motion assets. We offer a growing collection of <b>4K resolution</b> animations in <b>MP4 and MOV</b> formats.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "<b>Ultra HD 4K</b> cinematic resolution",
                  "Smooth <b>60 FPS</b> for fluid playback",
                  "Perfectly looping backgrounds for <b>Web & UI</b>",
                  "Ready for <b>Social Media & Video Ads</b>"
                ].map((li, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600 font-medium">
                    <Check className="w-4 h-4 text-violet-600 mr-3 mt-1 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: li }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR PHILOSOPHY & WHO WE SERVE --- */}
      <section className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-6">
                <h2 className="text-[10px] font-black text-violet-400 uppercase tracking-[0.6em]">Our Philosophy</h2>
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">Human-Vetted <br /> Quality.</h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  We believe that professional design requires a human touch. Every pattern and video in our library is reviewed for <i>aesthetic balance, technical integrity, and legal compliance</i>. We provide tools for <b>Commercial Success</b>.
                </p>
              </div>
              <div className="flex items-center space-x-8">
                 <div className="flex flex-col">
                    <span className="text-2xl font-black text-white uppercase">4K</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Master Standard</span>
                 </div>
                 <div className="w-px h-10 bg-white/10"></div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-black text-white uppercase">100%</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Originality</span>
                 </div>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-10">
              <h2 className="text-[10px] font-black text-violet-400 uppercase tracking-[0.6em]">Who We Serve</h2>
              <div className="grid gap-6">
                {[
                  { title: "Agencies & Studios", icon: Building2, desc: "Providing high-fidelity elements for client branding and <b>Professional Campaigns</b>." },
                  { title: "Content Creators", icon: Video, desc: "Cinematic backgrounds for high-impact <b>Social Content</b> and video production." },
                  { title: "Independent Brands", icon: ShieldCheck, desc: "Original patterns for unique packaging and <b>Authentic Identity</b> building." }
                ].map((group, i) => (
                  <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-start space-x-6 hover:bg-white/10 transition-all">
                    <group.icon className="w-6 h-6 text-violet-400 shrink-0 mt-1" />
                    <div className="space-y-1">
                      <h4 className="font-black text-white uppercase tracking-tight text-sm">{group.title}</h4>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed uppercase" dangerouslySetInnerHTML={{ __html: group.desc }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- READY TO CREATE --- */}
      <section className="py-32 md:py-48 text-center bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-slate-900 text-violet-400 rounded-[2rem] flex items-center justify-center shadow-2xl">
              <Sparkles className="w-10 h-10" />
            </div>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Ready to <br /> <span className="text-violet-600">Create?</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl mx-auto">
            Join the Elymand archive today and get instant access to <b>Professional Assets</b> that grow with your business.
          </p>
          <div className="pt-8">
            <Link to="/pricing" className="inline-flex items-center space-x-4 bg-slate-900 text-white px-12 py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] hover:bg-violet-600 transition-all shadow-xl active:scale-95 group">
              <span>View Membership Plans</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;