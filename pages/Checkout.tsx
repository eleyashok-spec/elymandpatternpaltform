import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { 
  CreditCard, 
  Lock, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2, 
  ShieldCheck, 
  Info, 
  HelpCircle, 
  Globe, 
  Check,
  Calendar,
  AlertCircle,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { subscribe, auth } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const selectedPlan = localStorage.getItem('selected_plan') || 'Pro Membership (Patterns)';

  const planDetails = useMemo(() => {
    const plans: Record<string, { price: string; inclusions: string[] }> = {
      'Pro Membership (Patterns)': {
        price: '29.99',
        inclusions: [
          'Growing library of patterns and motion graphics',
          '15 high-resolution downloads per month',
          'Extended Commercial License',
          'Priority file format support',
          'New designs added every week'
        ]
      },
      'Pattern Pro': {
        price: '29.99',
        inclusions: [
          'Growing library of patterns and motion graphics',
          '15 high-resolution downloads per month',
          'Extended Commercial License',
          'Priority file format support',
          'New designs added every week'
        ]
      },
      'Full Access': {
        price: '59.99',
        inclusions: [
          'All pattern downloads + motion animation videos',
          '20 high-resolution patterns per month',
          '10 cinematic motion videos per month',
          'Commercial license for both asset types',
          'Priority support for all creative assets',
          'Weekly updates for patterns and motion'
        ]
      },
      'All Access Membership': {
        price: '59.99',
        inclusions: [
          'All pattern downloads + motion animation videos',
          '20 high-resolution patterns per month',
          '10 cinematic motion videos per month',
          'Commercial license for both asset types',
          'Priority support for all creative assets',
          'Weekly updates for patterns and motion'
        ]
      }
    };
    // Default to Pro if something went wrong with the storage
    return plans[selectedPlan] || plans['Pro Membership (Patterns)'];
  }, [selectedPlan]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Get user ID from auth
    const userId = auth?.user?.id || '';
    if (!userId) {
      alert('Please log in before checkout');
      setIsProcessing(false);
      return;
    }

    // If you have pre-generated BuyLinks in 2Checkout, use them (preferred)
    const BUYLINKS: Record<string, string> = {
      'Pro Membership (Patterns)': 'https://secure.2checkout.com/checkout/buy?merchant=255895324825&tpl=default&prod=FBU0E7MJ22%3BN7UQ496RVU&qty=1%3B1'
      // Add other plan mappings here when available
    };

    try {
      const selectedBuyLink = BUYLINKS[selectedPlan];
      if (selectedBuyLink) {
        // Append user data by string concat to preserve original encoding
        const sep = selectedBuyLink.includes('?') ? '&' : '?';
        const parts: string[] = [];
        if (auth?.user?.email) parts.push(`email=${encodeURIComponent(auth.user.email)}`);
        if (userId) parts.push(`external_reference=${encodeURIComponent(userId)}`);
        parts.push(`return_url=${encodeURIComponent(`${window.location.origin}/verify-success`)}`);
        parts.push(`cancel_url=${encodeURIComponent(`${window.location.origin}/checkout`)}`);
        const finalUrl = selectedBuyLink + sep + parts.join('&');
        console.log('Redirecting to BuyLink (preserve encoding):', finalUrl);
        window.location.href = finalUrl;
        return;
      }

      // Fallback: build a direct purchase URL (may require dynamic pricing enabled)
      const merchantId = '255895324825';
      const params = new URLSearchParams();
      params.append('sid', merchantId);
      params.append('mode', '2CO');
      params.append('email', auth?.user?.email || '');
      params.append('external_reference', userId);
      params.append('currency_code', 'USD');
      params.append('language', 'en');
      params.append('return_url', `${window.location.origin}/verify-success`);
      params.append('cancel_url', `${window.location.origin}/checkout`);
      params.append('li_0_name', selectedPlan);
      params.append('li_0_price', planDetails.price);
      params.append('li_0_quantity', '1');
      const checkoutUrl = `https://secure.2checkout.com/checkout/purchase?${params.toString()}`;
      console.log('2Checkout fallback URL:', checkoutUrl);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout initialization failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white min-h-screen selection:bg-violet-600 selection:text-white pb-24">
      {/* Navigation Top Bar */}
      <div className="max-w-[1536px] mx-auto px-6 py-8 flex items-center justify-between border-b border-slate-50">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-all"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Change Plan</span>
        </button>
        <div className="flex items-center space-x-3 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-[9px] font-black uppercase tracking-widest">Secure Checkout Environment</span>
        </div>
      </div>

      <div className="max-w-[1536px] mx-auto px-6 pt-12 md:pt-16 grid lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* LEFT COLUMN: ORDER SUMMARY & TRUST */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
               Order <span className="text-violet-600">Summary.</span>
             </h1>
             <p className="text-slate-500 font-medium text-base">
               Complete your subscription to access Elymand's professional creative library.
             </p>
          </div>

          {/* Subscription Card */}
          <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm space-y-8">
            <div className="flex justify-between items-start pb-6 border-b border-slate-200">
               <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Selected Plan</p>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{selectedPlan}</h3>
               </div>
               <div className="text-right">
                  <p className="text-2xl font-black text-slate-900">${planDetails.price}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">per month</p>
               </div>
            </div>

            <div className="space-y-4">
               <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-violet-600" /> What's Included:
               </p>
               <ul className="space-y-3">
                  {planDetails.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-slate-600 font-medium">
                       <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                       <span>{item}</span>
                    </li>
                  ))}
               </ul>
            </div>

            {/* Billing Policy - Compliance Critical */}
            <div className="pt-6 border-t border-slate-200">
               <div className="p-6 bg-white rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex items-center space-x-2 text-violet-600">
                    <Calendar className="w-4 h-4" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Billing & Renewal</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed uppercase">
                    Your subscription will automatically renew at ${planDetails.price} every month. You can cancel your membership at any time from your dashboard with no hidden fees.
                  </p>
               </div>
            </div>
          </div>

          {/* Refund Policy Summary */}
          <div className="flex items-start space-x-4 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
             <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
             <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase">
                Digital products are subject to our <Link to="/refund" className="text-violet-600 font-black hover:underline">Refund Policy</Link>. We offer refunds for billing errors or if the service does not meet our technical standards.
             </p>
          </div>
        </div>

        {/* RIGHT COLUMN: PAYMENT FORM */}
        <div className="lg:col-span-7">
           <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-14 lg:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] space-y-10">
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none mb-1">Secure Payment</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Processed by 2Checkout (Verifone)</p>
                 </div>
                 <div className="flex items-center space-x-3 opacity-60">
                    <div className="w-10 h-6 bg-slate-100 rounded border border-slate-200"></div>
                    <div className="w-10 h-6 bg-slate-100 rounded border border-slate-200"></div>
                    <div className="w-10 h-6 bg-slate-100 rounded border border-slate-200"></div>
                 </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email"
                      value={auth?.user?.email || ''}
                      disabled
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300 opacity-70" 
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Card Number</label>
                    <div className="relative opacity-50 pointer-events-none">
                       <input 
                        type="text" 
                        disabled
                        placeholder="Processing through 2Checkout Secure Gateway" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 pl-14 text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300" 
                       />
                       <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6 opacity-50 pointer-events-none">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Expiry Date</label>
                       <input 
                         type="text" 
                         disabled
                         placeholder="MM / YY" 
                         className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300 text-center" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Security Code (CVV)</label>
                       <div className="relative">
                          <input 
                            type="password" 
                            disabled
                            placeholder="***" 
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300 text-center" 
                          />
                          <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                       </div>
                    </div>
                 </div>

                 <div className="pt-6 space-y-6">
                    <button 
                      type="submit"
                      disabled={isProcessing}
                      className={`w-full py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] transition-all shadow-xl flex items-center justify-center space-x-3 active:scale-[0.98] ${
                        isProcessing 
                        ? 'bg-slate-100 text-slate-400 cursor-wait' 
                        : 'bg-slate-900 hover:bg-violet-600 text-white shadow-slate-200'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Processing Payment...</span>
                        </>
                      ) : (
                        <>
                          <span>Pay ${planDetails.price} Monthly</span>
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                        </>
                      )}
                    </button>

                    <div className="text-center space-y-4">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                         By completing this purchase, you agree to Elymand's <Link to="/terms" className="text-violet-600 hover:underline">Terms of Use</Link> and <Link to="/privacy" className="text-violet-600 hover:underline">Privacy Policy</Link>.
                       </p>
                       <div className="flex items-center justify-center space-x-4 opacity-40 grayscale group">
                          <div className="flex items-center space-x-1.5">
                             <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                             <span className="text-[8px] font-black uppercase tracking-widest">PCI DSS Compliant</span>
                          </div>
                          <div className="w-px h-3 bg-slate-300"></div>
                          <div className="flex items-center space-x-1.5">
                             <Lock className="w-3.5 h-3.5 text-slate-400" />
                             <span className="text-[8px] font-black uppercase tracking-widest">256-bit Encryption</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </form>

              {/* Pre-purchase Support */}
              <div className="pt-10 border-t border-slate-50 flex flex-col items-center space-y-4 text-center">
                 <div className="flex items-center space-x-3 text-slate-900">
                    <HelpCircle className="w-5 h-5 text-violet-600" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Need help before purchasing?</h4>
                 </div>
                 <p className="text-xs text-slate-500 font-medium leading-relaxed uppercase">
                    Our support team is here to answer any questions about our library or licensing. 
                    Email us at <a href="mailto:support@elymand.com" className="text-violet-600 font-bold hover:underline">support@elymand.com</a>
                 </p>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;