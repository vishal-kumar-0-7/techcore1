import { useState, useEffect } from 'react';
import LeadModal from '../../components/LeadModal';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, Zap } from 'lucide-react';
import SEO from '../../components/SEO';
import { API } from '../../lib/api.js';

export default function WebDevelopment() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/engagement-plans`)
      .then(r => r.json())
      .then(data => { setPlans(Array.isArray(data) ? data : []); setPlansLoading(false); })
      .catch(() => setPlansLoading(false));
  }, []);
  const techStack = {
    frontend: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'TypeScript'],
    backend: ['Node.js', 'Laravel', 'Python', 'Express.js', 'FastAPI'],
    database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase'],
    cloud: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Vercel']
  };

  const services = [
    {
      icon: '🏢',
      title: 'Business Websites',
      points: ['Corporate websites', 'Professional portfolios', 'Brand showcases', 'Multi-page sites']
    },
    {
      icon: '💻',
      title: 'Web Apps & SaaS Platforms',
      points: ['Custom web applications', 'SaaS platforms', 'Progressive web apps', 'Real-time dashboards']
    },
    {
      icon: '📊',
      title: 'Admin Dashboards',
      points: ['Analytics dashboards', 'Content management', 'User management', 'Data visualization']
    },
    {
      icon: '🛒',
      title: 'eCommerce & Marketplaces',
      points: ['Online stores', 'Multi-vendor platforms', 'Payment integration', 'Inventory management']
    },
    {
      icon: '⚙️',
      title: 'CRM / ERP Portals',
      points: ['Customer management', 'Business processes', 'Workflow automation', 'Integration systems']
    },
    {
      icon: '🎯',
      title: 'Landing Pages & Funnels',
      points: ['High-converting pages', 'Lead generation', 'A/B testing ready', 'Marketing funnels']
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Requirements analysis, competitor research, and project planning',
      duration: '1-2 weeks'
    },
    {
      step: '02',
      title: 'UI/UX Design',
      description: 'Wireframes, prototypes, and visual design creation',
      duration: '2-3 weeks'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Frontend & backend development with regular demos',
      duration: '4-8 weeks'
    },
    {
      step: '04',
      title: 'Launch & Support',
      description: 'Deployment, testing, and ongoing maintenance',
      duration: 'Ongoing'
    }
  ];

  // const caseStudies = [
  //   {
  //     title: 'E-commerce Platform Redesign',
  //     problem: 'Low conversion rates and poor mobile experience',
  //     solution: 'Complete UI/UX overhaul with React & Next.js',
  //     result: '+52% Organic Traffic',
  //     color: 'from-blue-500 to-cyan-500'
  //   },
  //   {
  //     title: 'SaaS Dashboard Development',
  //     problem: 'Complex data needed simple visualization',
  //     solution: 'Custom analytics dashboard with real-time updates',
  //     result: '+85% User Engagement',
  //     color: 'from-purple-500 to-pink-500'
  //   },
  //   {
  //     title: 'Corporate Website Modernization',
  //     problem: 'Outdated design affecting brand perception',
  //     solution: 'Modern responsive design with CMS integration',
  //     result: '+120% Lead Generation',
  //     color: 'from-green-500 to-teal-500'
  //   }
  // ];

  const whyChooseUs = [
    {
      icon: '🏗️',
      title: 'Architecture-First Approach',
      description: 'Scalable, maintainable code architecture that grows with your business needs.'
    },
    {
      icon: '⚡',
      title: 'SEO-Ready & Fast Performance',
      description: 'Optimized for search engines with lightning-fast loading speeds and Core Web Vitals.'
    },
    {
      icon: '🔒',
      title: 'Secure Development',
      description: 'OWASP security standards, data encryption, and vulnerability assessments included.'
    },
    {
      icon: '💬',
      title: 'Transparent Communication',
      description: 'Weekly demos, progress updates, and direct access to development team.'
    }
  ];

  const faqs = [
    {
      question: 'How long does a website take to develop?',
      answer: 'Timeline depends on complexity. Simple websites take 2-4 weeks, while complex web applications can take 8-16 weeks. We provide detailed timelines during discovery phase.'
    },
    {
      question: 'Do you provide maintenance and support?',
      answer: 'Yes, we offer ongoing maintenance packages including security updates, performance monitoring, content updates, and technical support.'
    },
    {
      question: 'Which technology stack is best for my project?',
      answer: 'We recommend the stack based on your specific needs. React/Next.js for modern SPAs, Laravel for content-heavy sites, and Node.js for real-time applications.'
    },
    {
      question: 'Do you build SEO-friendly websites?',
      answer: 'Absolutely. All our websites are built with SEO best practices, including proper meta tags, structured data, fast loading speeds, and mobile optimization.'
    },
    {
      question: 'Can you redesign my existing website?',
      answer: 'Yes, we specialize in website redesigns and modernization. We can work with your existing content and improve design, performance, and functionality.'
    },
    {
      question: 'How do payments work?',
      answer: 'We typically work with milestone-based payments. 30% upfront, 40% at design approval, and 30% at project completion. Custom payment terms available for enterprise clients.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO title="Web Development" description="High-performance websites, dashboards, and web apps built with React, Next.js, Node.js, and Laravel. Get a free consultation." path="/services/web-development" />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="Web Development" />}
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Web Application Development
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                That Scales
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              High-performance websites, dashboards, admin panels, and portals built with modern stacks like React, Next.js, Node.js, Laravel.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button onClick={() => setShowModal(true)} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Free Consultation
              </button>
              <button onClick={() => navigate('/work')} className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">Quality</div>
              <div className="text-sm text-slate-600">First, Always</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">Direct</div>
              <div className="text-sm text-slate-600">Founder Access</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">Full IP</div>
              <div className="text-sm text-slate-600">Ownership Transferred</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">30 Days</div>
              <div className="text-sm text-slate-600">Post-Launch Warranty</div>
            </div>
          </div>
          
          {/* Client Logos */}
          {/* <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-slate-400">Flipkart</div>
            <div className="text-2xl font-bold text-slate-400">Walmart</div>
            <div className="text-2xl font-bold text-slate-400">Reliance</div>
            <div className="text-2xl font-bold text-slate-400">Tata</div>
            <div className="text-2xl font-bold text-slate-400">Infosys</div>
          </div> */}
        </div>
      </section>

      {/* What We Build */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What We Build
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From simple websites to complex enterprise applications, we deliver solutions that drive business growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.points.map((point, idx) => (
                    <li key={idx} className="text-slate-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Our Development Process
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A proven methodology that ensures quality delivery and transparent communication throughout the project.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 transform -translate-y-1/2 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-600 mb-4">{step.description}</p>
                    <div className="text-sm font-semibold text-blue-600">{step.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Technology Stack
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              We use cutting-edge technologies to build robust, scalable, and maintainable applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(techStack).map(([category, technologies]) => (
              <div key={category} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 capitalize">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-sm hover:bg-slate-600 transition-colors duration-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Case Studies
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real results from real projects. See how we've helped businesses achieve their goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${study.color}`}></div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{study.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-1">Problem</h4>
                      <p className="text-slate-600 text-sm">{study.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-1">Solution</h4>
                      <p className="text-slate-600 text-sm">{study.solution}</p>
                    </div>
                    <div className={`p-4 bg-gradient-to-r ${study.color} bg-opacity-10 rounded-lg`}>
                      <div className="font-bold text-lg text-slate-900">{study.result}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We don't just build websites, we create digital experiences that drive business success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="flex items-start space-x-6 p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
                <div className="text-4xl">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-60 -z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-wide uppercase text-sm">Pricing</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3 mb-4">
              Engagement Models
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              No hidden fees. No lock-in. Pick the model that fits how you work.
            </p>
          </div>

          {plansLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="rounded-3xl bg-slate-100 animate-pulse h-96" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {plans.map((plan) => (
                <div key={plan.id}
                  className={`relative flex flex-col rounded-3xl border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                    ${plan.popular
                      ? 'border-blue-500 bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-2xl shadow-blue-500/30'
                      : 'border-slate-200 bg-white shadow-lg hover:border-blue-300'
                    }`}>

                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className={`px-5 py-1.5 rounded-full text-sm font-bold shadow-lg ${plan.popular ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-1">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className={`text-2xl font-extrabold mb-1 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                        {plan.name}
                      </h3>
                      <div className={`text-sm font-semibold mb-4 ${plan.popular ? 'text-blue-200' : 'text-blue-600'}`}>
                        {plan.tagline}
                      </div>
                      <p className={`text-sm leading-relaxed ${plan.popular ? 'text-blue-100' : 'text-slate-500'}`}>
                        {plan.description}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className={`h-px mb-6 ${plan.popular ? 'bg-white/20' : 'bg-slate-100'}`} />

                    {/* Features */}
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle size={17} className={`shrink-0 mt-0.5 ${plan.popular ? 'text-blue-200' : 'text-green-500'}`} />
                          <span className={`text-sm ${plan.popular ? 'text-blue-50' : 'text-slate-600'}`}>{f}</span>
                        </li>
                      ))}
                      {plan.notIncluded?.map((f, i) => (
                        <li key={`no-${i}`} className="flex items-start gap-3 opacity-50">
                          <XCircle size={17} className={`shrink-0 mt-0.5 ${plan.popular ? 'text-blue-300' : 'text-slate-400'}`} />
                          <span className={`text-sm line-through ${plan.popular ? 'text-blue-200' : 'text-slate-400'}`}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => setShowModal(true)}
                      className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 group
                        ${plan.popular
                          ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'
                          : 'bg-slate-900 text-white hover:bg-blue-600'
                        }`}>
                      {plan.ctaLabel}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {plan.popular && (
                      <p className="text-center text-blue-200 text-xs mt-3 flex items-center justify-center gap-1">
                        <Zap size={12} /> Cancel anytime · No lock-in
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom note */}
          <p className="text-center text-slate-400 text-sm mt-10">
            Not sure which model fits? <button onClick={() => setShowModal(true)} className="text-blue-600 font-semibold hover:underline">Book a free call</button> and we'll recommend the right one.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Get answers to common questions about our web development services.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Build Your Web Product?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Let's discuss your project requirements and create a solution that drives results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Book Free Call
            </button>
            <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
              onClick={() => window.open('https://wa.me/8521617304', '_blank')}>
              <span>💬</span>
              WhatsApp Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
