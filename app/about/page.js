import { Suspense } from "react";
import { ArrowLeft, MapPin, Building2, Users, Target, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";
import TalentGlobe from "@/components/TalentGlobe";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-gray-300 font-sans">
      
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <Link href="/" className="flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors w-fit mb-8">
          <ArrowLeft size={20} /> Return to Hub
        </Link>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Finnitrex</h1>
          <p className="text-sm text-emerald-500 font-mono mb-12">UK LIMITED COMPANY | ESTABLISHED 2024</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Left: 3D Globe */}
            <div className="space-y-6 flex flex-col">
              <div className="bg-gray-900/50 rounded-3xl border border-gray-800 overflow-hidden backdrop-blur-sm w-full flex-1 aspect-square min-h-[400px] md:min-h-[500px]">
                <Suspense fallback={
                  <div className="flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[500px] text-lime-400 font-mono">
                    LOADING GLOBAL NETWORK...
                  </div>
                }>
                  <TalentGlobe />
                </Suspense>
              </div>
              <div className="text-center">
                <p className="text-xs font-mono text-gray-500">
                  GLOBAL TALENT DISTRIBUTION MAP
                </p>
              </div>
            </div>

            {/* Right: Company Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Building2 className="text-lime-400" /> Who We Are
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Finnitrex Solutions Ltd is a UK-based technology company specializing in advanced software architecture, 
                  AI integration, and digital ecosystem development. We operate from our headquarters in London, 
                  building enterprise-grade solutions for education, finance, and manufacturing sectors.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Our team combines UK governance with a global talent network, enabling us to deliver 
                  high-performance systems that scale across borders while maintaining strict compliance standards.
                </p>
              </div>

              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="text-emerald-400" /> Our Location
                </h3>
                <div className="space-y-2 text-gray-400">
                  <p className="font-medium text-white">483 Green Lanes</p>
                  <p>London, N13 4BS</p>
                  <p>United Kingdom</p>
                </div>
              </div>
            </div>

          </div>

          {/* Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-lime-900/20 rounded flex items-center justify-center border border-lime-500/30">
                <Target className="text-lime-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To architect digital ecosystems that combine cutting-edge AI, 
                static-first performance, and enterprise-grade security for clients worldwide.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-900/20 rounded flex items-center justify-center border border-emerald-500/30">
                <Users className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Global Talent</h3>
              <p className="text-gray-400 leading-relaxed">
                We actively recruit overseas talent through UK Sponsor Licence pathways, 
                building a diverse team of engineers and specialists from around the world.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-lime-900/20 rounded flex items-center justify-center border border-lime-500/30">
                <ShieldCheck className="text-lime-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Compliance First</h3>
              <p className="text-gray-400 leading-relaxed">
                UK Limited Company status with GDPR-compliant architecture by design. 
                We maintain banking-grade encryption standards for all data pipelines.
              </p>
            </div>
          </div>

          {/* Services Overview */}
          <div className="bg-gray-900/30 rounded-3xl border border-gray-800 p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Globe className="text-lime-400" /> What We Build
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-lime-400">LMS & Software Solutions</h3>
                <p className="text-gray-400 text-sm">
                  Custom Learning Management Systems built on static-first Next.js architectures 
                  for instant data availability and zero-load performance.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-emerald-400">Data Analytics & Fintech</h3>
                <p className="text-gray-400 text-sm">
                  Predictive modeling, financial visualization, and AI-driven analytics 
                  with GDPR-compliant data handling and encryption.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-lime-400">Future Labs Research</h3>
                <p className="text-gray-400 text-sm">
                  Robotics automation, computer vision, and advanced optics research 
                  pushing the boundaries of applied technology.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-emerald-400">Enterprise Integration</h3>
                <p className="text-gray-400 text-sm">
                  Seamless API development, cloud infrastructure, and cross-border 
                  system deployment with UK governance standards.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              Interested in joining our team or discussing a project?
            </p>
            <Link 
              href="/start" 
              className="inline-block px-8 py-4 bg-lime-400 text-black font-bold text-lg rounded-none hover:bg-white transition-colors"
            >
              INITIALIZE PROJECT
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
