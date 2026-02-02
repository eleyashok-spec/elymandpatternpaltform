
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { 
  Check, 
  Sparkles, 
  Shield, 
  ArrowRight, 
  Globe, 
  Layers, 
  ShieldCheck, 
  FileCheck, 
  Scale, 
  Fingerprint,
  Clock,
  CreditCard,
  Crown,
  MonitorCheck,
  Info,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { auth } = useApp();

  const handleSelectPlan = (plan: string) => {
    localStorage.setItem('selected_plan', plan);
    if (!auth.isAuthenticated) {
      navigate('/register');
    } else {
      navigate('/checkout');
    }
  };

  const plans = [
    {
      name: 'Pattern Pro',
      tagline: 'Perfect for designers focused on patterns and prints.',
      price: '$29.99',
      features: [
        'Growing library of patterns and motion graphics',
        '15 downloads every month',
        'Full commercial rights',
        'Support for all file formats',
        'New designs added weekly'
      ],
      icon: <Layers className="w-6 h-6 text-slate-400" />,
      highlight: false,
      cta: 'Start Pro Plan',
      color: 'slate'
    },
    {
      name: 'Full Access',
      tagline: 'The complete vault. Patterns, motion, and more.',
      price: '$59.99',
      features: [
        'Everything: Patterns + Motion',
        '20 high-res patterns monthly',
        '10 4K motion graphics monthly',
        'Global commercial license',
        'Priority customer support',
        'Early access to new drops'
      ],
      icon: <Sparkles className="w-6 h-6 text-violet-600" />,
      highlight: true,
      cta: 'Get Full Access',
      color: 'violet'
    },
    {
      name: 'Agency Plan',
      tagline: 'Custom solutions for design teams and agencies.',
      price: 'Custom',
      features: [
        'Multiple users and team sharing',
        'Custom master license agreement',
        'Simple billing for your business',
        'Advanced usage reports',
        'Dedicated account manager'
      ],
      icon: <Crown className="w-6 h-6 text-slate-900" />,
      cta: 'Contact Sales',
      color: 'slate',
      isExternal: true
    }
  ];

  return (
    <div className="py-20 md:py-32 px-6 max-w-[1536px] mx-auto bg-white selection:bg-violet-600 selection:text-white">
      {/* --- HEADER --- */}
      <div className="text-center mb-16 md:mb-24">
        <div className="flex items-center justify-center space-x-3 text-violet-600 mb-6">
          <div className="w-8 sm:w-10 h-px bg-violet-600"></div>
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.5em]">Membership Plans</span>
          <div className="w-8 sm:w-10 h-px bg-violet-600"></div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85] mb-6">
          Simple <br /> <span className="text-violet-600">Pricing.</span>
        </h1>
        <h2 className="text-slate-500 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed px-4">
          Get instant access to the world’s most advanced archive. <br className="hidden md:block" /> Perfect for freelancers and global agencies.
        </h2>
      </div>

      {/* --- PRICING GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto items-stretch">
        {plans.map((plan, idx) => (
          <div 
            key={plan.name} 
            className={`relative p-8 sm:p-10 rounded-[2.5rem] bg-white border transition-all duration-500 flex flex-col h-full ${
              plan.highlight 
                ? 'border-violet-600 ring-4 ring-violet-500/5 shadow-2xl z-10 scale-[1.02] md:scale-100 lg:scale-[1.02]' 
                : 'border-slate-100 hover:border-violet-200'
            } ${idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-600 text-white px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl whitespace-nowrap">
                Most Popular
              </div>
            )}
            
            <div className="mb-8 md:mb-10 p-5 w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
              {plan.icon}
            </div>

            <div className="space-y-2 mb-8 md:mb-10">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">{plan.name}</h3>
              <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                {plan.tagline}
              </p>
            </div>
            
            <div className="flex items-baseline mb-10 md:mb-12">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none">{plan.price}</span>
              {plan.price !== 'Custom' && <span className="text-slate-400 font-bold ml-3 uppercase text-[9px] md:text-[10px] tracking-widest">/ Month</span>}
            </div>
            
            <div className="space-y-4 md:space-y-5 mb-12 md:mb-14 flex-grow">
              <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                <span className="w-4 h-px bg-slate-200 mr-3"></span> Includes
              </p>
              {plan.features.map((f) => (
                <div key={f} className="flex items-start text-slate-600 text-xs md:text-sm font-bold">
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center mr-3 md:mr-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'bg-violet-50 text-violet-600' : 'bg-slate-50 text-slate-400'}`}>
                    <Check className="w-3 h-3 stroke-[4]" />
                  </div>
                  <span className="leading-snug">{f}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleSelectPlan(plan.name)}
              className={`w-full py-5 sm:py-6 rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-[0.3em] md:tracking-[0.4em] transition-all shadow-xl flex items-center justify-center active:scale-[0.98] ${
                plan.highlight 
                ? 'bg-violet-600 text-white hover:bg-slate-900 shadow-violet-100' 
                : 'bg-slate-900 text-white hover:bg-violet-600 shadow-slate-100'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* --- STANDARDS --- */}
      <section className="mt-24 md:mt-32 pt-16 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
          <Fingerprint className="w-8 h-8 text-violet-600" />
          <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Verified Quality</h4>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-tight leading-relaxed max-w-sm">
            All assets are professionally designed and vetted for legal safety and high creative quality.
          </p>
        </div>
        <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
          <MonitorCheck className="w-8 h-8 text-violet-600" />
          <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Pro Ready</h4>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-tight leading-relaxed max-w-sm">
            Files are built to work perfectly in apps like Illustrator, Photoshop, and Premiere Pro.
          </p>
        </div>
        <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
          <Globe className="w-8 h-8 text-violet-600" />
          <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Global Usage</h4>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-tight leading-relaxed max-w-sm">
            Our clear license allows you to use assets in any project, anywhere in the world.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
