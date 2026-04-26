import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Zap, TrendingUp, Code, Users, ShieldCheck, Globe, CheckCircle } from 'lucide-react';
import LeadModal from '../../components/LeadModal';
import SEO from '../../components/SEO';

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}>{children}</div>;
};

export default function StartupSolution() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO title="Startup Solution" description="MVP in 6 weeks. Technical co-founder mindset without the equity cost. Investor-ready products for early-stage startups." path="/solutions/startup" />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="Startup Solution" title="Launch Your Startup" />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] bg-orange-400/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-orange-100 backdrop-blur-sm shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-orange-500 mr-3 animate-pulse"></span>
                <span className="text-sm font-semibold text-orange-700 tracking-wide uppercase">Startup Solution</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8">
                From Idea to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Launch in Weeks</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                We help startups move fast — MVP in 6 weeks, investor-ready product, and a technical co-founder mindset without the equity cost.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => setShowModal(true)} className="group px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center">
                  Launch My Startup <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-orange-50 hover:-translate-y-1 transition-all shadow-sm">
                  See MVP Examples
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Metrics */}
      <Reveal>
        <div className="border-y border-slate-200/60 bg-white/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "6 Weeks", label: "MVP Delivery", sub: "Avg. Timeline" },
              { value: "50%", label: "Cost Savings", sub: "vs. In-House Team" },
              { value: "Seed+", label: "Funding Raised", sub: "By Our Clients" },
              { value: "3x", label: "Faster to Market", sub: "vs. Traditional Dev" },
            ].map((s, i) => (
              <div key={i} className="text-center hover:-translate-y-1 transition-transform">
                <div className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">{s.value}</div>
                <div className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">{s.label}</div>
                <div className="text-xs text-slate-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* What We Offer */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <Reveal><div className="text-center mb-20"><h2 className="text-4xl font-extrabold text-slate-900 mb-4">Built for Founders</h2><p className="text-slate-600 max-w-2xl mx-auto">Everything you need to go from napkin sketch to funded product.</p></div></Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "MVP Development", desc: "Core features only. Ship fast, validate with real users, iterate based on data." },
            { icon: Code, title: "Technical Co-Founder", desc: "We act as your CTO — architecture decisions, tech stack, team hiring guidance." },
            { icon: TrendingUp, title: "Investor-Ready Product", desc: "Polished UI, solid architecture, and a demo that impresses investors." },
            { icon: Users, title: "Team Scaling", desc: "Once you raise, we help you hire and onboard your in-house engineering team." },
            { icon: ShieldCheck, title: "Security from Day 1", desc: "No shortcuts on security. Enterprise-grade practices even at MVP stage." },
            { icon: Globe, title: "Growth Infrastructure", desc: "Analytics, A/B testing, and growth tooling built into your product from launch." },
          ].map((card, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <div className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <card.icon size={26} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h4>
                <p className="text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-white">
        <Reveal>
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-orange-300 rounded-full opacity-20 blur-3xl"></div>
              <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                  <h2 className="text-4xl font-extrabold mb-8">Why Startups Choose TechCore</h2>
                  <ul className="space-y-5">
                    {["No equity taken — just a fair project fee", "Weekly demos so you stay in control", "Flexible scope as your vision evolves", "Post-launch support until you hire in-house", "Intro to our investor network on request"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center shrink-0"><CheckCircle size={16} /></div>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 border border-white/20 p-8 rounded-3xl">
                  <div className="flex gap-1 text-amber-300 mb-4">{[1,2,3,4,5].map(i => <span key={i}>★</span>)}</div>
                  <p className="text-xl font-medium leading-relaxed mb-6">"TechCore built our MVP in 5 weeks. We raised our seed round 3 months later. They were the best investment we made."</p>
                  <div className="text-orange-200 text-sm">— Founder, FinTech Startup (YC W24)</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl font-black text-slate-900 mb-6">Ready to Build Your MVP?</h2>
            <p className="text-xl text-slate-600 mb-10">Book a free 30-min call. We'll scope your MVP and give you a timeline on the spot.</p>
            <button onClick={() => setShowModal(true)} className="px-10 py-5 rounded-2xl bg-orange-500 text-white font-bold text-lg shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3 mx-auto">
              Book Free MVP Call <ArrowRight size={22} />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
