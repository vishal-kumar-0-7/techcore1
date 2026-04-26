import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Code, CheckCircle, Globe, Heart, Users, Clock, Award } from 'lucide-react';
import LeadModal from '../../components/LeadModal';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';

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

const differentiators = [
  { icon: Code, title: "Engineers, Not Order-Takers", desc: "I don't just execute a spec and call it done. If I see a better approach, a potential issue, or a simpler solution — I'll tell you. You're paying for judgment, not just keystrokes.", color: "from-blue-500 to-cyan-500" },
  { icon: Clock, title: "Honest Timelines", desc: "I won't pad estimates to look safe, and I won't underquote to win the project. You get a realistic timeline upfront — and if something changes, you hear about it immediately.", color: "from-green-500 to-emerald-500" },
  { icon: ShieldCheck, title: "Quality Over Speed", desc: "Every project gets proper code review, testing, and documentation. I'd rather take an extra few days and ship something solid than rush and leave you with technical debt.", color: "from-violet-500 to-purple-500" },
  { icon: Heart, title: "Founder-Level Care", desc: "TechCore is my reputation. Every project I take on reflects directly on me — so I treat your product like it's my own. That's not a marketing line, it's just how it works when you're the founder.", color: "from-rose-500 to-pink-500" },
  { icon: Globe, title: "Full Transparency", desc: "You have access to the code repository, staging environment, and project tracker throughout the build. No black boxes, no surprises at handover.", color: "from-amber-500 to-orange-500" },
  { icon: Award, title: "You Own Everything", desc: "Full IP transfer at handover — code, assets, documentation. No licensing fees, no lock-in. What we build for you is yours, completely.", color: "from-indigo-500 to-blue-500" },
];

const comparisons = [
  { feature: "Weekly progress updates" },
  { feature: "Full IP ownership transferred at handover" },
  { feature: "30-day post-launch bug fix warranty" },
  { feature: "Dedicated point of contact (the founder)" },
  { feature: "Transparent, fixed pricing — no hidden fees" },
  { feature: "Access to code repo throughout the project" },
  { feature: "Proactive communication when things change" },
  { feature: "You talk to the builder, not an account manager" },
];

const founderAdvantages = [
  { icon: Users, title: "No information gets lost in translation", desc: "At a big agency, your brief goes through a sales rep, then a project manager, then a tech lead, then a developer. By the time it reaches the person building, something's been misunderstood. With TechCore, you talk directly to the person writing the code." },
  { icon: Zap, title: "Decisions happen fast", desc: "Need to change direction? Spotted something that needs fixing? At a large agency, that's a change request, a meeting, an approval chain. Here, you message me and we figure it out the same day." },
  { icon: Heart, title: "The founder has skin in the game", desc: "A developer at a big agency moves on to the next project. I'm building TechCore's reputation one project at a time. Your outcome matters to me beyond the invoice — because every client is a reference, a case study, and a reason to keep going." },
  { icon: ShieldCheck, title: "Focused, not spread thin", desc: "Large agencies juggle dozens of clients. I take on a small number of projects at a time so each one gets real attention. You're not competing for bandwidth with 20 other clients." },
];

