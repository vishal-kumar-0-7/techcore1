import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Lock, Eye, Zap, Server, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
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

export default function SecurityManagedIT() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO title="Security & Managed IT" description="Penetration testing, SOC as a service, compliance management, and 24/7 managed IT. Zero breaches under our watch." path="/services/security-managed-it" />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="Security & Managed IT" />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] bg-red-400/15 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-orange-400/15 rounded-full blur-3xl opacity-50" />
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-red-100 backdrop-blur-sm shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 mr-3 animate-pulse"></span>
                <span className="text-sm font-semibold text-red-700 tracking-wide uppercase">Security & Managed IT</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                Protect What <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Matters Most</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                Enterprise-grade cybersecurity, compliance management, and 24/7 managed IT services that keep your business safe and running.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => setShowModal(true)} className="group px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  Get Security Audit <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:border-red-200 hover:bg-red-50/50 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  View Services
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

      {/* Services */}
      <section className="py-24 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-red-600 font-bold tracking-wide uppercase text-sm mb-3">Our Services</h2>
              <h3 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6">Full-Spectrum Security</h3>
              <p className="text-lg text-slate-600">From penetration testing to compliance management — we cover every angle of your security posture.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: AlertTriangle, title: "Penetration Testing", desc: "Ethical hacking to identify vulnerabilities before attackers do. Web, mobile, and network." },
              { icon: Eye, title: "SOC as a Service", desc: "24/7 Security Operations Center monitoring with real-time threat detection and response." },
              { icon: Lock, title: "Compliance Management", desc: "GDPR, SOC2, ISO 27001, HIPAA — we handle audits, documentation, and certification." },
              { icon: ShieldCheck, title: "Secure Code Review", desc: "Static and dynamic analysis of your codebase to eliminate security vulnerabilities." },
              { icon: Server, title: "Managed IT Services", desc: "End-to-end IT management including helpdesk, patching, and infrastructure maintenance." },
              { icon: Globe, title: "DDoS & WAF Protection", desc: "Web application firewalls and DDoS mitigation to keep your services always available." },
            ].map((card, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="group h-full p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-14 w-14 rounded-2xl bg-red-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-red-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <card.icon size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">{card.title}</h4>
                  <p className="text-slate-600 leading-relaxed mb-6">{card.desc}</p>
                  <div className="flex items-center text-red-600 font-bold text-sm group-hover:translate-x-2 transition-transform cursor-pointer">
                    Learn more <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Our Security Process</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">A proactive, layered approach to security that evolves with the threat landscape.</p>
            </div>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-4">
            {[
              { num: "01", title: "Risk Assessment", desc: "Identify assets, threats, and vulnerabilities across your entire attack surface." },
              { num: "02", title: "Security Design", desc: "Design a layered security architecture with defense-in-depth principles." },
              { num: "03", title: "Implementation", desc: "Deploy security controls, monitoring tools, and incident response playbooks." },
              { num: "04", title: "Continuous Monitoring", desc: "24/7 threat monitoring, regular audits, and rapid incident response." },
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="text-5xl font-black text-red-100 group-hover:text-red-200 transition-colors mb-4">{step.num}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ef4444 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold mb-4">Security Toolchain</h2>
              <p className="text-slate-400 max-w-2xl">Industry-standard tools used by top security teams worldwide.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: AlertTriangle, title: "Pen Testing & SAST", tags: ["Burp Suite", "OWASP ZAP", "Metasploit", "SonarQube", "Semgrep"] },
              { icon: Eye, title: "SIEM & Monitoring", tags: ["Splunk", "Elastic SIEM", "Wazuh", "Datadog", "PagerDuty"] },
              { icon: Lock, title: "Identity & Access", tags: ["Okta", "Auth0", "HashiCorp Vault", "AWS IAM", "Keycloak"] },
              { icon: ShieldCheck, title: "Compliance & GRC", tags: ["Vanta", "Drata", "OneTrust", "Qualys", "Nessus"] },
            ].map((stack, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:bg-slate-900 hover:border-red-900/50 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
                      <stack.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold">{stack.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {stack.tags.map((tag, i) => (
                      <span key={i} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium border border-slate-700 hover:text-white hover:border-slate-500 transition-colors cursor-default">{tag}</span>
                    ))}
                  </div>
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
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-red-900/30">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-red-400 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 bg-orange-600 rounded-full opacity-40 blur-3xl"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Security Without Compromise</h2>
                  <ul className="space-y-6">
                    {["Certified ethical hackers (CEH, OSCP)", "No breach guarantee with SLA", "Compliance-ready documentation", "Dedicated security engineer assigned"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group">
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-red-600 transition-colors">
                          <CheckCircle size={18} />
                        </div>
                        <span className="font-semibold text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                  <div className="flex gap-1 text-amber-300 mb-6">{[1,2,3,4,5].map(i => <span key={i}>★</span>)}</div>
                  <p className="text-xl font-medium leading-relaxed mb-8">"TechCore's security audit found 12 critical vulnerabilities we had no idea about. Their team fixed everything within a week."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">PL</div>
                    <div>
                      <div className="font-bold">— Replace with a real client name once available</div>
                      <div className="text-red-200 text-sm">Security & IT Client</div>
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
            <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tight">Is Your Business Secure?</h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">Get a free security assessment and find out where you're exposed before attackers do.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-red-500 text-white font-bold text-lg shadow-xl shadow-red-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Free Security Audit <ArrowRight size={24} className="ml-3" />
              </button>
              <button onClick={() => navigate('/contact')} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                Talk to an Expert
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
