import Link from "next/link";
import { ArrowRight, Terminal, LineChart, Cpu } from "lucide-react";
import FinnitrexLogo from "@/components/FinnitrexLogo";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-x-hidden text-white w-full">
      
      {/* 1. ENHANCED HERO SECTION */}
      <div className="z-10 container mx-auto px-4 md:px-6 pt-32 pb-12 text-center relative w-full max-w-[100vw]">
        
        {/* Holographic Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-900/10 backdrop-blur-md text-cyan-400 text-xs font-mono mb-8 animate-pulse">
          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
          SYSTEM ONLINE: FINNITREX.SYS
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <FinnitrexLogo className="w-16 h-16 md:w-20 md:h-20" />
        </div>

        {/* Main Title with enhanced styling */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
          <span className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            ADVANCED
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            TECHNOLOGY
          </span>
        </h1>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light mb-10 leading-relaxed">
          We architect digital ecosystems. Custom LMS platforms, AI-driven analytics, and high-performance software solutions for enterprises.
        </p>

        {/* Enhanced Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
           <Link href="/start" className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                 INITIALIZE PROJECT <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
           </Link>
           
           <Link href="/lms" className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm">
              View Solutions
           </Link>
        </div>
      </div>

      {/* 2. Core Capabilities Grid (Fixed Links) */}
      <div className="z-10 container mx-auto px-6 py-20 w-full">
        <h2 className="text-xs font-mono text-cyan-500 mb-8 tracking-widest uppercase text-center">Core Capabilities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: LMS / Software -> Goes to /lms */}
          <Link href="/lms" className="group p-8 rounded-2xl bg-black/50 border border-gray-800 hover:border-cyan-500/50 hover:bg-gray-900/80 transition-all">
            <Terminal className="w-10 h-10 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3">LMS & Software</h3>
            <p className="text-sm text-gray-400">Custom Learning Management Systems and static web architectures.</p>
          </Link>

          {/* Card 2: Analytics -> Goes to /fintech */}
          <Link href="/fintech" className="group p-8 rounded-2xl bg-black/50 border border-gray-800 hover:border-blue-500/50 hover:bg-gray-900/80 transition-all">
            <LineChart className="w-10 h-10 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3">Data Analytics</h3>
            <p className="text-sm text-gray-400">AI-powered predictive analytics for financial institutions.</p>
          </Link>

          {/* Card 3: Robotics -> Goes to /robotics */}
          <Link href="/robotics" className="group p-8 rounded-2xl bg-black/50 border border-gray-800 hover:border-purple-500/50 hover:bg-gray-900/80 transition-all">
            <Cpu className="w-10 h-10 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3">Future Labs</h3>
            <p className="text-sm text-gray-400">Robotics automation research and development.</p>
          </Link>

        </div>
      </div>

      {/* 3. Trust Indicators */}
      <div className="z-10 container mx-auto px-6 py-20 border-t border-gray-900 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl font-bold text-gray-300">UK-Based Technology Company</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400">
            <div>
              <div className="text-cyan-400 font-bold text-lg mb-2">Established</div>
              <div>UK Limited Company</div>
            </div>
            <div>
              <div className="text-blue-400 font-bold text-lg mb-2">Compliance</div>
              <div>GDPR & Data Fortified</div>
            </div>
            <div>
              <div className="text-purple-400 font-bold text-lg mb-2">Global Talent</div>
              <div>Sponsor Licence Pending</div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
