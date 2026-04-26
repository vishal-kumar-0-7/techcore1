import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Layers, ShieldCheck, Globe, Zap, Database, Code, CheckCircle, TrendingUp } from 'lucide-react';
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

export default function BlockchainDevelopment() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      <SEO title="Blockchain Development" description="Smart contracts, DeFi protocols, NFT platforms, and Web3 apps. Audited Solidity on Ethereum, Solana, Polygon and more." path="/services/blockchain-development" />
      {showModal && <LeadModal onClose={() => setShowModal(false)} serviceInterest="Blockchain Development" />}

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[700px] h-[700px] bg-amber-400/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-3xl opacity-50" />
        <GridPattern />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-amber-100 backdrop-blur-sm shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 mr-3 animate-pulse"></span>
                <span className="text-sm font-semibold text-amber-700 tracking-wide uppercase">Blockchain Development</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                Build on the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Decentralized Web</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                Smart contracts, DeFi protocols, NFT platforms, and Web3 applications built by engineers who live and breathe blockchain.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button onClick={() => setShowModal(true)} className="group px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                  Start Web3 Project <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:border-amber-200 hover:bg-amber-50/50 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  View Portfolio
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
              <h2 className="text-amber-600 font-bold tracking-wide uppercase text-sm mb-3">What We Build</h2>
              <h3 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6">Web3 Solutions End-to-End</h3>
              <p className="text-lg text-slate-600">From smart contract development to full dApp ecosystems — we build the decentralized future.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Code, title: "Smart Contracts", desc: "Audited Solidity and Rust smart contracts for Ethereum, Solana, Polygon, and more." },
              { icon: TrendingUp, title: "DeFi Protocols", desc: "DEXs, lending protocols, yield farming, and liquidity management platforms." },
              { icon: Layers, title: "NFT Platforms", desc: "NFT marketplaces, minting platforms, and generative art collections with royalty logic." },
              { icon: Globe, title: "dApp Development", desc: "Full-stack decentralized applications with Web3 wallet integration and on-chain logic." },
              { icon: Database, title: "Token Development", desc: "ERC-20, ERC-721, ERC-1155 tokens with vesting, staking, and governance mechanisms." },
              { icon: ShieldCheck, title: "Smart Contract Audits", desc: "Comprehensive security audits to identify vulnerabilities before deployment." },
            ].map((card, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="group h-full p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="h-14 w-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <card.icon size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">{card.title}</h4>
                  <p className="text-slate-600 leading-relaxed mb-6">{card.desc}</p>
                  <div className="flex items-center text-amber-600 font-bold text-sm group-hover:translate-x-2 transition-transform cursor-pointer">
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
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">From Concept to Chain</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Our blockchain delivery process prioritizes security, auditability, and user experience.</p>
            </div>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-4">
            {[
              { num: "01", title: "Tokenomics Design", desc: "Define token economics, governance models, and incentive structures." },
              { num: "02", title: "Architecture & Contracts", desc: "Design smart contract architecture and write auditable, gas-optimized code." },
              { num: "03", title: "Security Audit", desc: "Internal and third-party audits before any mainnet deployment." },
              { num: "04", title: "Deploy & Scale", desc: "Mainnet deployment, frontend integration, and community launch support." },
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="text-5xl font-black text-amber-100 group-hover:text-amber-200 transition-colors mb-4">{step.num}</div>
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
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold mb-4">Blockchain Tech Stack</h2>
              <p className="text-slate-400 max-w-2xl">Multi-chain expertise across the most important networks in Web3.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Layers, title: "Blockchains", tags: ["Ethereum", "Solana", "Polygon", "BNB Chain", "Avalanche", "Base"] },
              { icon: Code, title: "Smart Contract Languages", tags: ["Solidity", "Rust", "Vyper", "Move", "Cairo"] },
              { icon: Globe, title: "Web3 Frontend", tags: ["ethers.js", "wagmi", "RainbowKit", "Next.js", "The Graph"] },
              { icon: ShieldCheck, title: "Audit & Testing", tags: ["Hardhat", "Foundry", "Slither", "MythX", "Certik"] },
            ].map((stack, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:bg-slate-900 hover:border-amber-900/50 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
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
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-[2.5rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-amber-900/30">
              <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-amber-400 rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 bg-orange-600 rounded-full opacity-40 blur-3xl"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Web3 Built Right, First Time</h2>
                  <ul className="space-y-6">
                    {["Mandatory third-party security audit", "Gas optimization on every contract", "Multi-sig and timelock by default", "Post-launch community & technical support"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group">
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-amber-600 transition-colors">
                          <CheckCircle size={18} />
                        </div>
                        <span className="font-semibold text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                  <div className="flex gap-1 text-amber-300 mb-6">{[1,2,3,4,5].map(i => <span key={i}>★</span>)}</div>
                  <p className="text-xl font-medium leading-relaxed mb-8">"TechCore built our DeFi protocol from scratch. The smart contracts passed audit with zero critical findings. Incredible team."</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">DK</div>
                    <div>
                      <div className="font-bold">— Replace with a real client name once available</div>
                      <div className="text-amber-200 text-sm">Blockchain Development Client</div>
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
            <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tight">Ready to Go Onchain?</h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">Book a free Web3 strategy session and let's design your blockchain product together.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-amber-500 text-white font-bold text-lg shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Start Web3 Project <ArrowRight size={24} className="ml-3" />
              </button>
              <button onClick={() => navigate('/work')} className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                View Portfolio
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
