import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Cloud, Server, Zap, ShieldCheck, Database, Cpu, CheckCircle } from 'lucide-react';
import LeadModal from '../../components/LeadModal';
import { useNavigate } from 'react-router-dom';
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

const ExpandableCard = ({ card, onCTA }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`h-full p-8 rounded-3xl bg-white border shadow-lg transition-all duration-300 relative overflow-hidden
      ${expanded ? 'border-sky-300 shadow-2xl shadow-sky-500/15 -translate-y-1' : 'border-slate-100 shadow-slate-200/50 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-2'}`}>
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-50 to-transparent rounded-bl-full transition-opacity duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`h-14 w-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-sky-500/30 transition-all duration-300 ${expanded ? 'scale-110 rotate-3' : ''}`}>
        <card.icon size={28} />
      </div>
      <h4 className="text-2xl font-bold text-slate-900 mb-3">{card.title}</h4>
      <p className="text-slate-600 leading-relaxed mb-6">{card.desc}</p>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-64 opacity-100 mb-5' : 'max-h-0 opacity-0 mb-0'}`}>
        <ul className="space-y-2 border-t border-slate-100 pt-5">
          {card.details.map((d, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-700 text-sm">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
              {d}
            </li>
          ))}
        </ul>
        <button onClick={onCTA} className="mt-5 w-full py-3 rounded-xl bg-sky-500 text-white font-bold text-sm hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/20">
          Get a Free Quote
        </button>
      </div>
      <button onClick={() => setExpanded(e => !e)} className="flex items-center text-sky-600 font-bold text-sm group/btn">
        {expanded ? 'Show less' : 'Learn more'}
        <ArrowRight size={16} className={`ml-1 transition-transform duration-300 ${expanded ? 'rotate-90' : 'group-hover/btn:translate-x-1'}`} />
      </button>
    </div>
  );
};

