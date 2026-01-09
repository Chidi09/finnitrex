import { Suspense } from "react";
import LMSStructure from "@/components/LMSStructure"; // Keep the 3D model, it works for "Architecture"
import ContactTerminal from "@/components/ContactTerminal";
import { ArrowLeft, Code, Server, Cpu, Globe, GraduationCap, Eye } from "lucide-react";
import Link from "next/link";

export default function SoftwarePage() {
  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <div className="p-6 border-b border-gray-900">
        <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors w-fit">
          <ArrowLeft size={20} /> Back to Hub
        </Link>
      </div>

      <div className="container mx-auto px-6 py-12">
        
        {/* HERO: Broad Software Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-mono">
              <Code size={12} /> FULL STACK ENGINEERING
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              Complex Systems. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Flawless Execution.
              </span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-cyan-900 pl-6">
              We architect digital ecosystems. From high-performance static websites to enterprise-grade Learning Management Systems (LMS) and AI-driven data pipelines.
            </p>
          </div>
          <div className="w-full h-[500px]">
             {/* We use the structure to show "Complexity" */}
            <Suspense fallback={<div className="flex items-center justify-center h-full text-cyan-500 font-mono">LOADING ARCHITECTURE...</div>}>
              <LMSStructure />
            </Suspense>
          </div>
        </div>

        {/* CAPABILITIES MATRIX: Showing "We do a lot of things" */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Server className="text-cyan-500" /> Active Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Capability 1: Custom Software (The Main) */}
            <div className="p-6 rounded-xl bg-gray-900/40 border border-gray-700 hover:border-cyan-500 transition-all group">
              <Globe className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">High-Performance Web</h3>
              <p className="text-sm text-gray-400">Static site generation (Next.js) for zero-latency loading and perfect SEO scoring.</p>
            </div>

            {/* Capability 2: LMS (Nested) */}
            <div className="p-6 rounded-xl bg-gray-900/40 border border-gray-700 hover:border-blue-500 transition-all group">
              <GraduationCap className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">LMS Architectures</h3>
              <p className="text-sm text-gray-400">Custom education platforms with student tracking, certification, and video delivery.</p>
            </div>

            {/* Capability 3: AI & LLMs (Nested) */}
            <div className="p-6 rounded-xl bg-gray-900/40 border border-gray-700 hover:border-purple-500 transition-all group">
              <Cpu className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">LLM Integration</h3>
              <p className="text-sm text-gray-400">Fine-tuning language models for customer support bots and internal knowledge bases.</p>
            </div>

            {/* Capability 4: Optics/Data */}
            <div className="p-6 rounded-xl bg-gray-900/40 border border-gray-700 hover:border-green-500 transition-all group">
              <Eye className="w-8 h-8 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">Optics & Computer Vision</h3>
              <p className="text-sm text-gray-400">Automated image processing and visual data analytics for industrial application.</p>
            </div>

            {/* Capability 5: Software Solutions */}
            <div className="p-6 rounded-xl bg-gray-900/40 border border-gray-700 hover:border-yellow-500 transition-all group">
              <Server className="w-8 h-8 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">SaaS Development</h3>
              <p className="text-sm text-gray-400">Full-cycle software development including subscription management and cloud scaling.</p>
            </div>

             {/* Capability 6: Robotics (Future) */}
             <div className="p-6 rounded-xl bg-gray-900/20 border border-gray-800 border-dashed relative overflow-hidden">
              <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
                <span className="text-xs font-mono bg-cyan-900/50 text-cyan-400 px-2 py-1 rounded border border-cyan-800">R&D / FUTURE ROADMAP</span>
              </div>
              <Cpu className="w-8 h-8 text-gray-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-500 mb-2">Robotics Automation</h3>
              <p className="text-sm text-gray-600">Prototyping next-gen hardware interfaces.</p>
            </div>

          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <ContactTerminal />
        </div>

      </div>
    </main>
  );
}
