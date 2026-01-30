
import React from 'react';
import { 
  Search, 
  User, 
  CreditCard, 
  ShieldCheck, 
  Terminal, 
  ArrowRight, 
  MessageCircle, 
  Globe, 
  FileCode,
  LifeBuoy
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpCenter: React.FC = () => {
  const categories = [
    { title: "Account & Profile", desc: "Manage your subscription, change password, and profile settings.", icon: User, color: "violet" },
    { title: "Billing & Plans", desc: "Information about pricing, invoices, and payment methods.", icon: CreditCard, color: "emerald" },
    { title: "Licensing & Rights", desc: "Detailed guide on commercial usage and legal permissions.", icon: ShieldCheck, color: "amber" },
    { title: "Technical Support", desc: "Troubleshooting file formats, downloads, and printing.", icon: Terminal, color: "rose" }
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-violet-600 selection:text-white">
      {/* Header */}
      <section className="bg-slate-50 border-b border-slate-100 pt-20 pb-32">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16 text-center">
          <div className="flex items-center justify-center space-x-3 text-violet-600 mb-8">
            <LifeBuoy className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Elymand Support</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-12">
            How can we <br /> <span className="text-violet-600">help you?</span>
          </h1>
          
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search help articles..." 
              className="w-full bg-white border border-slate-200 rounded-[2rem] py-6 pl-16 pr-8 text-sm font-bold text-slate-900 outline-none focus:ring-8 focus:ring-violet-500/5 focus:border-violet-600 transition-all shadow-xl shadow-slate-200/50"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 md:py-32 max-w-[1536px] mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="group p-10 bg-white border border-slate-100 rounded-[3rem] hover:shadow-2xl hover:border-violet-200 transition-all duration-500">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all ${
                cat.color === 'violet' ? 'bg-violet-50 text-violet-600' :
                cat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                cat.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
              }`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">{cat.title}</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 uppercase">{cat.desc}</p>
              <Link to="/faq" className="inline-flex items-center text-[10px] font-black text-violet-600 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                View Articles <ArrowRight className="ml-2 w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16 grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Popular Support Topics</h2>
            <div className="space-y-4">
              {[
                "How to open AI/EPS files",
                "Understanding the Extended License",
                "Troubleshooting slow downloads",
                "Changing your billing interval",
                "Team access for Enterprise users"
              ].map((topic, i) => (
                <Link key={i} to="/faq" className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:border-violet-600 transition-colors group">
                  <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 uppercase tracking-tight">{topic}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-violet-600" />
                </Link>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5">
                <Globe className="w-64 h-64" />
             </div>
             <div className="relative z-10 space-y-8">
                <h2 className="text-4xl font-black uppercase tracking-tight leading-none">Can't find what <br /> you need?</h2>
                <p className="text-slate-400 font-medium text-lg leading-relaxed">
                  Our design specialists are available 24/7 to help you with technical or billing questions.
                </p>
                <Link to="/contact" className="inline-flex items-center space-x-4 px-10 py-5 bg-violet-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-xl active:scale-95">
                  <MessageCircle className="w-5 h-5" />
                  <span>Contact Specialist</span>
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
