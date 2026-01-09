import Link from "next/link";
import { ArrowRight, Code, Database, Cpu, Eye, Layers } from "lucide-react";
import FinnitrexLogo from "@/components/FinnitrexLogo";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <FinnitrexLogo className="w-16 h-16 md:w-20 md:h-20" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Technology</span> Solutions
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We architect digital ecosystems. Custom LMS platforms, AI-driven analytics, and high-performance software solutions for enterprises and SMEs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link 
              href="/start"
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-2"
            >
              Initialize Project
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link 
              href="/lms"
              className="px-8 py-4 border border-gray-700 text-white rounded-lg font-bold text-lg hover:border-cyan-500 hover:bg-gray-900/50 transition-all"
            >
              View Solutions
            </Link>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 py-20 border-t border-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Core <span className="text-cyan-400">Capabilities</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Service 1: LMS */}
          <Link href="/lms" className="group p-8 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-cyan-500/50 hover:bg-gray-900/50 transition-all duration-500">
            <div className="w-12 h-12 bg-cyan-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="text-cyan-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">LMS Architecture</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Custom Learning Management Systems for education and corporate training with automated certification and progress tracking.
            </p>
          </Link>

          {/* Service 2: Fintech */}
          <Link href="/fintech" className="group p-8 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-blue-500/50 hover:bg-gray-900/50 transition-all duration-500">
            <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Database className="text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Data Analytics</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered predictive analytics and fintech solutions for investment firms and financial institutions.
            </p>
          </Link>

          {/* Service 3: Software */}
          <Link href="/lms" className="group p-8 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-purple-500/50 hover:bg-gray-900/50 transition-all duration-500">
            <div className="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Code className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Software Solutions</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              High-performance static websites, SaaS platforms, and custom software development with Next.js and modern frameworks.
            </p>
          </Link>

          {/* Service 4: AI */}
          <Link href="/lms" className="group p-8 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-green-500/50 hover:bg-gray-900/50 transition-all duration-500">
            <div className="w-12 h-12 bg-green-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">AI Integration</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              LLM integration, AI chatbots, and machine learning solutions for automated decision-making and customer support.
            </p>
          </Link>

          {/* Service 5: Optics */}
          <Link href="/lms" className="group p-8 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-yellow-500/50 hover:bg-gray-900/50 transition-all duration-500">
            <div className="w-12 h-12 bg-yellow-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Eye className="text-yellow-400" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Optics & Vision</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Computer vision systems and optical data processing for industrial automation and visual analytics.
            </p>
          </Link>

          {/* Service 6: Robotics */}
          <Link href="/robotics" className="group p-8 rounded-2xl bg-gray-900/20 border border-gray-800 border-dashed hover:border-gray-700 transition-all duration-500">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
              <Cpu className="text-gray-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-500">Future Labs</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Robotics automation research and development for next-generation industrial applications.
            </p>
            <span className="text-xs font-mono bg-cyan-900/50 text-cyan-400 px-2 py-1 rounded border border-cyan-800 inline-block mt-4">
              R&D / IN DEVELOPMENT
            </span>
          </Link>

        </div>
      </div>

      {/* Trust Indicators */}
      <div className="container mx-auto px-6 py-20 border-t border-gray-900">
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
