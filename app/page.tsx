import Link from "next/link";
import { ArrowRight, Terminal, LineChart, Cpu } from "lucide-react";
import FinnitrexLogo from "@/components/FinnitrexLogo";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-x-hidden text-white w-full">
      
      <div className="z-10 container mx-auto px-4 md:px-6 pt-32 pb-20 text-center relative w-full">
        
        {/* 1. HERO BRANDING - BIGGER & CENTERED */}
        <div className="mb-12 scale-125 md:scale-150 origin-center inline-block">
          <FinnitrexLogo className="w-20 h-20" />
        </div>

        {/* 2. MAIN TITLE - FIXED CROP & NEW GRADIENT */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
          <span className="block text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            ADVANCED
          </span>
          {/* Gradient: Lime -> Green -> Violet */}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-500 to-violet-600 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)] break-words w-full">
            TECHNOLOGY
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto font-light mb-12 leading-relaxed px-4">
          We architect digital ecosystems. Custom LMS platforms, AI-driven analytics, and high-performance software solutions.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-md mx-auto md:max-w-none">
           <Link href="/start" className="w-full md:w-auto group relative px-8 py-5 bg-white text-black font-bold text-lg rounded-none skew-x-[-10deg] hover:skew-x-0 transition-transform duration-300">
              <span className="relative z-10 flex items-center justify-center gap-2 skew-x-[10deg] group-hover:skew-x-0">
                 INITIALIZE PROJECT <ArrowRight size={20} />
              </span>
              {/* Hover Effect: Lime Green */}
              <div className="absolute inset-0 bg-lime-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 ease-out" />
           </Link>
           
           <Link href="/lms" className="w-full md:w-auto px-8 py-5 rounded-none border border-white/20 hover:bg-white/10 hover:border-lime-400/50 transition-all backdrop-blur-sm text-lg font-medium tracking-wide">
              VIEW SOLUTIONS
           </Link>
        </div>
      </div>

      {/* Core Capabilities Grid - Colors Updated */}
      <div className="z-10 container mx-auto px-6 py-20">
        <h2 className="text-xs font-mono text-lime-400 mb-8 tracking-[0.3em] uppercase text-center md:text-left">
          // CORE_CAPABILITIES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Link href="/lms" className="group p-8 rounded bg-black/40 border border-gray-800 hover:border-lime-500/50 hover:bg-gray-900/60 transition-all backdrop-blur-sm">
            <Terminal className="w-10 h-10 text-lime-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-lime-300 transition-colors">LMS & Software</h3>
            <p className="text-sm text-gray-400">Custom Learning Management Systems and static web architectures.</p>
          </Link>

          <Link href="/fintech" className="group p-8 rounded bg-black/40 border border-gray-800 hover:border-emerald-500/50 hover:bg-gray-900/60 transition-all backdrop-blur-sm">
            <LineChart className="w-10 h-10 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors">Data Analytics</h3>
            <p className="text-sm text-gray-400">AI-powered predictive analytics for financial institutions.</p>
          </Link>

          <Link href="/robotics" className="group p-8 rounded bg-black/40 border border-gray-800 hover:border-violet-500/50 hover:bg-gray-900/60 transition-all backdrop-blur-sm">
            <Cpu className="w-10 h-10 text-violet-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-300 transition-colors">Future Labs</h3>
            <p className="text-sm text-gray-400">Robotics automation research and development.</p>
          </Link>

        </div>
      </div>

    </main>
  );
}
