import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Code, Zap, ShieldCheck, Globe, CheckCircle, MessageSquare, Eye, Layers, Calendar, GitBranch, Phone } from 'lucide-react';
import LeadModal from '../../components/LeadModal';
import SEO from '../../components/SEO';
import { useNavigate } from 'react-router-dom';

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

const phases = [
  {
    num: "01", title: "Discovery & Scoping", duration: "Days 1–5",
    color: "from-blue-500 to-cyan-500", bg: "bg-blue-50 border-blue-100", accent: "text-blue-600", icon: Eye,
    activities: [
      "A real conversation — I ask questions, you share your vision",
      "I assess what's technically feasible and flag any risks upfront",
      "We agree on scope, timeline, and price before anything starts",
      "If I think something will be a problem, I'll say so now — not later",
    ],
    deliverables: ["Scope Document", "Timeline Estimate", "Fixed Price Quote"],
  },
  {
    num: "02", title: "Design & Prototyping", duration: "Week 1–2",
    color: "from-purple-500 to-pink-500", bg: "bg-purple-50 border-purple-100", accent: "text-purple-600", icon: Layers,
    activities: [
      "Wireframes and UI design based on your brand and goals",
      "You review and give feedback before a single line of code is written",
      "I'll suggest what works and what doesn't — honest design feedback",
      "We don't move to development until you're happy with the direction",
    ],
    deliverables: ["Figma Designs", "Clickable Prototype", "Your Approval"],
  },
  {
    num: "03", title: "Development", duration: "Varies by project",
    color: "from-green-500 to-emerald-500", bg: "bg-green-50 border-green-100", accent: "text-green-600", icon: Code,
    activities: [
      "I build in focused chunks — you see real progress every week",
      "Staging environment updated regularly so you can review live",
      "You can message me directly if something looks off",
      "No black-box development — you're never left wondering",
    ],
    deliverables: ["Working Builds on Staging", "Weekly Progress Updates", "Open Code Repository"],
  },
  {
    num: "04", title: "QA & Testing", duration: "Ongoing + Pre-Launch",
    color: "from-amber-500 to-orange-500", bg: "bg-amber-50 border-amber-100", accent: "text-amber-600", icon: ShieldCheck,
    activities: [
      "Functional testing across browsers and devices",
      "Performance checks — load times, responsiveness",
      "Security basics: input validation, auth, exposed endpoints",
      "You do a final walkthrough and sign off before we go live",
    ],
    deliverables: ["Bug Fix Log", "Cross-Device Test Results", "Your Sign-Off"],
  },
  {
    num: "05", title: "Launch & Handover", duration: "Final 2–3 days",
    color: "from-indigo-500 to-violet-500", bg: "bg-indigo-50 border-indigo-100", accent: "text-indigo-600", icon: Globe,
    activities: [
      "Production deployment — I handle the technical side",
      "DNS, SSL, and hosting configured properly",
      "I walk you through the codebase and how to manage it",
      "Full source code transferred to your repository",
    ],
    deliverables: ["Live Product", "Technical Docs", "Full Source Code & IP"],
  },
  {
    num: "06", title: "Post-Launch Support", duration: "30 days included",
    color: "from-rose-500 to-red-500", bg: "bg-rose-50 border-rose-100", accent: "text-rose-600", icon: Zap,
    activities: [
      "30 days of bug fixes included — no extra charge",
      "If something breaks because of my code, I fix it",
      "Available for questions as you get familiar with the product",
      "Ongoing maintenance and feature work available after that",
    ],
    deliverables: ["Bug Fixes (30 days)", "Direct Support Access", "Maintenance Options"],
  },
];

const tools = [
  { category: "Communication", items: ["WhatsApp / Telegram", "Zoom", "Email", "Loom"] },
  { category: "Project Tracking", items: ["Notion", "Linear", "GitHub Issues"] },
  { category: "Design", items: ["Figma", "FigJam"] },
  { category: "Development", items: ["GitHub", "VS Code", "Postman"] },
  { category: "CI/CD & Infra", items: ["GitHub Actions", "Docker", "AWS", "Vercel"] },
  { category: "Monitoring", items: ["Sentry", "Uptime Robot", "Grafana"] },
];

