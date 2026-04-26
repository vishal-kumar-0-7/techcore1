import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Globe, ShieldCheck, Zap, Users, Code, TrendingUp, CheckCircle, FileCheck, Handshake, Rocket } from 'lucide-react';
import LeadModal from '../../components/LeadModal';
import SEO from '../../components/SEO';
import { useNavigate } from 'react-router-dom';

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

const GridPattern = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
);

export default function WhiteLabel() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO title="White Label Solutions" description="Resell TechCore's services under your own brand. Full white-label delivery with zero TechCore branding. NDA protected." path="/solutions/white-label" />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="White Label" title="Start White Label" />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] bg-teal-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-3xl" />
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-teal-100 backdrop-blur-sm shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-teal-500 mr-3 animate-pulse"></span>
                <span className="text-sm font-semibold text-teal-700 tracking-wide uppercase">White Label Solutions</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8">
                Your Brand. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Our Engineering.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                Resell TechCore's products and services under your own brand. We build, you sell. Full white-label delivery with zero TechCore branding.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => setShowModal(true)} className="group px-8 py-4 rounded-2xl bg-teal-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center">
                  Start White Label <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button onClick={() => navigate('/work')} className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-teal-50 hover:-translate-y-1 transition-all shadow-sm">
                  See Our Work
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
              { value: "100%", label: "Your Branding", sub: "Zero TechCore Mention" },
              { value: "NDA", label: "Protected", sub: "Full Confidentiality" },
              { value: "48hrs", label: "Onboarding", sub: "Time to First Project" },
              { value: "30%", label: "Margin", sub: "Avg. Partner Profit" },
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

      {/* What You Can White Label */}
      <section className="py-24 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-teal-600 font-bold tracking-wide uppercase text-sm mb-3">Services Available</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-4">What You Can White Label</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">Every TechCore service is available under your brand — delivered to your clients as if your team built it.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Code, title: "Web & App Development", desc: "Deliver web and mobile projects to your clients. We build, you present as your own work." },
              { icon: Globe, title: "SaaS Products", desc: "Resell our SaaS platforms with your logo, domain, and pricing. Full customization available." },
              { icon: Zap, title: "AI & Automation Tools", desc: "White-label AI chatbots, automation workflows, and ML tools under your brand." },
              { icon: ShieldCheck, title: "Security Audits", desc: "Offer penetration testing and security audits to your clients. Reports carry your branding." },
              { icon: Users, title: "Dedicated Teams", desc: "Staff your clients with our engineers. They work under your agency's name." },
              { icon: TrendingUp, title: "Growth Services", desc: "Resell SEO, paid ads, and CRO services. We execute, you manage the client relationship." },
            ].map((card, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="group h-full p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-teal-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="h-14 w-14 rounded-2xl bg-teal-500 text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-teal-500/30">
                    <card.icon size={26} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h4>
                  <p className="text-slate-600 leading-relaxed flex-1">{card.desc}</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-6 flex items-center text-teal-600 font-bold text-sm group-hover:translate-x-1 transition-transform"
                  >
                    Get started <ArrowRight size={15} className="ml-1" />
                  </button>
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
              <h2 className="text-teal-600 font-bold tracking-wide uppercase text-sm mb-3">The Process</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-4">How White Labeling Works</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">Simple, fast, and completely invisible to your clients.</p>
            </div>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                icon: FileCheck,
                num: "01",
                title: "Apply & Sign NDA",
                desc: "Fill out a short application. We sign a mutual NDA within 24 hours — your clients and projects are fully protected from day one.",
                color: "bg-teal-500",
              },
              {
                icon: Handshake,
                num: "02",
                title: "Onboard in 48 Hours",
                desc: "Get access to our partner portal, wholesale pricing, and a dedicated account manager. Your first project can start within 48 hours.",
                color: "bg-cyan-500",
              },
              {
                icon: Rocket,
                num: "03",
                title: "Deliver Under Your Brand",
                desc: "We build. You deliver. All code, reports, and communications carry your branding only. Your clients never know we exist.",
                color: "bg-teal-600",
              },
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className={`h-14 w-14 rounded-2xl ${step.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon size={26} />
                  </div>
                  <div className="text-4xl font-black text-teal-100 group-hover:text-teal-200 transition-colors mb-3">{step.num}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The White Label Promise */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <GridPattern />
        <Reveal>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-teal-300 rounded-full opacity-20 blur-3xl"></div>
              <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                  <h2 className="text-4xl font-extrabold mb-8">The White Label Promise</h2>
                  <ul className="space-y-5">
                    {[
                      "Strict NDA — we never contact your clients directly",
                      "All deliverables carry your branding only",
                      "Dedicated white-label account manager",
                      "Competitive wholesale pricing",
                      "Priority delivery for white-label projects",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group">
                        <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-teal-600 transition-colors">
                          <CheckCircle size={16} />
                        </div>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  {/* Testimonial 1 */}
                  <div className="bg-white/10 border border-white/20 p-6 rounded-2xl">
                    <div className="flex gap-1 text-amber-300 mb-3">{[1,2,3,4,5].map(i => <span key={i}>★</span>)}</div>
                    <p className="font-medium leading-relaxed mb-3">"We've been white-labeling TechCore for 18 months. Our clients think we have a 30-person dev team. The quality is flawless."</p>
                    <div className="text-teal-200 text-sm">— Agency Director, 50-person firm · London, UK</div>
                  </div>
                  {/* Testimonial 2 */}
                  <div className="bg-white/10 border border-white/20 p-6 rounded-2xl">
                    <div className="flex gap-1 text-amber-300 mb-3">{[1,2,3,4,5].map(i => <span key={i}>★</span>)}</div>
                    <p className="font-medium leading-relaxed mb-3">"Added $200K in annual revenue to our agency without hiring a single developer. TechCore delivers so well our clients keep coming back."</p>
                    <div className="text-teal-200 text-sm">— Founder, Digital Marketing Agency · Dubai, UAE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-black text-white mb-4">Ready to Scale Under Your Brand?</h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    Apply for white-label access today. We'll review your application and have you onboarded within 48 hours — no long contracts, no upfront fees.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => setShowModal(true)} className="px-8 py-4 rounded-2xl bg-teal-500 text-white font-bold text-lg shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                      Apply for White Label <ArrowRight size={20} />
                    </button>
                    <button onClick={() => navigate('/company/partnership')} className="px-8 py-4 rounded-2xl bg-white/10 text-white font-bold text-lg border border-white/20 hover:bg-white/20 transition-all">
                      View Partnership Models
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "48hrs", label: "Time to first project" },
                    { value: "NDA", label: "Signed on day one" },
                    { value: "0%", label: "Revenue share taken" },
                    { value: "24/7", label: "Partner support" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                      <div className="text-2xl font-black text-teal-400 mb-1">{s.value}</div>
                      <div className="text-slate-400 text-sm">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
