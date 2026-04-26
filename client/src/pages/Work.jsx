import { useState, useEffect, useRef } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LeadModal from '../components/LeadModal';
import SEO from '../components/SEO';
import { API } from '../lib/api.js';

const categories = ['All', 'Web Development', 'App Development', 'Software Development', 'AI & Automation', 'Cloud & DevOps', 'Blockchain Development', 'Growth & Marketing'];

// No hardcoded fallback — we show an honest empty state instead of fake projects

const Reveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {children}
    </div>
  );
};

export default function Work() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/case-studies`)
      .then(r => r.json())
      .then(data => {
        setProjects(Array.isArray(data) && data.length > 0 ? data : []);
        setLoading(false);
      })
      .catch(() => { setProjects([]); setLoading(false); });
  }, []);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.serviceCategory === activeCategory);

  const featured = filtered.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="Our Work" description="TechCore is just getting started. See what we've built and what we're capable of." path="/work" />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="General Inquiry" title="Let's Build Yours" />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-28 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
              <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-400 mr-3 animate-pulse"></span>
              <span className="text-sm font-semibold text-white/80 uppercase tracking-wide">Our Work</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              What We've <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Built So Far</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-6">
              TechCore is new. This page will grow with every project we complete. We'd rather show you a few real things than a wall of fake case studies.
            </p>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm inline-flex items-start gap-3">
              <span className="text-lg">🚀</span>
              <p className="text-white/80 text-sm leading-relaxed">
                <strong className="text-white">We're actively taking on first clients.</strong> If you want to be one of the first projects on this page — let's talk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Honest positioning bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: 'Quality', label: 'Over Quantity', sub: 'We take on what we can do well' },
            { value: 'Direct', label: 'Founder Access', sub: 'You work with the builders' },
            { value: 'Full IP', label: 'Ownership', sub: 'Everything is yours' },
            { value: 'Honest', label: 'Communication', sub: 'No surprises, ever' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{s.value}</div>
              <div className="text-sm font-bold text-slate-800">{s.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-56 bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-slate-200 rounded w-1/3" />
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 max-w-xl mx-auto">
            {activeCategory === 'All' ? (
              <>
                <div className="text-6xl mb-6">�</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">We're just getting started</h3>
                <p className="text-slate-500 leading-relaxed mb-8">
                  TechCore is new and this page will fill up as we complete projects. We'd rather be honest about that than show you fake case studies. If you want to be one of the first projects here — let's talk.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setShowModal(true)} className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg flex items-center justify-center gap-2">
                    Start a Project <ArrowRight size={18} />
                  </button>
                  <button onClick={() => navigate('/resources/appointment')} className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors">
                    Book a Free Call
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No {activeCategory} projects yet</h3>
                <p className="text-slate-500 mb-6">We're actively taking on projects in this area. Want to be the first?</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={() => setShowModal(true)} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                    Start a {activeCategory} Project
                  </button>
                  <button onClick={() => setActiveCategory('All')} className="px-6 py-3 bg-white text-slate-600 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                    View All
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Featured — large cards */}
            {featured.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Featured Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featured.map((p, idx) => (
                    <Reveal key={p.id} delay={idx * 80}>
                      <ProjectCard project={p} featured />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <div>
                {featured.length > 0 && <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">More Projects</h2>}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((p, idx) => (
                    <Reveal key={p.id} delay={idx * 80}>
                      <ProjectCard project={p} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA */}
      <section className="py-24 bg-white">
        <Reveal>
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-indigo-400 rounded-full opacity-20 blur-3xl" />
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-extrabold mb-4">Want to Be on This Page?</h2>
                <p className="text-indigo-100 text-xl mb-4">We're building our portfolio one project at a time. If you have something to build, we'd love to work on it — and add it here when it's done.</p>
                <p className="text-indigo-200 text-sm mb-10">No fake case studies. Just real work, done well.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setShowModal(true)}
                    className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg flex items-center justify-center gap-2">
                    Start Your Project <ArrowRight size={18} />
                  </button>
                  <button onClick={() => navigate('/resources/appointment')}
                    className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-colors backdrop-blur-sm">
                    Book a Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function ProjectCard({ project, featured = false }) {
  return (
    <div className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 h-full flex flex-col`}>
      {/* Cover */}
      <div className={`relative overflow-hidden ${featured ? 'h-56' : 'h-44'}`}>
        {project.coverImage ? (
          <img src={project.coverImage} alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.gradientColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
            <span className="text-white/20 text-7xl font-black">{project.title[0]}</span>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/20">
            {project.serviceCategory}
          </span>
        </div>
        {/* Result badge */}
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white font-bold text-sm">
            <TrendingUp size={14} /> {project.result}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {project.clientName && (
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">{project.clientName}</div>
        )}
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{project.title}</h3>

        <div className="space-y-3 mb-5 flex-1">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Problem</span>
            <p className="text-slate-600 text-sm mt-1 leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Solution</span>
            <p className="text-slate600 text-sm mt-1 leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Tech stack */}
        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            {project.techStack.slice(0, 4).map(tech => (
              <span key={tech} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2.5 py-1 bg-slate-100 text-slate-400 text-xs font-medium rounded-lg">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