export default function CloudDevOps() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [caseStudies, setCaseStudies] = useState([]);
  const [studiesLoading, setStudiesLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/case-studies?category=Cloud %26 DevOps`)
      .then(r => r.json())
      .then(data => { setCaseStudies(Array.isArray(data) ? data : []); setStudiesLoading(false); })
      .catch(() => setStudiesLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO title="Cloud & DevOps" description="CI/CD pipelines, Kubernetes, cloud migration, and infrastructure automation. 99.99% uptime SLA. Get a free infrastructure audit." path="/services/cloud-devops" />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="Cloud & DevOps" />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] bg-sky-400/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl opacity-50" />
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-sky-100 backdrop-blur-sm shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-sky-500 mr-3 animate-pulse"></span>
                <span className="text-sm font-semibold text-sky-700 tracking-wide uppercase">Cloud & DevOps</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                Infrastructure That <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">Never Sleeps</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                Cloud architecture, CI/CD pipelines, and DevOps automation that keep your systems fast, reliable, and infinitely scalable.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => setShowModal(true)} className="group px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  Audit My Infrastructure <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button onClick={() => navigate('/work')} className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:border-sky-200 hover:bg-sky-50/50 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  View Our Work
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
                { value: "Direct", label: "Founder Access", sub: "You talk to Vishal" },
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
              <h2 className="text-sky-600 font-bold tracking-wide uppercase text-sm mb-3">What We Do</h2>
              <h3 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6">Cloud & DevOps Services</h3>
              <p className="text-lg text-slate-600">From cloud migration to full DevOps transformation — we handle the infrastructure so you can focus on the product.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Cloud, title: "Cloud Migration",
                desc: "Seamlessly migrate on-premise systems to AWS, GCP, or Azure with zero data loss.",
                details: ["Lift-and-shift or re-architecture", "Zero data loss migration", "Multi-cloud & hybrid setups", "Cost analysis before migration"],
              },
              {
                icon: Zap, title: "CI/CD Pipelines",
                desc: "Automated build, test, and deploy pipelines that ship code faster and safer.",
                details: ["GitHub Actions & GitLab CI", "Automated testing gates", "Blue/green & canary deploys", "Rollback in under 60 seconds"],
              },
              {
                icon: Server, title: "Container Orchestration",
                desc: "Docker and Kubernetes setups for scalable, portable microservice architectures.",
                details: ["Kubernetes cluster setup & management", "Helm chart configuration", "Auto-scaling policies", "Service mesh with Istio"],
              },
              {
                icon: Cpu, title: "Infrastructure as Code",
                desc: "Terraform and Ansible-based IaC for reproducible, version-controlled infrastructure.",
                details: ["Terraform modules for AWS/GCP/Azure", "Ansible playbooks for config", "GitOps workflow with ArgoCD", "Drift detection & remediation"],
              },
              {
                icon: Database, title: "Database Management",
                desc: "Managed database setups, backups, replication, and performance tuning.",
                details: ["Automated backups & point-in-time recovery", "Read replicas & failover", "Query performance tuning", "Database migration support"],
              },
              {
                icon: ShieldCheck, title: "Monitoring & Alerting",
                desc: "Full observability with Grafana, Prometheus, and PagerDuty integrations.",
                details: ["Metrics, logs & traces (full stack)", "Custom Grafana dashboards", "PagerDuty on-call routing", "SLA reporting & uptime tracking"],
              },
            ].map((card, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <ExpandableCard card={card} onCTA={() => setShowModal(true)} />
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
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Our DevOps Approach</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">A systematic process to modernize your infrastructure without disrupting your business.</p>
            </div>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-4">
            {[
              { num: "01", title: "Infrastructure Audit", desc: "Assess your current setup, identify bottlenecks, security gaps, and cost inefficiencies." },
              { num: "02", title: "Architecture Design", desc: "Design a cloud-native architecture tailored to your scale and budget." },
              { num: "03", title: "Migration & Setup", desc: "Execute migration with zero downtime, set up CI/CD, monitoring, and alerting." },
              { num: "04", title: "Optimize & Maintain", desc: "Continuous cost optimization, security patching, and performance tuning." },
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="text-5xl font-black text-sky-100 group-hover:text-sky-200 transition-colors mb-4">{step.num}</div>
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
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold mb-4">Tools We Master</h2>
              <p className="text-slate-400 max-w-2xl">Best-in-class DevOps toolchain for every layer of your infrastructure.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Cloud, title: "Cloud Platforms", tags: ["AWS", "Google Cloud", "Azure", "DigitalOcean", "Vercel"] },
              { icon: Server, title: "Containers & Orchestration", tags: ["Docker", "Kubernetes", "Helm", "Istio", "ECS"] },
              { icon: Zap, title: "CI/CD & Automation", tags: ["GitHub Actions", "GitLab CI", "Jenkins", "ArgoCD", "Terraform"] },
              { icon: ShieldCheck, title: "Monitoring & Security", tags: ["Grafana", "Prometheus", "Datadog", "Vault", "Trivy"] },
            ].map((stack, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:bg-slate-900 hover:border-sky-900/50 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
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

      {/* Case Studies */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Proven Results</h2>
                <p className="text-slate-600">Real infrastructure wins, measurable savings.</p>
              </div>
              <button onClick={() => navigate('/work')} className="text-sky-600 font-bold hover:translate-x-1 transition-transform inline-flex items-center">
                View All Projects <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </Reveal>

          {studiesLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1,2,3].map(i => <div key={i} className="h-[400px] rounded-3xl bg-slate-200 animate-pulse" />)}
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">Case studies coming soon.</p>
              <button onClick={() => navigate('/work')} className="mt-4 text-sky-600 font-semibold hover:underline">View all our work →</button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {caseStudies.slice(0, 3).map((study, idx) => (
                <Reveal key={study.id} delay={idx * 150}>
                  <div className="group relative h-[400px] rounded-3xl overflow-hidden shadow-xl cursor-pointer">
                    <div className={`absolute inset-0 bg-gradient-to-br ${study.gradientColor} opacity-90 group-hover:scale-105 transition-transform duration-700`}></div>
                    {study.coverImage && (
                      <img src={study.coverImage} alt={study.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                      <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{study.serviceCategory}</span>
                      </div>
                      <div>
                        {study.clientName && <div className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-1">{study.clientName}</div>}
                        <h3 className="text-3xl font-bold mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{study.title}</h3>
                        <div className="text-white/80 font-medium mb-6 translate-y-2 group-hover:translate-y-0 text-sm overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {study.solution}
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 font-bold">
                          ↑ {study.result}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-white relative overflow-hidden">
        <Reveal>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-sky-900/30">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-sky-400 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 bg-indigo-600 rounded-full opacity-40 blur-3xl"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Infrastructure You Can Trust</h2>
                  <ul className="space-y-6">
                    {["99.99% uptime SLA with financial guarantee", "24/7 on-call incident response", "Cost optimization — avg. 40% cloud bill reduction", "SOC2 & ISO 27001 compliant setups"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group">
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-sky-600 transition-colors">
                          <CheckCircle size={18} />
                        </div>
                        <span className="font-semibold text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                  <div className="flex gap-1 text-amber-300 mb-6">{[1,2,3,4,5].map(i => <span key={i}>★</span>)}</div>
                  <p className="text-xl font-medium leading-relaxed mb-8">"TechCore cut our AWS bill by 55% and our deployment time from 2 hours to 4 minutes. The ROI was immediate."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">RK</div>
                    <div>
                      <div className="font-bold">— Replace with a real client name once available</div>
                      <div className="text-sky-200 text-sm">Cloud & DevOps Client</div>
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
            <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tight">Ready to Scale Without Limits?</h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">Get a free infrastructure audit and discover how much you can save and scale.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-sky-500 text-white font-bold text-lg shadow-xl shadow-sky-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Get Free Audit <ArrowRight size={24} className="ml-3" />
              </button>
              <button onClick={() => navigate('/resources/appointment')} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                Book a Call
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
