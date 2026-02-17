import NeuralNetwork3D from "@/components/NeuralNetwork3D";
import FinnitrexLogo from "@/components/FinnitrexLogo";
import TechTicker from "@/components/TechTicker";
import {
  getFeaturedProjects,
  getProjectScreenshotUrl,
} from "@/lib/content/projects";
import {
  ArrowRight,
  Cpu,
  LineChart,
  Terminal,
  ShieldCheck,
  Zap,
  Globe,
  Github,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 3);

  return (
    <main className="relative min-h-screen flex flex-col items-center overflow-x-hidden text-white w-full bg-black">
      {/* 3D Background */}
      <NeuralNetwork3D />

      {/* --- HERO SECTION --- */}
      <div className="z-10 container mx-auto px-4 md:px-6 pt-20 pb-20 text-center relative w-full">
        {/* HERO LOGO */}
        <div className="mb-8 scale-90 md:scale-100 origin-center inline-block">
          <FinnitrexLogo className="w-48 h-48 md:w-64 md:h-64" />{" "}
          {/* Bigger as requested */}
        </div>

        {/* MAIN TITLE */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          <span className="block text-white">ADVANCED</span>
          {/* Gradient: White -> Lime -> Emerald */}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-lime-400 to-emerald-600 drop-shadow-[0_0_20px_rgba(190,242,100,0.3)] break-words w-full">
            TECHNOLOGY
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light mb-12 leading-relaxed px-4">
          Architecting digital ecosystems with next-gen precision.
        </p>

        {/* Buttons - Lime & Black */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-md mx-auto md:max-w-none">
          <Link
            href="/start"
            className="w-full md:w-auto group relative px-8 py-5 bg-lime-400 text-black font-bold text-lg rounded-none skew-x-[-10deg] hover:skew-x-0 transition-transform duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 skew-x-[10deg] group-hover:skew-x-0">
              START PROJECT <ArrowRight size={20} />
            </span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 ease-out" />
          </Link>

          <Link
            href="/quote"
            className="w-full md:w-auto px-8 py-5 rounded-none border border-gray-700 hover:border-lime-400 hover:text-lime-400 transition-all backdrop-blur-sm text-lg font-medium tracking-wide"
          >
            GET QUOTE
          </Link>

          <Link
            href="/software"
            className="w-full md:w-auto px-8 py-5 rounded-none border border-gray-700 hover:border-lime-400 hover:text-lime-400 transition-all backdrop-blur-sm text-lg font-medium tracking-wide"
          >
            VIEW SOLUTIONS
          </Link>
        </div>
      </div>

      {/* --- NEW: TECH TICKER --- */}
      <TechTicker />

      {/* --- NEW: WHY FINNITREX (Value Props) --- */}
      <div className="w-full bg-gray-900/30 border-b border-gray-800 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-lime-900/20 rounded flex items-center justify-center border border-lime-500/30">
                <Zap className="text-lime-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Speed & Precision
              </h3>
              <p className="text-gray-400 leading-relaxed">
                We build on static-first architectures (Next.js). No bloat, no
                loading screens—just instant data availability.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-900/20 rounded flex items-center justify-center border border-emerald-500/30">
                <ShieldCheck className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Data Fortified</h3>
              <p className="text-gray-400 leading-relaxed">
                GDPR compliant by design. We implement banking-grade encryption
                for all financial and personnel data pipelines.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-lime-900/20 rounded flex items-center justify-center border border-lime-500/30">
                <Globe className="text-lime-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Global Infrastructure
              </h3>
              <p className="text-gray-400 leading-relaxed">
                UK-based governance with a global talent network. We deploy
                systems that scale across borders effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CAPABILITIES GRID --- */}
      <div className="z-10 container mx-auto px-6 py-20">
        <h2 className="text-xs font-mono text-lime-400 mb-8 tracking-[0.3em] uppercase text-center md:text-left">
          // SYSTEM_MODULES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/software"
            className="group p-8 rounded bg-gray-900/50 border border-gray-800 hover:border-lime-500 hover:bg-black transition-all"
          >
            <Terminal className="w-10 h-10 text-lime-400 mb-6 group-hover:drop-shadow-[0_0_10px_rgba(190,242,100,0.8)] transition-all" />
            <h3 className="text-xl font-bold mb-3 text-white">
              LMS & Software
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300">
              Custom Learning Management Systems and static web architectures.
            </p>
          </Link>

          <Link
            href="/fintech"
            className="group p-8 rounded bg-gray-900/50 border border-gray-800 hover:border-emerald-500 hover:bg-black transition-all"
          >
            <LineChart className="w-10 h-10 text-emerald-400 mb-6 group-hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.8)] transition-all" />
            <h3 className="text-xl font-bold mb-3 text-white">
              Data Analytics
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300">
              Predictive modeling and fintech visualization.
            </p>
          </Link>

          <Link
            href="/robotics"
            className="group p-8 rounded bg-gray-900/50 border border-gray-800 hover:border-lime-300 hover:bg-black transition-all"
          >
            <Cpu className="w-10 h-10 text-lime-200 mb-6 group-hover:drop-shadow-[0_0_10px_rgba(217,249,157,0.8)] transition-all" />
            <h3 className="text-xl font-bold mb-3 text-white">Future Labs</h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300">
              Robotics automation research and development.
            </p>
          </Link>
        </div>
      </div>

      {/* --- OUR WORKS PREVIEW --- */}
      <div className="w-full bg-black border-t border-gray-800 relative z-10">
        <div className="container mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-mono text-lime-400 mb-4 tracking-[0.3em] uppercase">
                // DELIVERED_SYSTEMS
              </h2>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Our Works
              </h3>
            </div>
            <Link
              href="/works"
              className="hidden md:inline-flex items-center gap-2 text-gray-400 hover:text-lime-400 font-medium transition-colors group"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.slug}
                className="group p-8 rounded bg-gray-900/50 border border-gray-800 hover:border-lime-500/40 hover:bg-gray-900/80 transition-all duration-300"
              >
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-5 overflow-hidden rounded border border-gray-800"
                  >
                    <img
                      src={getProjectScreenshotUrl(project.liveUrl)}
                      alt={`${project.title} live screenshot`}
                      className="w-full h-40 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </a>
                )}
                <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-lime-400 bg-lime-500/10 rounded-md font-mono">
                  {project.category}
                </span>
                <h4 className="text-xl font-bold text-white mt-4 mb-3 group-hover:text-lime-300 transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono bg-black/50 border border-white/10 rounded-full text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Source
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime-500 hover:text-lime-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile "View All" link */}
          <div className="mt-10 text-center md:hidden">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-lime-400 font-semibold transition-colors group"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
