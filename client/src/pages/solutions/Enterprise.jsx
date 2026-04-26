import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Globe, Users, Zap, Database, Layers, CheckCircle, TrendingUp } from 'lucide-react';
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

export default function Enterprise() {
  const [showModal, setShowModal] = useState(false);
  return (
    
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO title="Enterprise Solution" description="End-to-end technology solutions for large organizations. Digital transformation, custom ERP, SOC2 compliance, 99.99% uptime SLA." path="/solutions/enterprise" />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="Enterprise Solution" title="Talk to Enterprise Team" />}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] bg-slate-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-slate-200 backdrop-blur-sm shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-slate-700 mr-3 animate-pulse"></span>
                <span className="text-sm font-semibold text-slate-700 tracking-wide uppercase">Enterprise Solution</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8">
                Built for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-blue-700">Enterprise Scale</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                End-to-end technology solutions for large organizations — from digital transformation to custom enterprise platforms, built with security, compliance, and scale at the core.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => setShowModal(true)} className="group px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center">
                  Talk to Enterprise Team <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 hover:-translate-y-1 transition-all shadow-sm">
                  Download Brochure
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
              { value: "500+", label: "Enterprise Users", sub: "Supported Per Deployment" },
              { value: "SOC2", label: "Compliant", sub: "Security Standard" },
              { value: "99.99%", label: "Uptime SLA", sub: "Guaranteed" },
              { value: "24/7", label: "Dedicated Support", sub: "Enterprise SLA" },
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
        <Reveal><div className="text-center mb-20"><h2 className="text-4xl font-extrabold text-slate-900 mb-4">Enterprise Capabilities</h2><p className="text-slate-600 max-w-2xl mx-auto">Everything a large organization needs to modernize, scale, and compete.</p></div></Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Layers, title: "Digital Transformation", desc: "Modernize legacy systems, migrate to cloud, and rebuild processes for the digital era." },
            { icon: ShieldCheck, title: "Enterprise Security", desc: "SOC2, ISO 27001, GDPR compliance built into every layer of your architecture." },
            { icon: Database, title: "Data & Analytics Platform", desc: "Centralized data warehouses, BI dashboards, and real-time analytics for decision-makers." },
            { icon: Users, title: "Custom ERP & CRM", desc: "Tailored enterprise resource planning and CRM systems that fit your exact workflows." },
            { icon: Globe, title: "Multi-Region Deployment", desc: "Global infrastructure with data residency compliance across US, EU, and APAC." },
            { icon: Zap, title: "API & Integration Layer", desc: "Connect your entire tech stack with a unified API gateway and integration platform." },
          ].map((card, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <div className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <card.icon size={26} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h4>
                <p className="text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Enterprise */}
      <section className="py-24 bg-white">
        <Reveal>
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
              <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                  <h2 className="text-4xl font-extrabold mb-8">Why Enterprises Choose TechCore</h2>
                  <ul className="space-y-5">
                    {["Dedicated enterprise account team", "Custom SLAs and support tiers", "On-premise and private cloud options", "Full compliance documentation provided", "Executive-level project governance"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <div className="h-7 w-7 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0"><CheckCircle size={16} className="text-blue-400" /></div>
                        <span className="font-medium text-slate-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                  <TrendingUp size={40} className="text-blue-400 mb-6" />
                  <p className="text-2xl font-bold text-white mb-4">"TechCore delivered our enterprise platform on time, under budget, and passed our security audit on the first attempt."</p>
                  <div className="text-slate-400 text-sm">— CTO, Fortune 500 Retail Company</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl font-black text-slate-900 mb-6">Ready to Transform Your Enterprise?</h2>
            <p className="text-xl text-slate-600 mb-10">Schedule a call with our enterprise team and get a custom proposal within 48 hours.</p>
            <button onClick={() => setShowModal(true)} className="px-10 py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3 mx-auto">
              Contact Enterprise Team <ArrowRight size={22} />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
