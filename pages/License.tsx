
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileCode, 
  ArrowLeft,
  ArrowRight, 
  Globe, 
  X, 
  Cpu, 
  Info, 
  Gavel,
  Clock,
  Video,
  Play,
  Settings2,
  HeartHandshake,
  Sparkles,
  Lock,
  ChevronDown,
  Scale
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const LicenseDetailPanel: React.FC<{ 
  isOpen: boolean; 
  onToggle: () => void; 
  details: string[]; 
  title: string;
}> = ({ isOpen, onToggle, details, title }) => (
  <div className="mt-8">
    <button 
      onClick={onToggle}
      className="flex items-center space-x-3 text-[10px] font-black text-violet-600 uppercase tracking-widest hover:text-slate-900 transition-colors group"
    >
      <div className={`w-6 h-6 rounded-full border border-violet-200 flex items-center justify-center transition-all ${isOpen ? 'bg-violet-600 text-white border-violet-600 rotate-180' : 'bg-white group-hover:bg-violet-50'}`}>
        <ChevronDown className="w-3.5 h-3.5" />
      </div>
      <span>{isOpen ? 'Hide Full Agreement Details' : `View Full Agreement: ${title}`}</span>
    </button>
    
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 space-y-6">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 shrink-0"></div>
              <p className="text-[11px] font-medium text-slate-500 leading-relaxed uppercase tracking-tight">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const LicenseSection: React.FC<{ 
  title: string; 
  icon: any; 
  children: React.ReactNode; 
  id?: string;
  details?: string[];
}> = ({ title, icon: Icon, children, id, details }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id={id} className="space-y-8 scroll-mt-32">
      <div className="flex items-center space-x-6">
        <div className="w-14 h-14 bg-slate-900 text-violet-400 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">{title}</h2>
          <div className="h-px bg-slate-100 w-full mt-4"></div>
        </div>
      </div>
      <div className="pl-0 md:pl-20">
        {children}
        {details && (
          <LicenseDetailPanel 
            isOpen={showDetails} 
            onToggle={() => setShowDetails(!showDetails)} 
            details={details} 
            title={title}
          />
        )}
      </div>
    </section>
  );
};

