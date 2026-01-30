import React from 'react';
import { ArrowLeft, Scale, ShieldCheck, UserCheck, AlertCircle, RefreshCw, CreditCard, XCircle, FileText, Globe } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen selection:bg-violet-600 selection:text-white pb-32">
      {/* --- HEADER --- */}
      <header className="py-16 md:py-24 border-b border-slate-100 bg-slate-50/30">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16">
          <button onClick={() => navigate(-1)} className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 text-slate-400">
              <Scale className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Service Agreement</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Terms of <span className="text-violet-600">Service.</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed mx-auto md:mx-0">
              These terms govern your use of the Elymand platform and our creative assets. We believe in clear, honest communication for all our members.
            </p>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-4xl mx-auto px-6 md:px-16 pt-20">
        <article className="space-y-16">
          
          {/* Section 1: Account Responsibility */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Account Responsibility</h2>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                To download our professional patterns and motion assets, you must create an <b>Account</b>. You are responsible for keeping your login information safe.
              </p>
              <ul className="space-y-3 text-slate-500 text-sm font-medium">
                <li className="flex items-start">• Provide accurate and honest information during registration.</li>
                <li className="flex items-start">• Do not share your <b>Account</b> access with unauthorized users.</li>
                <li className="flex items-start">• Notify us immediately at <b>support@elymand.com</b> if you notice suspicious activity.</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Licensing & Asset Usage */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Licensing & Asset Usage</h2>
            </div>
            <div className="pl-16 space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                All patterns and motion graphics are provided under a <b>License</b>, not a sale. Elymand and its creators retain ownership of the original files.
              </p>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
                <p className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" /> Commercial Usage Rights
                </p>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  Your <b>Subscription</b> grants you <b>Commercial Rights</b> for physical products, digital advertising, and video production.
                </p>
                <p className="text-sm text-slate-900 font-bold leading-relaxed italic">
                  Critical: Assets downloaded and used in a project while your subscription is active remain licensed for that project forever, even after cancellation.
                </p>
              </div>
              <ul className="space-y-3 text-slate-500 text-sm font-medium">
                <li className="flex items-start">• No reselling or redistributing raw <b>AI, PSD, or 4K Video</b> files.</li>
                <li className="flex items-start">• No usage in competing stock platforms or "Print on Demand" sites as standalone designs.</li>
                <li className="flex items-start">• No use of assets to train AI models or automated design tools.</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Subscriptions & Automatic Renewal */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Subscriptions & Automatic Renewal</h2>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Elymand is a <b>Subscription</b> service. By joining, you agree to recurring monthly charges based on your chosen plan.
              </p>
              <p className="text-slate-500 text-base leading-relaxed font-medium">
                Your <b>Subscription</b> will <b>automatically renew</b> at the end of each billing cycle. Charges are processed at the start of each period using the <b>Payment</b> method on file.
              </p>
            </div>
          </section>

          {/* Section 4: Cancellation Rights */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <XCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Cancellation Rights</h2>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                You have the right to <b>Cancellation</b> at any time. There are no hidden fees or long-term contracts.
              </p>
              <div className="bg-violet-50 p-6 rounded-2xl border border-violet-100">
                <p className="text-xs text-violet-700 font-black uppercase tracking-widest leading-relaxed">
                  How to cancel: Visit your Dashboard &gt; Account Settings &gt; <b>Cancel Subscription</b>. Your access will stay active until the end of your current paid billing month.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Payment Issues */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Payment Issues</h2>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                All <b>Payments</b> are processed securely through 2Checkout (Verifone). We do not store your full card details.
              </p>
              <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase">
                If a <b>Payment</b> fails, we may temporarily pause your download access. Once the <b>Payment</b> is successfully processed, your full <b>Subscription</b> benefits will be restored immediately.
              </p>
            </div>
          </section>

          {/* Section 6: Updates to Terms */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Updates to Terms</h2>
            </div>
            <div className="pl-16 space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                We may update these terms occasionally to stay current with legal standards. 
              </p>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                If we make major changes, we will notify you via the email on your <b>Account</b>. Continued use of Elymand after updates means you agree to the new terms.
              </p>
            </div>
          </section>

        </article>

        {/* --- FOOTER --- */}
        <footer className="mt-24 pt-12 border-t border-slate-100 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-3 text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Elymand Compliance Protocol V2.0</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
            Last Reviewed: March 2026 • Verified for 2Checkout standards
          </p>
        </footer>
      </main>
    </div>
  );
};

export default TermsOfService;