export default function WhyChooseUs() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO title="Why Choose Us" description="TechCore is a founder-led agency. Direct access to the builder, honest timelines, full IP ownership, and transparent pricing." path="/company/why-choose-us" />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="General Inquiry" title="Start Your Project" />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] bg-violet-400/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl opacity-50" />
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-violet-100 backdrop-blur-sm shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-violet-500 mr-3 animate-pulse"></span>
                <span className="text-sm font-semibold text-violet-700 tracking-wide uppercase">Why TechCore</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                A Different Kind <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-600">of Agency</span>
              </h1>
              <p className="text-xl text-slate-600 mb-6 leading-relaxed max-w-xl">
                TechCore is new. We don't have 100 clients or a wall of awards. What we have is a founder who builds your product personally, communicates honestly, and cares about getting it right.
              </p>
              <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100 mb-10 flex items-start gap-3">
                <span className="text-xl">🚀</span>
                <p className="text-violet-800 text-sm leading-relaxed">
                  <strong>Being early-stage is a feature, not a bug.</strong> You get founder attention, fast decisions, and a team that's hungry to prove itself — not a junior dev assigned to your project while the seniors work on bigger accounts.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => setShowModal(true)} className="group px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  Start a Project <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button onClick={() => navigate('/work')} className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:border-violet-200 hover:bg-violet-50/50 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  See Our Work
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Positioning bar */}
      <Reveal>
        <div className="border-y border-slate-200/60 bg-white/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "Quality", label: "First, Always", sub: "No shortcuts, ever" },
                { value: "Direct", label: "Founder Access", sub: "You talk to the builder" },
                { value: "Full IP", label: "Ownership", sub: "Transferred to you" },
                { value: "Transparent", label: "Pricing", sub: "No hidden fees" },
              ].map((s, i) => (
                <div key={i} className="text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 mb-2">{s.value}</div>
                  <div className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-1">{s.label}</div>
                  <div className="text-xs text-slate-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Differentiators */}
      <section className="py-24 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-violet-600 font-bold tracking-wide uppercase text-sm mb-3">What Sets Us Apart</h2>
              <h3 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6">Six Things We Actually Stand Behind</h3>
              <p className="text-lg text-slate-600">No inflated percentages or made-up stats. Just the principles that guide how we work on every project.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((d, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="group h-full p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${d.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <d.icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{d.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">TechCore vs. Typical Agency</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">These are real differences — things we genuinely offer that most agencies don't.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
              <div className="grid grid-cols-3 bg-slate-900 text-white">
                <div className="p-5 text-sm font-bold uppercase tracking-wide text-slate-400">Feature</div>
                <div className="p-5 text-center"><div className="text-sm font-bold uppercase tracking-wide text-violet-400">TechCore</div></div>
                <div className="p-5 text-center"><div className="text-sm font-bold uppercase tracking-wide text-slate-500">Typical Agency</div></div>
              </div>
              {comparisons.map((row, idx) => (
                <div key={idx} className={`grid grid-cols-3 border-t border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-violet-50/30 transition-colors`}>
                  <div className="p-5 text-slate-700 font-medium text-sm">{row.feature}</div>
                  <div className="p-5 flex justify-center items-center">
                    <span className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle size={16} className="text-green-600" />
                    </span>
                  </div>
                  <div className="p-5 flex justify-center items-center">
                    <span className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-500 font-bold text-sm">✕</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-center text-slate-400 text-xs mt-4">"Typical agency" refers to mid-size generalist agencies. Results vary — this reflects common patterns, not every agency.</p>
          </Reveal>
        </div>
      </section>

      {/* Why founder-led is better */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#7c3aed 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-violet-400 font-bold tracking-wide uppercase text-sm mb-3">The Real Advantage</h2>
              <h3 className="text-4xl font-extrabold text-white mb-4">Why Clients Choose a Founder-Led Agency</h3>
              <p className="text-slate-400 max-w-2xl mx-auto">Working with a small, focused team isn't a compromise — for the right project, it's genuinely better.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {founderAdvantages.map((item, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="group bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:bg-slate-900 hover:border-violet-900/50 transition-all duration-300 h-full flex items-start gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
                    <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="mt-12 p-8 rounded-3xl bg-white/5 border border-white/10 max-w-3xl mx-auto text-center">
              <p className="text-slate-300 leading-relaxed">
                A founder-led agency isn't right for every project. If you need a 20-person team running parallel workstreams, that's not us — yet. But if you want a skilled, focused developer who will treat your project like it matters, communicate honestly, and deliver something you're proud of — that's exactly what TechCore is built for.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        <Reveal>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-violet-600 to-blue-600 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-violet-900/30">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-violet-400 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 bg-blue-600 rounded-full opacity-40 blur-3xl"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Be One of Our First Clients</h2>
                  <p className="text-violet-100 text-lg leading-relaxed mb-8">We're building our reputation one project at a time. That means every client gets our full attention, our best work, and a founder who's genuinely invested in the outcome.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => setShowModal(true)} className="px-8 py-4 rounded-2xl bg-white text-violet-600 font-bold text-lg hover:bg-violet-50 transition-colors shadow-lg flex items-center justify-center gap-2">
                      Start a Conversation <ArrowRight size={18} />
                    </button>
                    <button onClick={() => navigate('/resources/appointment')} className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all">
                      Book a Call
                    </button>
                  </div>
                </div>
                <div className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-sm">
                  <div className="text-violet-200 text-sm font-bold uppercase tracking-wide mb-4">What you get</div>
                  <ul className="space-y-3">
                    {["Direct access to the founder on every project", "Weekly updates — no black boxes", "Full source code and IP ownership", "Honest timelines, no padding", "30-day post-launch bug fix warranty", "Transparent, fixed pricing"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white text-sm">
                        <CheckCircle size={16} className="text-violet-300 shrink-0" />
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

      {/* Bottom CTA */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Ready to Build Something?</h2>
            <p className="text-xl text-slate-600 mb-4 max-w-2xl mx-auto">We're building our reputation one project at a time. If you want a developer who's hungry, focused, and genuinely cares about your outcome — let's talk.</p>
            <p className="text-slate-400 text-sm mb-12">No sales team. No account managers. Just three engineers who care.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-violet-600 text-white font-bold text-lg shadow-xl shadow-violet-600/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Start Your Project <ArrowRight size={24} className="ml-3" />
              </button>
              <button onClick={() => navigate('/resources/appointment')} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                Book a Free Call
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
