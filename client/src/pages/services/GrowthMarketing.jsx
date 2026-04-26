import { useEffect, useRef, useState } from 'react';
import { ArrowRight, TrendingUp, Globe, Zap, Users, Database, Layers, CheckCircle, Eye } from 'lucide-react';
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

export default function GrowthMarketing() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO title="Growth & Marketing" description="SEO, performance marketing, CRO, and product-led growth. Average 3.5x ROAS and +180% organic traffic in 6 months." path="/services/growth-marketing" />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="Growth & Marketing" />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] bg-green-400/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-3xl opacity-50" />
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-green-100 backdrop-blur-sm shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 mr-3 animate-pulse"></span>
                <span className="text-sm font-semibold text-green-700 tracking-wide uppercase">Growth & Marketing</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                Grow Faster, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Smarter, Leaner</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                Data-driven growth strategies, performance marketing, and SEO that compound over time and deliver measurable ROI.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => setShowModal(true)} className="group px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  Get Growth Audit <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:border-green-200 hover:bg-green-50/50 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  View Case Studies
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
              <h2 className="text-green-600 font-bold tracking-wide uppercase text-sm mb-3">Our Services</h2>
              <h3 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6">Full-Funnel Growth</h3>
              <p className="text-lg text-slate-600">We don't just run ads — we build growth systems that compound and scale.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "SEO & Content", desc: "Technical SEO, content strategy, and link building that drives compounding organic growth." },
              { icon: TrendingUp, title: "Performance Marketing", desc: "Google Ads, Meta Ads, and LinkedIn campaigns optimized for CAC and ROAS." },
              { icon: Eye, title: "Conversion Rate Optimization", desc: "A/B testing, landing page optimization, and funnel analysis to maximize conversions." },
              { icon: Users, title: "Product-Led Growth", desc: "Viral loops, referral programs, and in-product growth mechanics for SaaS products." },
              { icon: Database, title: "Marketing Analytics", desc: "Full attribution modeling, dashboards, and data pipelines for marketing intelligence." },
              { icon: Zap, title: "Marketing Automation", desc: "Email sequences, CRM workflows, and lifecycle marketing that nurtures leads at scale." },
            ].map((card, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="group h-full p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-14 w-14 rounded-2xl bg-green-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <card.icon size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">{card.title}</h4>
                  <p className="text-slate-600 leading-relaxed mb-6">{card.desc}</p>
                  <div className="flex items-center text-green-600 font-bold text-sm group-hover:translate-x-2 transition-transform cursor-pointer">
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
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">The Growth Framework</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">A systematic, data-driven approach to sustainable growth.</p>
            </div>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-4">
            {[
              { num: "01", title: "Growth Audit", desc: "Analyze your current funnel, traffic sources, and conversion rates to find quick wins." },
              { num: "02", title: "Strategy Design", desc: "Build a 90-day growth roadmap with prioritized experiments and KPIs." },
              { num: "03", title: "Execute & Test", desc: "Launch campaigns, run A/B tests, and iterate rapidly based on data." },
              { num: "04", title: "Scale & Optimize", desc: "Double down on what works, cut what doesn't, and compound growth month over month." },
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="text-5xl font-black text-green-100 group-hover:text-green-200 transition-colors mb-4">{step.num}</div>
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
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold mb-4">Growth Tech Stack</h2>
              <p className="text-slate-400 max-w-2xl">The tools we use to track, optimize, and scale your growth.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: TrendingUp, title: "Paid Advertising", tags: ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads", "Programmatic"] },
              { icon: Globe, title: "SEO & Content", tags: ["Ahrefs", "SEMrush", "Screaming Frog", "Surfer SEO", "Clearscope"] },
              { icon: Database, title: "Analytics & Attribution", tags: ["GA4", "Mixpanel", "Amplitude", "Triple Whale", "Segment"] },
              { icon: Zap, title: "Automation & CRM", tags: ["HubSpot", "Klaviyo", "ActiveCampaign", "Intercom", "Customer.io"] },
            ].map((stack, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:bg-slate-900 hover:border-green-900/50 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/20">
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
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-green-900/30">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-green-400 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 bg-emerald-600 rounded-full opacity-40 blur-3xl"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Growth That's Measurable, Not Guesswork</h2>
                  <ul className="space-y-6">
                    {["Full attribution from first touch to revenue", "Weekly performance reports with insights", "No long-term contracts — results speak", "Dedicated growth strategist assigned"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group">
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-green-600 transition-colors">
                          <CheckCircle size={18} />
                        </div>
                        <span className="font-semibold text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                  <div className="flex gap-1 text-amber-300 mb-6">{[1,2,3,4,5].map(i => <span key={i}>★</span>)}</div>
                  <p className="text-xl font-medium leading-relaxed mb-8">"TechCore's growth team took us from 5K to 50K monthly visitors in 4 months. Our pipeline has never been fuller."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">MN</div>
                    <div>
                      <div className="font-bold">— Replace with a real client name once available</div>
                      <div className="text-green-200 text-sm">Growth & Marketing Client</div>
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
            <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tight">Ready to Unlock Growth?</h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">Get a free growth audit and a 90-day roadmap tailored to your business.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-green-500 text-white font-bold text-lg shadow-xl shadow-green-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Get Free Growth Audit <ArrowRight size={24} className="ml-3" />
              </button>
              <button onClick={() => navigate('/contact')} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                View Case Studies
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
