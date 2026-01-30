import React from 'react';
import { ArrowLeft, ArrowRight, FileText, ShieldCheck, HelpCircle, Clock, AlertCircle, CheckCircle2, Info, CreditCard, Mail, Monitor, XCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const RefundPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen selection:bg-violet-600 selection:text-white pb-32">
      {/* --- HEADER --- */}
      <header className="py-16 md:py-24 border-b border-slate-100 bg-slate-50/30">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16">
          <button onClick={() => navigate(-1)} className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </button>
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-slate-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Satisfaction & Compliance</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Refund & <span className="text-violet-600">Cancellation.</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
              We value your trust. Our refund and cancellation policies are designed to be fair, transparent, and compliant with global digital commerce standards for our premium creative assets.
            </p>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-4xl mx-auto px-6 md:px-16 pt-20">
        <article className="space-y-20">
          
          {/* Section 1: Subscription Cancellation */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Subscription Cancellation</h2>
            </div>
            <div className="pl-0 md:pl-16 space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                You have full control over your <b>Subscription</b>. You may cancel your membership at any time without penalty or long-term obligation.
              </p>
              <ul className="space-y-3 text-slate-500 text-sm font-medium">
                <li className="flex items-start">• <b>Method:</b> Cancel directly via your <b>Dashboard > Account Settings > Subscription Management</b>.</li>
                <li className="flex items-start">• <b>Access:</b> Upon cancellation, your access to the <b>Master Archive</b> and all commercial rights will remain active until the end of your current paid billing cycle.</li>
                <li className="flex items-start">• <b>Renewal:</b> Once cancelled, no further automatic charges will be processed.</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Refund Guidelines */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Refund Guidelines</h2>
            </div>
            <div className="pl-0 md:pl-16 space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Due to the <b>digital nature</b> of our patterns and motion graphics, all sales are generally final once an asset has been accessed or downloaded. 
              </p>
              <div className="bg-violet-50 p-8 rounded-3xl border border-violet-100 space-y-4">
                <p className="text-sm font-black text-violet-900 uppercase tracking-widest flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" /> Refund-Eligible Cases
                </p>
                <p className="text-slate-700 font-bold text-sm leading-relaxed">
                  Refunds are issued at our discretion in the following specific scenarios:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start text-sm text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" />
                    <span><b>Billing Errors:</b> Duplicate transactions or verified incorrect charge amounts.</span>
                  </li>
                  <li className="flex items-start text-sm text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" />
                    <span><b>Technical Failure:</b> Inability to access assets due to a verified, persistent failure of our platform that our team cannot resolve.</span>
                  </li>
                  <li className="flex items-start text-sm text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" />
                    <span><b>Asset Corruption:</b> The specific downloaded file is demonstrably corrupted or does not match the catalog description.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Software Compatibility */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <Monitor className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Software Compatibility</h2>
            </div>
            <div className="pl-0 md:pl-16 space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                It is the user's responsibility to ensure their software is compatible with our industry-standard formats.
              </p>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-relaxed">
                  We provide files in <b>AI, EPS, PSD, SVG, MP4, and MOV</b>. We recommend using <b>Adobe Creative Cloud</b> or equivalent professional software. Refunds are not provided for software incompatibilities if the file meets these standard specifications.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: How to Request a Refund */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">How to Request a Refund</h2>
            </div>
            <div className="pl-0 md:pl-16 space-y-8">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                If you meet the criteria for a refund, please follow this professional request protocol:
              </p>
              <div className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] text-white shadow-xl space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <CreditCard className="w-32 h-32" />
                </div>
                <div className="space-y-4 relative z-10">
                   <h4 className="text-xl font-black uppercase tracking-tight">Step 2: Include Information</h4>
                   <ul className="grid sm:grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                      {/* Added ArrowRight icon import on line 2 and fixed its usage below */}
                      <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2 text-violet-400" /> Order Number / Transaction ID</li>
                      <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2 text-violet-400" /> Account Email</li>
                      <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2 text-violet-400" /> Reason for Request</li>
                      <li className="flex items-center"><ArrowRight className="w-3 h-3 mr-2 text-violet-400" /> Evidence of Technical Issue</li>
                   </ul>
                </div>
                <div className="pt-4 border-t border-white/10 relative z-10">
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                     Our Billing Team reviews all requests within <b>2 business days</b>.
                   </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Finality of Purchases */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <XCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Finality of Purchases</h2>
            </div>
            <div className="pl-0 md:pl-16 space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Purchases are legally considered <b>delivered and completed</b> at the moment a digital asset is accessed, downloaded, or viewed in high-resolution via our platform.
              </p>
              <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase">
                We encourage all users to review pattern previews and motion graphics samples before completing their <b>Subscription</b> or <b>Payment</b>.
              </p>
            </div>
          </section>

        </article>

        {/* --- FOOTER --- */}
        <footer className="mt-32 pt-12 border-t border-slate-100 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-3 text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Elymand Global Commerce Protocol V3.0</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
            Last Reviewed: March 2026 • Professional Standard Verified for 2Checkout Compliance
          </p>
        </footer>
      </main>
    </div>
  );
};

export default RefundPolicy;