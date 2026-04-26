import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Helmet>
        <title>TechCore — Product Engineering Agency</title>
        <meta name="description" content="TechCore builds high-performance web apps, mobile apps, AI tools, and enterprise software. Launching August 2026." />
        <meta property="og:title" content="TechCore — Product Engineering Agency" />
        <meta property="og:description" content="TechCore builds high-performance web apps, mobile apps, AI tools, and enterprise software." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 backdrop-blur-sm mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">Launching Soon</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                TechCore
              </span>
              <br />
              <span className="text-slate-700">Coming Soon</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Crafting next-generation digital experiences through innovative web, mobile, and product engineering solutions that scale with your vision.
            </p>

            {/* Central Visual Element */}
            <div className="relative mb-16">
              <div className="mx-auto w-64 h-64 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <div className="text-6xl animate-bounce">🚀</div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>

            {/* Launch Timeline */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
              <span className="text-slate-600">Estimated Launch:</span>
              <span className="font-bold text-slate-900 text-lg">August 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Services We'll Deliver
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive technology solutions designed to transform your ideas into powerful, scalable digital products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">🌐</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Web Development</h3>
              <p className="text-slate-600 leading-relaxed">
                Modern, responsive web applications using React, Next.js, and cutting-edge frontend technologies for exceptional user experiences.
              </p>
            </div>

            {/* Mobile Development */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Mobile Development</h3>
              <p className="text-slate-600 leading-relaxed">
                Native and cross-platform mobile applications with React Native and Flutter, delivering seamless performance across all devices.
              </p>
            </div>

            {/* UI/UX Design */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-pink-200">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">UI/UX Design</h3>
              <p className="text-slate-600 leading-relaxed">
                User-centered design solutions, prototyping, and design systems that drive engagement and conversion.
              </p>
            </div>

            {/* Backend & APIs */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-green-200">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Backend & APIs</h3>
              <p className="text-slate-600 leading-relaxed">
                Robust server architecture, RESTful APIs, and database solutions built for performance and scalability.
              </p>
            </div>

            {/* DevOps & Cloud */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-indigo-200">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">☁️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">DevOps & Cloud</h3>
              <p className="text-slate-600 leading-relaxed">
                CI/CD pipelines, containerization, and optimized cloud deployments on AWS, GCP, and Azure platforms.
              </p>
            </div>

            {/* Startup Solutions */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Startup Solutions</h3>
              <p className="text-slate-600 leading-relaxed">
                End-to-end support for startups, from MVP development to scaling strategies and technical consulting.
              </p>
            </div>

            {/* AI & Automation */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-cyan-200">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI & Automation</h3>
              <p className="text-slate-600 leading-relaxed">
                Custom machine learning solutions, intelligent automation, and AI-powered features to enhance your products.
              </p>
            </div>

            {/* QA & Testing */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-teal-200">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">QA & Testing</h3>
              <p className="text-slate-600 leading-relaxed">
                Comprehensive testing strategies including automated testing, performance optimization, and quality assurance.
              </p>
            </div>

            {/* Consulting */}
            <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-violet-200">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Strategic Consulting</h3>
              <p className="text-slate-600 leading-relaxed">
                Product strategy, technical architecture planning, and post-launch support to ensure long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join our waitlist to be the first to know when we launch and get exclusive early access to our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-white font-medium">Coming August 2026</span>
            </div>
            <div className="w-full sm:w-auto">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full w-1/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
