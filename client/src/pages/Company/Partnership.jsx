import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Globe, Users, TrendingUp, Zap, ShieldCheck, CheckCircle, Handshake, MessageSquare, FileText } from 'lucide-react';
import SEO from '../../components/SEO';
import { API } from '../../lib/api.js';

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}>
      {children}
    </div>
  );
};

const GridPattern = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
);

function PartnerModal({ onClose }) {
  const [form, setForm] = useState({ companyName: '', contactName: '', email: '', phone: '', partnershipType: 'Agency', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API}/partners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Received!</h3>
            <p className="text-slate-600 mb-6">I'll personally review your application and get back to you within 48 hours.</p>
            <button onClick={onClose} className="px-8 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors">Done</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Partner Application</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">×</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Company / Your Name</label>
                  <input required value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Acme Agency" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Contact Name</label>
                  <input required value={form.contactName} onChange={e => setForm({...form, contactName: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Your name" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="you@company.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Partnership Type</label>
                <select value={form.partnershipType} onChange={e => setForm({...form, partnershipType: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
                  {['Agency', 'Reseller', 'Technology', 'Referral'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">How do you see us working together?</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                  placeholder="Tell me about your business and what kind of collaboration you have in mind..." />
              </div>
              {status === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
              <button type="submit" disabled={status === 'loading'}
                className="w-full py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors disabled:opacity-60">
                {status === 'loading' ? 'Submitting...' : 'Send Application'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Partnership() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO title="Partnership Program" description="Partner with TechCore. Agency, reseller, and referral partnerships. Work directly with the founder." path="/company/partnership" />
      {showModal && <PartnerModal onClose={() => setShowModal(false)} />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] bg-green-400/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl opacity-50" />
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-green-100 backdrop-blur-sm shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 mr-3 animate-pulse"></span>
                <span className="text-sm font-semibold text-green-700 tracking-wide uppercase">Partnership Program</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                Let's Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">Something Together</span>
              </h1>
              <p className="text-xl text-slate-600 mb-6 leading-relaxed max-w-xl">
                TechCore is actively looking for its first partners — agencies, freelancers, and businesses who want a reliable technical execution partner they can trust.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 mb-10 flex items-start gap-3">
                <span className="text-xl">🚀</span>
                <p className="text-amber-800 text-sm leading-relaxed">
                  <strong>Early partner advantage:</strong> The first partners to join get direct founder access, flexible terms, and the ability to shape how this program works. This is a ground-floor opportunity.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => setShowModal(true)} className="group px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  Become a Partner <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <a href="mailto:vishalvaishali0598@gmail.com"
                  className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:border-green-200 hover:bg-green-50/50 hover:-translate-y-1 transition-all duration-300 shadow-sm text-center">
                  Email Directly
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Honest positioning */}
      <Reveal>
        <div className="border-y border-slate-200/60 bg-white/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "Direct", label: "Founder Access", sub: "You talk to Vishal" },
                { value: "Flexible", label: "Terms", sub: "We figure it out together" },
                { value: "NDA", label: "Protected", sub: "From day one" },
                { value: "48hrs", label: "Response Time", sub: "On every application" },
              ].map((s, i) => (
                <div key={i} className="text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2">{s.value}</div>
                  <div className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-1">{s.label}</div>
                  <div className="text-xs text-slate-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Partnership Types */}
      <section className="py-24 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-green-600 font-bold tracking-wide uppercase text-sm mb-3">Partnership Types</h2>
              <h3 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6">How We Can Work Together</h3>
              <p className="text-lg text-slate-600">Three simple models. All flexible. All negotiable for the right partner.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Agency Partner",
                desc: "You're a design agency, marketing firm, or consultancy. Your clients need development work. We build it under your brand — you stay the hero.",
                perks: ["White-label delivery", "Your branding on all work", "NDA signed upfront", "Competitive wholesale pricing"],
                color: "from-blue-500 to-cyan-500",
                bg: "bg-blue-50 border-blue-100",
              },
              {
                icon: TrendingUp,
                title: "Referral Partner",
                desc: "You know businesses that need software. You refer them to TechCore. We do the work, you earn a commission on every successful project.",
                perks: ["Commission on every referral", "No technical knowledge needed", "Simple referral tracking", "Paid on project completion"],
                color: "from-green-500 to-emerald-500",
                bg: "bg-green-50 border-green-100",
              },
              {
                icon: Zap,
                title: "Tech / Freelancer Partner",
                desc: "You're a freelancer or small tech team. We collaborate on projects — you bring clients or skills, we bring capacity and infrastructure.",
                perks: ["Revenue sharing on joint projects", "Shared technical resources", "Flexible collaboration model", "Direct communication always"],
                color: "from-violet-500 to-purple-500",
                bg: "bg-violet-50 border-violet-100",
              },
            ].map((p, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className={`group h-full p-8 rounded-3xl border ${p.bg} hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}>
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <p.icon size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">{p.title}</h4>
                  <p className="text-slate-600 leading-relaxed mb-6">{p.desc}</p>
                  <ul className="space-y-2">
                    {p.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 text-sm">
                        <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0`}>
                          <span className="text-white text-xs">✓</span>
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why partner with us — honest version */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Why Partner with TechCore?</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">We're honest about where we are. Here's what we actually offer right now.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Handshake, title: "Direct Founder Relationship", desc: "You work with Vishal directly — not an account manager. Decisions get made fast, communication is clear, and nothing gets lost in translation." },
              { icon: ShieldCheck, title: "Quality You Can Stake Your Name On", desc: "We only take projects we can do well. If we can't deliver to the standard your clients expect, we'll say so upfront." },
              { icon: MessageSquare, title: "Transparent Communication", desc: "Weekly updates, honest timelines, and no surprises. Your clients will be impressed — and so will you." },
              { icon: FileText, title: "NDA from Day One", desc: "Every partnership starts with a mutual NDA. Your clients, your relationships, and your business are fully protected." },
              { icon: Zap, title: "Fast Turnaround", desc: "No big-agency bureaucracy. Decisions happen quickly, projects start fast, and you're never waiting on approvals." },
              { icon: TrendingUp, title: "Growing Together", desc: "As TechCore grows, so do the benefits for early partners. The terms we agree on now will only get better over time." },
            ].map((b, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="group flex items-start gap-5 p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="h-12 w-12 rounded-2xl bg-green-500 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <b.icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to get started */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">How to Get Started</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Simple, fast, and no commitment required to have the first conversation.</p>
            </div>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { num: "01", title: "Apply or Email", desc: "Fill out the application form or email me directly at vishalvaishali0598@gmail.com. Tell me about your business and what you're looking for." },
              { num: "02", title: "Quick Call", desc: "We'll have a 20-30 minute call to understand each other. No pitch, no pressure — just an honest conversation about whether this makes sense." },
              { num: "03", title: "Start Collaborating", desc: "If it's a fit, we agree on terms and start. First project together, we figure out the workflow. It gets easier from there." },
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="group p-8 rounded-3xl bg-white border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="text-5xl font-black text-green-100 group-hover:text-green-200 transition-colors mb-4">{step.num}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        <Reveal>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-black text-white mb-4">Ready to Partner Up?</h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    I'm actively looking for the right first partners. If you're a design agency, freelancer, or business with clients who need development work — let's talk. No long forms, no gatekeeping. Just a direct conversation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => setShowModal(true)}
                      className="px-8 py-4 rounded-2xl bg-green-500 text-white font-bold text-lg shadow-xl shadow-green-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                      Apply Now <ArrowRight size={20} />
                    </button>
                    <a href="mailto:vishalvaishali0598@gmail.com"
                      className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all text-center">
                      Email Directly
                    </a>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                  <div className="text-green-400 text-sm font-bold uppercase tracking-wide mb-4">What early partners get</div>
                  <ul className="space-y-3">
                    {[
                      "Direct access to the founder on every project",
                      "Flexible commission and revenue share terms",
                      "NDA signed before any details are shared",
                      "Input into how the partnership program evolves",
                      "Priority capacity as TechCore grows",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                        <CheckCircle size={16} className="text-green-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
