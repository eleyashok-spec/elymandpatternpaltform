
import React from 'react';
import { ArrowLeft, ShieldCheck, Database, CreditCard, Globe, Lock, UserCheck, Bell, Mail, Info, Shield } from 'lucide-react';
// Added Link to the imports from react-router-dom
import { useNavigate, Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen selection:bg-violet-600 selection:text-white pb-32">
      {/* --- HEADER --- */}
      <header className="py-16 md:py-24 border-b border-slate-100 bg-slate-50/30">
        <div className="max-w-[1536px] mx-auto px-6 md:px-16">
          <button onClick={() => navigate(-1)} className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-violet-600 transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </button>
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-slate-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Global Data Protection</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              Privacy <span className="text-violet-600">Policy.</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
              At Elymand, your privacy is a priority. We are committed to protecting your personal data and being transparent about how we collect and use your information for our professional pattern and motion asset services.
            </p>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-4xl mx-auto px-6 md:px-16 pt-20">
        <article className="space-y-16">
          
          {/* Section 1: Information We Collect */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Information We Collect</h2>
            </div>
            <div className="pl-0 md:pl-16 space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                To provide a high-quality experience, we collect specific information when you interact with our platform:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-violet-600 rounded-full mt-2 shrink-0"></div>
                  <span className="text-slate-500 text-sm font-medium leading-relaxed"><b>Account Information:</b> Your name, email address, and account preferences provided during <b>Registration</b>.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-violet-600 rounded-full mt-2 shrink-0"></div>
                  <span className="text-slate-500 text-sm font-medium leading-relaxed"><b>Usage Data:</b> Records of your downloads, search queries, and asset interactions to manage your <b>Subscription</b> quotas and license rights.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-violet-600 rounded-full mt-2 shrink-0"></div>
                  <span className="text-slate-500 text-sm font-medium leading-relaxed"><b>Technical Log Data:</b> IP address, browser type, and device information used for security monitoring and preventing <b>Payment</b> fraud.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Secure Payment Processing */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Secure Payment Processing</h2>
            </div>
            <div className="pl-0 md:pl-16 space-y-6">
              <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 space-y-4">
                <p className="text-sm font-black text-emerald-900 uppercase tracking-widest flex items-center">
                  <Shield className="w-4 h-4 mr-2" /> PCI DSS Compliance
                </p>
                <p className="text-slate-700 font-bold leading-relaxed">
                  Elymand does <u>not</u> store your credit card information or sensitive billing details on our servers.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  All <b>Payments</b> are processed securely through <b>2Checkout / Verifone</b>, a global leader in secure online commerce. They use 256-bit SSL encryption to ensure your financial data remains private and protected.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: How We Use Your Data */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">How We Use Your Data</h2>
            </div>
            <div className="pl-0 md:pl-16 space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                We use the data we collect for the following professional purposes:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-slate-500 font-medium">
                  <div className="w-1 h-1 bg-slate-300 rounded-full mt-2 mr-3 shrink-0"></div>
                  <span>Providing access to the <b>Master Archive</b> and managing <b>Commercial Licenses</b>.</span>
                </li>
                <li className="flex items-start text-sm text-slate-500 font-medium">
                  <div className="w-1 h-1 bg-slate-300 rounded-full mt-2 mr-3 shrink-0"></div>
                  <span>Processing <b>Subscriptions</b> and providing customer support for technical issues.</span>
                </li>
                <li className="flex items-start text-sm text-slate-500 font-medium">
                  <div className="w-1 h-1 bg-slate-300 rounded-full mt-2 mr-3 shrink-0"></div>
                  <span>Improving platform performance and tailoring our weekly design updates to user trends.</span>
                </li>
                <li className="flex items-start text-sm text-slate-500 font-medium">
                  <div className="w-1 h-1 bg-slate-300 rounded-full mt-2 mr-3 shrink-0"></div>
                  <span>Maintaining security and preventing unauthorized account sharing or <b>Payment</b> abuse.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Your Privacy Rights */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Your Privacy Rights</h2>
            </div>
            <div className="pl-0 md:pl-16 space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                We respect global privacy standards, including <b>GDPR</b> and <b>CCPA</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Right to Access", desc: "You can request a copy of the personal data we hold about you at any time." },
                  { title: "Right to Deletion", desc: "You can request that we permanently delete your account and associated data." },
                  { title: "Data Portability", desc: "You have the right to receive your data in a structured, commonly used format." },
                  { title: "Data Accuracy", desc: "You can update or correct your personal information via your <b>Dashboard</b>." }
                ].map((right, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-widest mb-2">{right.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{right.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                Retention Policy: We retain your data only as long as necessary to provide services and comply with legal or <b>Billing</b> obligations.
              </p>
            </div>
          </section>

          {/* Section 5: Communications */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Communications</h2>
            </div>
            <div className="pl-0 md:pl-16 space-y-4">
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                We send essential communications related to your <b>Account</b>, such as <b>Payment</b> receipts, password resets, and license updates.
              </p>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                You may occasionally receive updates about new pattern collections or 4K motion drops. You can opt-out of these marketing messages at any time using the "Unsubscribe" link in our emails.
              </p>
            </div>
          </section>

          {/* Section 6: Contact Us */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">Contact Us</h2>
            </div>
            <div className="pl-0 md:pl-16 space-y-6">
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 text-center md:text-left">
                  <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Privacy Team</p>
                  <p className="text-xl font-black tracking-tight">privacy@elymand.com</p>
                </div>
                {/* Link is now correctly imported and used below */}
                <Link to="/contact" className="px-8 py-4 bg-white text-slate-900 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-violet-600 hover:text-white transition-all">
                  Support Desk
                </Link>
              </div>
            </div>
          </section>

        </article>

        {/* --- FOOTER --- */}
        <footer className="mt-24 pt-12 border-t border-slate-100 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-3 text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Elymand Privacy Protocol V3.0</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
            Last Updated: March 2026 • Verified for 2Checkout & Global Standards
          </p>
        </footer>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