const License: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen selection:bg-violet-600 selection:text-white pb-32">
      {/* --- HERO SECTION --- */}
      <header className="relative py-20 md:py-32 border-b border-slate-100 bg-slate-50/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.4] pointer-events-none"></div>
        
        <div className="max-w-[1536px] mx-auto px-6 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-6 text-center md:text-left">
              <button onClick={() => navigate(-1)} className="inline-flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors mb-4 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back
              </button>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-violet-600">
                <div className="w-12 h-px bg-violet-600"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Elymand Standard</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                Elymand <br /> <span className="text-violet-600">Licenses.</span>
              </h1>
            </div>
            
            <div className="w-full md:w-1/3 max-w-md">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4">
                 <div className="flex items-center space-x-3 text-emerald-500">
                    <HeartHandshake className="w-6 h-6" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Fair Usage Agreement</h4>
                 </div>
                 <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Our licenses are built to protect both our creators and your business. We believe in clear terms and high legal safety for all members.
                 </p>
                 <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Verified 2Checkout Friendly</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- QUICK LINKS NAV --- */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 hidden md:block">
        <div className="max-w-[1536px] mx-auto px-16 py-4 flex items-center space-x-8 overflow-x-auto no-scrollbar">
          {[
            { label: 'How it works', id: 'how-it-works' },
            { label: 'Commercial Usage', id: 'commercial' },
            { label: 'Motion Licensing', id: 'motion' },
            { label: 'Business Protection', id: 'protection' },
            { label: 'Restrictions', id: 'restrictions' }
          ].map((link) => (
            <a key={link.id} href={`#${link.id}`} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors whitespace-nowrap">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* --- CONTENT --- */}
      <main className="max-w-5xl mx-auto px-6 pt-24 space-y-32">
        
        {/* Elymand License Agreement */}
        <LicenseSection 
          id="how-it-works" 
          title="How You Can Use Our Assets" 
          icon={Globe}
          details={[
            "Granted under a Non-Exclusive Worldwide License",
            "Single-user license by default (standard plans)",
            "Non-transferable to third parties or other accounts",
            "Sublicensing of raw files is strictly prohibited",
            "No attribution required for paid subscription levels",
            "License becomes active immediately upon asset download"
          ]}
        >
          <div className="space-y-6">
            <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
              When you download any pattern or motion asset from Elymand, we grant you a professional license. Our terms are designed to give you creative freedom while maintaining high technical and legal standards.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Worldwide Rights", desc: "Use assets in projects globally without geographic restrictions." },
                { title: "Multi-Format", desc: "All licenses cover all provided formats (AI, PSD, 4K Video, etc.)." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </LicenseSection>

        {/* Commercial & Pro Usage */}
        <LicenseSection 
          id="commercial" 
          title="Commercial & Pro Usage" 
          icon={CheckCircle2}
          details={[
            "Unlimited physical copies for packaging and print",
            "Unlimited digital impressions for web and social ads",
            "Use in paid digital products (templates, themes, UI)",
            "Broadcast rights for standard marketing campaigns",
            "Client-work coverage with transfer of end-project usage",
            "Valid for globally distributed retail products"
          ]}
        >
          <div className="space-y-8">
            <p className="text-slate-600 text-base font-medium leading-relaxed">
              Your membership allows for broad commercial application. Our assets are production-ready for:
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                "Physical merchandise and apparel branding",
                "Product packaging and label design",
                "Digital advertising and social media campaigns",
                "UI/UX design and mobile applications",
                "Client-based creative deliverables",
                "Professional marketing collateral"
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm text-slate-500 font-bold uppercase tracking-tight">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </LicenseSection>

        {/* Motion & Video Content */}
        <LicenseSection 
          id="motion" 
          title="Motion & Video Content" 
          icon={Video}
          details={[
            "4K (3840x2160) Cinematic Resolution Coverage",
            "High-bitrate master files (MP4/MOV) included",
            "Royalty-free usage for video streaming (YouTube, Vimeo)",
            "Permission for public display (events, billboards)",
            "Alpha-channel usage rights for layering and VFX",
            "Synchronization rights for background music or VO"
          ]}
        >
          <div className="space-y-6">
            <p className="text-slate-600 text-base font-medium leading-relaxed">
              Our 4K Motion Graphics are delivered under a royalty-free commercial license.
            </p>
            <div className="bg-slate-950 text-white p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent opacity-50"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-3 text-violet-400">
                  <Play className="w-5 h-5 fill-current" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Video Rights</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-4">
                    <div className="w-1.5 h-1.5 bg-violet-400 rounded-full"></div>
                    <span className="text-sm font-medium">Use 4K backgrounds in ads, trailers, and social content.</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="w-1.5 h-1.5 bg-violet-400 rounded-full"></div>
                    <span className="text-sm font-medium">Looping assets are licensed for web and app integration.</span>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="w-1.5 h-1.5 bg-violet-400 rounded-full"></div>
                    <span className="text-sm font-medium">Alpha-channel assets allowed for professional compositing.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </LicenseSection>

        {/* Modification Rights */}
        <LicenseSection 
          title="Modification Rights" 
          icon={Settings2}
          details={[
            "Unlimited derivative work permission",
            "Colorization, scaling, and cropping allowed",
            "Combining assets into new creative compositions",
            "Conversion into different software formats",
            "Integration into complex brand design systems",
            "No restrictions on artistic interpretation"
          ]}
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <p className="text-slate-600 text-base font-medium leading-relaxed">
                We believe in creative freedom. You are fully licensed to modify our assets to fit your brand's unique identity.
              </p>
              <div className="grid gap-4">
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <FileCode className="w-5 h-5 text-violet-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900">Scale, rotate, and recolor vectors</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900">Color-grade and edit motion assets</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-64 aspect-square bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-center relative group">
               <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform duration-500">
                  <Settings2 className="w-8 h-8" />
               </div>
            </div>
          </div>
        </LicenseSection>

        {/* Business Protection */}
        <LicenseSection 
          id="protection" 
          title="Business Protection" 
          icon={ShieldCheck}
          details={[
            "Legal indemnification for commercial projects",
            "Human-originality guarantee for all vectors",
            "Verified metadata for easy digital asset management",
            "Safe-harbor protection for client deliverables",
            "Vetted against copyright and trademark conflicts",
            "Corporate legal review support (Enterprise only)"
          ]}
        >
          <div className="space-y-8">
            <div className="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100 space-y-6">
              <div className="flex items-center space-x-3 text-emerald-700">
                <ShieldCheck className="w-6 h-6" />
                <h4 className="text-xl font-black uppercase tracking-tight">Legal Security & Originality</h4>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed">
                Every asset in the Elymand archive is <b>human-vetted and original</b>. We do not use automated noise generators, ensuring that our designs are legally safe for global commercial use. This protects your business from the legal ambiguity often associated with generic digital content.
              </p>
            </div>
          </div>
        </LicenseSection>

        {/* Perpetual Rights */}
        <LicenseSection 
          title="Perpetual Rights" 
          icon={Clock}
          details={[
            "Lifetime usage for projects created during subscription",
            "No 'recurring license fees' per project",
            "Historical download access maintained after end-of-term",
            "Commercial coverage remains valid for existing clients",
            "Irrevocable project-specific rights",
            "Valid for worldwide distribution forever"
          ]}
        >
          <div className="space-y-6">
            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              We offer <b>Post-Cancellation Rights</b>. This means your business is protected even if you decide to end your membership.
            </p>
            <div className="p-8 border-2 border-slate-900 rounded-3xl space-y-4">
              <p className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-3 text-emerald-500" /> Lifetime Project Rights
              </p>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Any asset you download and use in a specific project while your subscription is active remains licensed for <b>that specific project forever</b>. You do not need to maintain an active subscription to keep using assets in your existing live projects.
              </p>
            </div>
          </div>
        </LicenseSection>

        {/* Restrictions */}
        <LicenseSection 
          id="restrictions" 
          title="Restrictions" 
          icon={X}
          details={[
            "Prohibition on use in AI training datasets",
            "No reselling of assets as standalone items",
            "Restrictions on creation of competing stock libraries",
            "No redistribution in public file-sharing forums",
            "No standalone use in automated logo/website generators",
            "Prohibition on pornographic or illegal context usage"
          ]}
        >
          <div className="space-y-6">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">To protect our platform, the following are strictly prohibited:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "No reselling or redistributing raw design files",
                "No sharing account access with third parties",
                "No standalone use on Print-on-Demand platforms",
                "No using assets to train AI models or design tools"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 p-5 bg-rose-50 rounded-2xl border border-rose-100 text-rose-700">
                  <X className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </LicenseSection>

        {/* Need a Custom License? */}
        <section className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:30px_30px] opacity-[0.2] pointer-events-none"></div>
          <div className="relative z-10 space-y-10">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-white/10">
                <Gavel className="w-8 h-8 text-violet-400" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-tight">Need a <br /> <span className="text-violet-500">Custom License?</span></h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                For high-volume enterprise needs, shared agency accounts, or custom legal agreements, our specialist team is ready to assist.
              </p>
            </div>
            <div className="pt-6">
              <Link to="/contact" className="inline-flex items-center space-x-4 bg-white text-slate-900 px-12 py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] hover:bg-violet-600 hover:text-white transition-all shadow-xl active:scale-95 group">
                <span>Contact Licensing Specialist</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER COMPLIANCE --- */}
      <footer className="mt-32 pt-16 border-t border-slate-100 flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-3 text-slate-300">
          <Lock className="w-5 h-5 text-emerald-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Elymand Legal Shield V4.0</span>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-6">
          Last Updated: March 2026 • Professional Standard Verified for 2Checkout Compliance
        </p>
      </footer>
    </div>
  );
};

export default License;
