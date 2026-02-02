
import React, { useState } from 'react';
import { 
  Mail, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Loader2,
  Headphones,
  Lock,
  Globe,
  ExternalLink,
  ShieldCheck,
  Info,
  Film,
  MapPin,
  Phone,
  Shield,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate professional API transmission
    await new Promise(resolve => setTimeout(resolve, 1800));
    setIsSending(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="bg-white min-h-screen selection:bg-violet-600 selection:text-white pb-32">
      {/* --- HERO SECTION --- */}
      <section className="relative py-16 md:py-24 border-b border-slate-100 overflow-hidden bg-slate-50/30">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.4] pointer-events-none"></div>
        
        <div className="max-w-[1536px] mx-auto px-6 md:px-16 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 text-violet-600 mb-6">
              <div className="w-12 h-px bg-violet-600"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Official Support</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700">
              Contact <br />
              <span className="text-violet-600">Support.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mt-8">
              Have questions about your patterns, Motion Graphics, or subscription? Our team is here to help you get the most out of your Elymand account.
            </p>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-[1536px] mx-auto px-6 md:px-16 py-16 md:py-24 grid lg:grid-cols-12 gap-16 md:gap-24">
        
        {/* LEFT COLUMN: BUSINESS INFO & CONTACT DETAILS */}
        <div className="lg:col-span-5 space-y-16">
          
          {/* Section: About Elymand */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <Info className="w-6 h-6 text-violet-600" /> About Elymand
            </h2>
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 space-y-6 shadow-sm">
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                Elymand is a professional digital platform offering high-quality design patterns and cinematic Motion Graphics for creative projects. Members get instant access to professional file formats like AI, EPS, SVG, and high-bitrate video master files.
              </p>
              <div className="grid gap-4 pt-4">
                <div className="flex items-start space-x-4">
                  <ShieldCheck className="w-5 h-5 text-violet-600 mt-0.5 shrink-0" />
                  <p className="text-[11px] font-medium text-slate-700 uppercase tracking-wide">
                    <b className="text-slate-900 font-black">Business Focus:</b> Patterns, Motion Graphics & Subscriptions
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <Headphones className="w-5 h-5 text-violet-600 mt-0.5 shrink-0" />
                  <p className="text-[11px] font-medium text-slate-700 uppercase tracking-wide">
                    <b className="text-slate-900 font-black">Customer Support:</b> Available via Email, Phone, and Online Form
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Contact Information */}
          <section className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <Globe className="w-6 h-6 text-violet-600" /> Contact Information
            </h2>

            <div className="space-y-10">
              {/* Address */}
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Business Address</h4>
                  <address className="not-italic text-sm font-black text-slate-900 leading-relaxed uppercase tracking-tight">
                    <b className="font-black">Elymand<br />
                    Valuka, Gafargon Road<br />
                    Mymensingh 2200, Bangladesh</b>
                  </address>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Phone Support</h4>
                  <p className="text-xl font-black text-slate-900"><b className="font-black">+8801602195730</b></p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Available: <b className="font-black">Sun-Thu, 10am - 6pm BST</b></p>
                </div>
              </div>

              {/* Emails */}
              <div className="space-y-6 pt-4 border-t border-slate-100">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Support Emails</h4>
                <ul className="space-y-4">
                  {[
                    { label: "Account Support", email: "support@elymand.com" },
                    { label: "Technical & Motion Graphics Help", email: "tech@elymand.com" },
                    { label: "Billing & Business", email: "sales@elymand.com" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start group">
                      <div className="w-1.5 h-1.5 bg-violet-600 rounded-full mt-2 mr-4 shrink-0"></div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">{item.label}</p>
                        <a href={`mailto:${item.email}`} className="text-base font-black text-slate-900 hover:text-violet-600 transition-colors">
                          <b className="font-black">{item.email}</b>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center space-x-3 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                      Our team monitors these channels daily for quick responses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Policies & Legal */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <Shield className="w-6 h-6 text-violet-600" /> Policies & Legal
            </h2>
            <div className="grid gap-4">
              {[
                { label: "Terms of Service", path: "/terms" },
                { label: "Refund Policy", path: "/refund" },
                { label: "Privacy Policy", path: "/privacy" }
              ].map((link, i) => (
                <Link key={i} to={link.path} className="flex items-center justify-between p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-violet-600 hover:bg-slate-50 transition-all group shadow-sm">
                  <span className="text-[12px] font-black uppercase text-slate-900 tracking-[0.1em]">{link.label}</span>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM & SUPPORT TEAM */}
        <div className="lg:col-span-7 space-y-16">
          
          {/* Section: Send Us a Message */}
          <section className="bg-white p-8 md:p-14 lg:p-16 rounded-[3rem] border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
             {isSuccess && (
               <div className="absolute inset-0 z-20 bg-white/98 backdrop-blur-md flex flex-col items-center justify-center text-center p-12 animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 border border-emerald-100 shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Message Sent</h3>
                  <p className="text-slate-500 font-medium max-w-xs mx-auto">
                    Thank you for reaching out. A specialist will reply to your inquiry shortly.
                  </p>
                  <button onClick={() => setIsSuccess(false)} className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 transition-all">
                    Send Another Message
                  </button>
               </div>
             )}

             <div className="mb-12">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Send Us a Message</h3>
                <div className="inline-flex items-center space-x-3 bg-violet-50 text-violet-600 px-5 py-2.5 rounded-xl border border-violet-100 mb-4">
                  <MessageSquare className="w-4 h-4" />
                  <p className="font-bold text-[11px] uppercase tracking-wide">For immediate assistance, use our online support form below.</p>
                </div>
             </div>

             <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                     <input 
                       type="text" 
                       required
                       placeholder="Enter your name" 
                       className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-600 transition-all placeholder:text-slate-300" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                     <input 
                       type="email" 
                       required
                       placeholder="email@example.com" 
                       className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-600 transition-all placeholder:text-slate-300" 
                     />
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Topic</label>
                   <select className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-600 transition-all appearance-none cursor-pointer">
                      <option>Account or Login Help</option>
                      <option>Technical & Motion Graphics Help</option>
                      <option>Billing & Business</option>
                      <option>Commercial Licensing Inquiry</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Your Message</label>
                   <textarea 
                     rows={6} 
                     required
                     placeholder="How can we help you today?" 
                     className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-600 transition-all placeholder:text-slate-300 resize-none" 
                   />
                </div>

                <div className="space-y-6">
                  <button 
                    disabled={isSending}
                    className={`w-full py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] transition-all shadow-xl flex items-center justify-center space-x-4 active:scale-[0.98] ${
                      isSending 
                      ? 'bg-slate-100 text-slate-400 cursor-wait' 
                      : 'bg-slate-900 text-white hover:bg-violet-600'
                    }`}
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center space-x-3 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Secure end-to-end encrypted communication</span>
                  </div>
                </div>
             </form>
          </section>

          {/* Section: About Our Support Team */}
          <section className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
               <Sparkles className="w-64 h-64" />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
                   <ShieldCheck className="w-7 h-7 text-violet-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-none">About Our Support Team</h3>
              </div>
              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                Our support desk is run by real design and motion experts who understand our assets and your business needs. We are committed to helping you find the right designs for your success.
              </p>
              <div className="flex items-center space-x-3 text-emerald-400 font-black uppercase text-[11px] tracking-widest pt-4">
                <CheckCircle2 className="w-5 h-5" />
                <span>Official Elymand Support Protocol</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Contact;
