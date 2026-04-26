import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Code, Heart, Zap, Globe, TrendingUp, Users, CheckCircle } from 'lucide-react';
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

const values = [
  { icon: Code, title: "Engineering First", desc: "Every decision starts with the code. Clean, maintainable, and built to last — not just to ship." },
  { icon: Heart, title: "Client Success = Our Success", desc: "We don't close tickets. We solve problems. Your growth is the only metric that matters to us." },
  { icon: Zap, title: "Move Fast, Build Right", desc: "Speed without shortcuts. We iterate quickly but never compromise on quality or security." },
  { icon: Globe, title: "Radical Transparency", desc: "You always know what's being built, why, and what it costs. No surprises, ever." },
  { icon: TrendingUp, title: "Built to Scale", desc: "We architect for tomorrow, not just today. Every system we build is ready to grow with your business." },
  { icon: Users, title: "Long-Term Thinking", desc: "We're not here for a single project. We want to be the technical partner you rely on for years." },
];

export default function AboutUs() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO
        title="About Us"
        description="TechCore is founded by Vishal Kumar, a web developer and Cloud-DevOps engineer from Bihar, India. Built to help businesses scale online with quality software."
        path="/company/about"
      />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="General Inquiry" title="Let's Work Together" />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] bg-indigo-400/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl opacity-50" />
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-indigo-100 backdrop-blur-sm shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 mr-3 animate-pulse"></span>
                <span className="text-sm font-semibold text-indigo-700 tracking-wide uppercase">About TechCore</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                Built by a Developer, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">For Real Businesses</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                TechCore is a software development agency founded with one goal — make it easier for businesses to build, launch, and scale online. No bloated teams, no inflated timelines. Just clean code and real results.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Honest positioning bar */}
      <Reveal>
        <div className="border-y border-slate-200/60 bg-white/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "Quality First", label: "No shortcuts", sub: "Ever" },
                { value: "Full IP", label: "Ownership", sub: "Transferred to you" },
                { value: "Direct", label: "Founder Access", sub: "You talk to the builder" },
                { value: "Fixed Price", label: "No surprises", sub: "Transparent billing" },
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

      {/* Story */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">The Story</h2>
                <h3 className="text-4xl font-extrabold text-slate-900 mb-6">Why I Built TechCore</h3>
                <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
                  <p>
                    I'm Vishal Kumar — a web developer and Cloud-DevOps engineer currently in my final year of engineering, based in Vaishali, Bihar.
                  </p>
                  <p>
                    I started TechCore because I kept seeing the same problem: businesses wanted to go online, scale their operations, or build a product — but the development process was either too expensive, too slow, or too unreliable.
                  </p>
                  <p>
                    I built TechCore to fix that. A lean, focused agency where you work directly with the person building your product. No middlemen, no account managers passing messages. Just a developer who cares about your outcome as much as you do.
                  </p>
                  <p>
                    We're early. We're honest about that. But what we lack in years, we make up for in focus, technical depth, and a genuine commitment to doing the work right.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-4">
                {/* What makes us different */}
                <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
                  <h4 className="font-bold text-slate-900 mb-3 text-lg">What makes TechCore different</h4>
                  <ul className="space-y-3">
                    {[
                      "You work directly with the founder — not a project manager",
                      "Every project is treated like it's our own product",
                      "We say no to projects we can't do well",
                      "Honest timelines, honest pricing, honest communication",
                      "We're building a reputation, not just a revenue number",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                        <CheckCircle size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Early stage badge */}
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">We're just getting started</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        TechCore is new. We don't have 100 clients or 10 years of history. What we do have is strong technical skills, a clear mission, and the hunger to prove ourselves on every single project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">What We Stand For</h2>
              <h3 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6">Our Core Values</h3>
              <p className="text-lg text-slate-600">These aren't words on a wall. They're the principles that guide every decision we make.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="group h-full p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-14 w-14 rounded-2xl bg-indigo-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <v.icon size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Team */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">The Team</h2>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-4">The Founding Team</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">Three engineers from the same class, each focused on what they do best. You work directly with the people building your product.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vishal */}
            <Reveal delay={0}>
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mb-6 group-hover:scale-105 transition-transform duration-300">
                  VK
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">Vishal Kumar</h4>
                <div className="text-indigo-600 font-semibold text-sm mb-1">Founder · Web Developer & Cloud-DevOps</div>
                <div className="text-slate-400 text-xs mb-4">Vaishali, Bihar · Final Year Engineering</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  Builds full-stack web applications and manages cloud infrastructure. Founded TechCore to make quality software development accessible to businesses of all sizes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "AWS", "Docker", "MongoDB"].map(s => (
                    <span key={s} className="px-2.5 py-1 bg-white border border-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Ayush */}
            <Reveal delay={100}>
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl mb-6 group-hover:scale-105 transition-transform duration-300">
                  AT
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">Ayush Thakur</h4>
                <div className="text-cyan-600 font-semibold text-sm mb-1">Co-Founder · AI & Automation Engineer</div>
                <div className="text-slate-400 text-xs mb-4">Final Year Engineering</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  Specialises in AI integrations, LLM-powered products, and intelligent workflow automation. Turns complex AI capabilities into practical tools businesses can actually use.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Python", "LangChain", "OpenAI", "FastAPI", "n8n"].map(s => (
                    <span key={s} className="px-2.5 py-1 bg-white border border-cyan-100 text-cyan-700 text-xs font-semibold rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Akshat */}
            <Reveal delay={200}>
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-100 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-300">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl mb-6 group-hover:scale-105 transition-transform duration-300">
                  AM
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">Akshat Mishra</h4>
                <div className="text-violet-600 font-semibold text-sm mb-1">Co-Founder · App & Software Developer</div>
                <div className="text-slate-400 text-xs mb-4">Final Year Engineering</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  Builds native and cross-platform mobile apps and custom software systems. Focused on clean architecture, performance, and products that scale with the business.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React Native", "Flutter", "Java", "Swift", "PostgreSQL"].map(s => (
                    <span key={s} className="px-2.5 py-1 bg-white border border-violet-100 text-violet-700 text-xs font-semibold rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <p className="text-center text-slate-400 text-sm mt-8">
              Three engineers. Three specialisations. One shared goal — build software that actually works for your business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/30">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-indigo-400 rounded-full opacity-20 blur-3xl" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-extrabold mb-4 leading-tight">Ready to Build Something Real?</h2>
                  <p className="text-indigo-100 text-lg leading-relaxed mb-8">
                    Whether you have a clear brief or just an idea — let's talk. I'll give you an honest assessment of what's possible, how long it'll take, and what it'll cost. No fluff.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => setShowModal(true)}
                      className="px-8 py-4 rounded-2xl bg-white text-indigo-600 font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg flex items-center justify-center gap-2">
                      Start a Conversation <ArrowRight size={18} />
                    </button>
                    <button onClick={() => navigate('/work')}
                      className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-colors backdrop-blur-sm">
                      See Our Work
                    </button>
                  </div>
                </div>
                <div className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-sm">
                  <div className="text-indigo-200 text-sm font-bold uppercase tracking-wide mb-4">What you get when you work with us</div>
                  <ul className="space-y-3">
                    {[
                      "Direct access to the founder on every project",
                      "Weekly progress updates — no black boxes",
                      "Full source code and IP ownership",
                      "Honest timelines, no padding",
                      "Post-launch support included",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white text-sm">
                        <CheckCircle size={16} className="text-indigo-300 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