export default function HowWeWork() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO title="How We Work" description="A transparent, founder-led process. 6 phases from discovery to launch. Weekly updates, honest timelines, and direct access to the person building your product." path="/company/how-we-work" />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="General Inquiry" title="Start a Project" />}

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
                <span className="text-sm font-semibold text-indigo-700 tracking-wide uppercase">How We Work</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                Simple Process. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">No Surprises.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-6 leading-relaxed max-w-xl">
                TechCore is founder-led — meaning you work directly with Vishal on every project. Here's exactly how that works, from first conversation to launch.
              </p>
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 mb-10 flex items-start gap-3">
                <span className="text-xl">👋</span>
                <p className="text-indigo-800 text-sm leading-relaxed">
                  <strong>No account managers, no handoffs.</strong> TechCore is a three-person founding team — Vishal (web & cloud), Ayush (AI & automation), and Akshat (app & software). When you work with us, you talk directly to the engineers building your product.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => setShowModal(true)} className="group px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  Start a Project <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button onClick={() => navigate('/resources/appointment')} className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  Book a Call
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
                { value: "Direct", label: "Founder Access", sub: "You talk to Vishal" },
                { value: "Weekly", label: "Progress Updates", sub: "No black boxes" },
                { value: "Full", label: "Source Code", sub: "Yours from day one" },
                { value: "Honest", label: "Timelines", sub: "No padding, no fluff" },
              ].map((s, i) => (
                <div key={i} className="text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">{s.value}</div>
                  <div className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-1">{s.label}</div>
                  <div className="text-xs text-slate-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Process Phases */}
      <section className="py-24 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">The Process</h2>
              <h3 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6">Six Phases, Start to Launch</h3>
              <p className="text-lg text-slate-600">Every project follows this framework. Timelines vary by scope, but the approach stays the same — transparent, collaborative, and focused on getting it right.</p>
            </div>
          </Reveal>
          <div className="space-y-8">
            {phases.map((phase, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className={`group p-8 rounded-3xl border ${phase.bg} hover:bg-white hover:shadow-2xl transition-all duration-300`}>
                  <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="flex items-start gap-5">
                      <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${phase.color} text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <phase.icon size={26} />
                      </div>
                      <div>
                        <div className={`text-xs font-bold uppercase tracking-wide ${phase.accent} mb-1`}>Phase {phase.num}</div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{phase.title}</h3>
                        <div className="text-sm text-slate-500 font-medium">{phase.duration}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">What happens</div>
                      <ul className="space-y-2">
                        {phase.activities.map((a, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${phase.color} mt-1.5 shrink-0`}></span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">You receive</div>
                      <ul className="space-y-2">
                        {phase.deliverables.map((d, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                            <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center shrink-0`}>
                              <span className="text-white text-xs">✓</span>
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Communication */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">How We Stay in Touch</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">This isn't a big agency with formal sprint ceremonies. It's a direct working relationship — communication is simple and consistent.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { freq: "Anytime", type: "Direct Message", desc: "You can message me directly on WhatsApp, Telegram, or email. I respond within a few hours during working days.", icon: MessageSquare, color: "bg-indigo-500" },
              { freq: "Weekly", type: "Progress Update", desc: "Every week I send a written update — what was built, what's next, and anything you need to review or decide.", icon: Calendar, color: "bg-purple-500" },
              { freq: "As needed", type: "Video Call", desc: "We jump on a call when something needs a real conversation — design reviews, scope changes, or just a check-in.", icon: Phone, color: "bg-blue-500" },
              { freq: "Always", type: "Staging Access", desc: "You have access to the staging environment throughout development. See the real product as it's being built.", icon: Eye, color: "bg-violet-500" },
            ].map((c, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
                  <div className={`h-12 w-12 rounded-2xl ${c.color} text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <c.icon size={22} />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">{c.freq}</div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3">{c.type}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-12 p-6 rounded-2xl bg-amber-50 border border-amber-100 max-w-3xl mx-auto flex items-start gap-4">
              <span className="text-2xl">💬</span>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">One thing I want to be upfront about</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  I'm a solo founder, not a 50-person agency. I don't have daily standups or bi-weekly sprint reviews. What I do have is genuine availability, fast responses, and a real commitment to keeping you informed. If something changes — timeline, scope, anything — you'll hear from me immediately, not at the next scheduled meeting.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Honest commitments */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">Honest Commitments</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-4">What You Can Expect</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">Not a guarantee section with fine print. Just what I actually commit to on every project.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Phone, title: "Direct access to the founder", desc: "You have my contact. Every question, concern, or idea goes straight to the person building your product — not a project manager relaying messages." },
              { icon: Calendar, title: "Weekly updates, no matter what", desc: "Every week you get a written update. Even if it's a slow week, you'll know why and what's coming next. No radio silence." },
              { icon: GitBranch, title: "Honest timelines from the start", desc: "I won't tell you 4 weeks if I think it'll take 8. I'd rather set a realistic expectation and beat it than overpromise and scramble." },
              { icon: MessageSquare, title: "Immediate heads-up if anything changes", desc: "If scope creeps, a dependency breaks, or something takes longer than expected — you hear about it the same day, not at the next check-in." },
              { icon: ShieldCheck, title: "30 days of post-launch bug fixes", desc: "If something breaks because of my code in the first 30 days after launch, I fix it. No debate, no extra invoice." },
              { icon: Globe, title: "Full source code and IP ownership", desc: "Everything built for you belongs to you. Code, assets, documentation — transferred to your repository at handover." },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="group flex items-start gap-5 p-7 rounded-3xl bg-white border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold mb-4">Tools We Use</h2>
              <p className="text-slate-400 max-w-2xl">Standard, well-supported tools — nothing exotic that creates lock-in or makes handover complicated.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((t, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:bg-slate-900 hover:border-indigo-900/50 transition-all duration-300">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-4">{t.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {t.items.map((item, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium border border-slate-700 hover:text-white hover:border-slate-500 transition-colors cursor-default">{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Ready to Get Started?</h2>
            <p className="text-xl text-slate-600 mb-4 max-w-2xl mx-auto">Book a free call and we'll talk through your project — what it involves, how long it'll take, and what it'll cost. No pitch, just an honest conversation.</p>
            <p className="text-slate-400 text-sm mb-12">TechCore is just getting started. Every project matters to us.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-xl shadow-indigo-600/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Start a Project <ArrowRight size={24} className="ml-3" />
              </button>
              <button onClick={() => navigate('/resources/appointment')} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                Book a Discovery Call
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
