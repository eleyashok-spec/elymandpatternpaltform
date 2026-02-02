import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ArrowLeft, 
  Search, 
  Globe, 
  FileCode, 
  CreditCard, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  MessageSquare
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const FAQItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group transition-all"
      >
        <span className={`text-lg md:text-xl font-black uppercase tracking-tight transition-colors ${isOpen ? 'text-violet-600' : 'text-slate-900 group-hover:text-violet-600'}`}>
          {question}
        </span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isOpen ? 'bg-violet-600 text-white rotate-180 shadow-lg shadow-violet-200' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[600px] pb-10' : 'max-h-0'}`}>
        <div className="text-slate-500 font-medium leading-relaxed max-w-4xl text-base md:text-lg">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  
  const faqData = [
    {
      category: "General Platform",
      icon: Globe,
      questions: [
        { 
          q: "What exactly is Elymand?", 
          a: "Elymand is a professional digital archive providing <b>hundreds of assets</b> including premium seamless patterns and cinematic motion graphics. We serve design agencies, apparel brands, and content creators looking for high-end, production-ready creative elements." 
        },
        { 
          q: "Are the designs original and safe to use?", 
          a: "Yes. Every asset in our library is <b>human-vetted</b> for quality and <b>originality</b>. We do not use generic automation; each design is crafted by professional artists to ensure it meets commercial industry standards." 
        },
        { 
          q: "How often do you add new content?", 
          a: "We update our archive weekly. We focus on quality over quantity, adding a curated selection of new <b>4K</b> motion backgrounds and high-resolution patterns every week to keep your projects ahead of trends." 
        }
      ]
    },
    {
      category: "Technical & Files",
      icon: FileCode,
      questions: [
        { 
          q: "What file formats will I receive?", 
          a: (
            <div className="space-y-4">
              <p>Depending on the asset type, you will receive professional, industry-standard files:</p>
              <ul className="space-y-2 list-none">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span><b>Patterns:</b> AI, EPS, PSD, JPG, and PNG (300 DPI)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span><b>Motion Graphics:</b> 4K resolution MP4 and MOV formats</span>
                </li>
              </ul>
              <p>All files are <b>production-ready</b> and compatible with Adobe Creative Cloud and other major design software.</p>
            </div>
          )
        },
        { 
          q: "Can I customize the patterns and videos?", 
          a: "Absolutely. Our patterns are provided in layered <b>PSD</b> and vector <b>AI/EPS</b> formats, allowing you to change colors, scales, and elements. Motion graphics can be color-graded and edited in any standard video editor to match your brand's unique aesthetic." 
        },
        { 
          q: "What resolution are the motion assets?", 
          a: "Our motion graphics are provided in <b>4K (Ultra HD)</b> resolution at a smooth 60 FPS, ensuring cinematic quality for web backgrounds, social media, and professional video production." 
        }
      ]
    },
    {
      category: "Licensing & Billing",
      icon: CreditCard,
      questions: [
        { 
          q: "How does the Commercial License work?", 
          a: "Our <b>Commercial License</b> allows you to use assets in projects for yourself or your clients, including physical merchandise, packaging, advertising, and digital content. Usage is governed by your active membership tier and our transparent licensing terms." 
        },
        { 
          q: "Can I cancel my subscription at any time?", 
          a: "Yes. You have full control over your membership. You can cancel your subscription at any time directly from your dashboard with <b>no hidden fees</b> or long-term commitments. Your access remains active until the end of your current billing cycle." 
        },
        { 
          q: "What happens to my license after I cancel?", 
          a: "We offer <b>Post-Cancellation Rights</b>. Any asset you downloaded and used in a project while your subscription was active remains licensed for <b>Commercial Use</b> in that specific project forever. To use assets in brand new projects after cancellation, a new subscription is required." 
        },
        { 
          q: "Is my payment information secure?", 
          a: "Yes. All transactions are processed through <b>2Checkout (Verifone)</b>, a leading global payment processor. We use 256-bit encryption and do not store your full credit card details on our servers, ensuring your data remains private and secure." 
        }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-violet-600 selection:text-white pb-32">
      {/* --- HEADER --- */}
      <header className="relative py-20 md:py-32 border-b border-slate-100 bg-slate-50/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.4] pointer-events-none"></div>
        <div className="max-w-[1536px] mx-auto px-6 md:px-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 text-center md:text-left">
              <button onClick={() => navigate(-1)} className="inline-flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors mb-4 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back
              </button>
              <div className="flex items-center justify-center md:justify-start space-x-4 text-violet-600">
                <div className="w-12 h-px bg-violet-600"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Elymand Help Center</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
                Frequent <br /> <span className="text-violet-600">Questions.</span>
              </h1>
            </div>
            
            <div className="w-full md:w-1/3 max-w-md">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4">
                 <div className="flex items-center space-x-3 text-emerald-500">
                    <ShieldCheck className="w-6 h-6" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Verified Support</h4>
                 </div>
                 <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Can't find what you're looking for? Our design specialists are ready to assist you.
                 </p>
                 <Link to="/contact" className="inline-flex items-center text-[10px] font-black text-violet-600 uppercase tracking-widest hover:translate-x-2 transition-transform">
                   Contact Specialist <ArrowRight className="ml-2 w-3 h-3" />
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- FAQ CONTENT --- */}
      <main className="max-w-5xl mx-auto px-6 pt-24 space-y-32">
        {faqData.map((section, idx) => (
          <section key={idx} className="space-y-12">
            <div className="flex items-center space-x-6">
               <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <section.icon className="w-6 h-6" />
               </div>
               <div className="flex-1">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{section.category}</h2>
                  <div className="h-px bg-slate-100 w-full mt-4"></div>
               </div>
            </div>
            
            <div className="divide-y divide-slate-50 border-t border-slate-50">
              {section.questions.map((item, i) => (
                <FAQItem 
                  key={i} 
                  question={item.q} 
                  answer={typeof item.a === 'string' ? <span dangerouslySetInnerHTML={{ __html: item.a }} /> : item.a} 
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* --- CTA --- */}
      <section className="mt-32 py-24 md:py-48 bg-slate-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:30px_30px] opacity-[0.1] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 space-y-12 relative z-10">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] flex items-center justify-center">
              <Lock className="w-8 h-8 text-violet-400" />
            </div>
          </div>
          <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
            Ready to <br /> <span className="text-violet-500">Upgrade?</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
            Get immediate access to <b>hundreds of assets</b> and our premium <b>Commercial License</b> for your next major project.
          </p>
          <div className="pt-8">
            <Link to="/pricing" className="inline-flex items-center space-x-6 bg-white text-slate-950 px-16 py-8 rounded-3xl font-black uppercase text-[12px] tracking-[0.4em] hover:bg-violet-600 hover:text-white transition-all shadow-2xl active:scale-95 group">
              <span>View Membership Plans</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="pt-12 flex items-center justify-center space-x-8 opacity-40">
             <div className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Instant Access</span>
             </div>
             <div className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Transparent Billing</span>
             </div>
             <div className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Cancel Anytime</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;