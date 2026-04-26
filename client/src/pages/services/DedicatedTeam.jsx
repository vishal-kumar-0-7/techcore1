import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Users, ShieldCheck, Zap, Globe, Code, TrendingUp, CheckCircle, Layers } from 'lucide-react';
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

export default function DedicatedTeam() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO title="Dedicated Development Team" description="Hire a dedicated team of vetted engineers. Staff augmentation, dedicated squads, and build-operate-transfer models." path="/services/dedicated-team" />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="Dedicated Team" />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] bg-indigo-400/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl opacity-50" />
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-indigo-100 backdrop-blur-sm shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 mr-3 animate-pulse"></span>
                <span className="text-sm font-semibold text-indigo-700 tracking-wide uppercase">Dedicated Team</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                Your Team, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Our Engineers</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                Hire a fully managed, dedicated development team that integrates seamlessly with your workflow — without the overhead of in-house hiring.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => setShowModal(true)} className="group px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  Build My Team <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  Meet the Team
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Metrics */}
      <Reveal>
        <div className="border-y border-slate-200/60 bg-white/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "Honest", label: "Timelines", sub: "No padding, no fluff" },
                { value: "Direct", label: "Founder Access", sub: "You talk to the team" },
                { value: "Full IP", label: "Ownership", sub: "Transferred to you" },
                { value: "30 Days", label: "Post-Launch", sub: "Bug fix warranty" },
              ].map((s, i) => (
                <div key={i} className="text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 mb-2">{s.value}</div>
                  <div className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-1">{s.label}</div>
                  <div className="text-xs text-slate-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Roles We Provide */}
      <section className="py-24 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">Roles Available</h2>
              <h3 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6">Every Role You Need</h3>
              <p className="text-lg text-slate-600">From individual contributors to full cross-functional teams — we staff exactly what you need.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Code, title: "Frontend Engineers", desc: "React, Vue, Angular, Next.js specialists who build pixel-perfect, performant UIs." },
              { icon: Globe, title: "Backend Engineers", desc: "Node.js, Python, Go, Java engineers for robust APIs and scalable server systems." },
              { icon: Layers, title: "Full-Stack Developers", desc: "End-to-end engineers who own features from database to UI." },
              { icon: Zap, title: "DevOps Engineers", desc: "Cloud, CI/CD, and infrastructure specialists to keep your systems running smoothly." },
              { icon: TrendingUp, title: "QA Engineers", desc: "Manual and automation testers who ensure quality at every release." },
              { icon: Users, title: "Tech Leads & Architects", desc: "Senior engineers who lead teams, define architecture, and mentor developers." },
            ].map((card, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="group h-full p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-14 w-14 rounded-2xl bg-indigo-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <card.icon size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">{card.title}</h4>
                  <p className="text-slate-600 leading-relaxed mb-6">{card.desc}</p>
                  <div className="flex items-center text-indigo-600 font-bold text-sm group-hover:translate-x-2 transition-transform cursor-pointer">
                    Hire Now <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Up and Running in 72 Hours</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Our onboarding process is designed to get your team productive from day one.</p>
            </div>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-4">
            {[
              { num: "01", title: "Define Requirements", desc: "Tell us the roles, skills, timezone, and team size you need." },
              { num: "02", title: "Meet Candidates", desc: "We present pre-vetted profiles within 24 hours. You interview and choose." },
              { num: "03", title: "Onboard & Integrate", desc: "Your team joins your tools, processes, and standups seamlessly." },
              { num: "04", title: "Scale as Needed", desc: "Add or remove team members monthly with no long-term lock-in." },
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="text-5xl font-black text-indigo-100 group-hover:text-indigo-200 transition-colors mb-4">{step.num}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Flexible Engagement Models</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Choose the model that fits your needs — no rigid contracts.</p>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                name: "Staff Augmentation",
                desc: "Add individual engineers to your existing team. You manage, we provide.",
                features: ["1–5 engineers", "Your processes & tools", "Monthly billing", "2-week notice period"],
                popular: false,
                color: "border-slate-200"
              },
              {
                name: "Dedicated Squad",
                desc: "A fully managed team with a tech lead, developers, and QA. We manage, you direct.",
                features: ["5–15 engineers", "Dedicated tech lead", "Agile sprints", "Weekly demos"],
                popular: true,
                color: "border-indigo-500"
              },
              {
                name: "Build-Operate-Transfer",
                desc: "We build and run your team, then transfer full ownership to you.",
                features: ["Full team setup", "6–12 month ramp", "Knowledge transfer", "Full IP & team ownership"],
                popular: false,
                color: "border-slate-200"
              },
            ].map((plan, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className={`relative p-8 rounded-3xl border-2 ${plan.popular ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-white'} shadow-lg`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-6">{plan.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center text-slate-600">
                        <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${plan.popular ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                    Get Started
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-white relative overflow-hidden">
        <Reveal>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/30">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-indigo-400 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 bg-purple-600 rounded-full opacity-40 blur-3xl"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Not a Vendor. A Partner.</h2>
                  <ul className="space-y-6">
                    {["Engineers vetted through 5-stage technical process", "NDA and IP protection from day one", "Timezone-aligned teams available", "Dedicated account manager included"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group">
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                          <CheckCircle size={18} />
                        </div>
                        <span className="font-semibold text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                  <div className="flex gap-1 text-amber-300 mb-6">{[1,2,3,4,5].map(i => <span key={i}>★</span>)}</div>
                  <p className="text-xl font-medium leading-relaxed mb-8">"We scaled from 3 to 18 engineers in 2 months with TechCore. The quality and speed of onboarding was unlike anything we'd experienced."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">TW</div>
                    <div>
                      <div className="font-bold">— Replace with a real client name once available</div>
                      <div className="text-indigo-200 text-sm">Dedicated Team Client</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tight">Build Your Dream Team Today</h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">Tell us what you need and we'll have candidates ready within 24 hours.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-indigo-500 text-white font-bold text-lg shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Build My Team <ArrowRight size={24} className="ml-3" />
              </button>
              <button onClick={() => navigate('/resources/appointment')} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                View Pricing
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
