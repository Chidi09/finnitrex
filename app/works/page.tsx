import { Metadata } from "next";
import Link from "next/link";
import {
  getAllProjects,
  getProjectCategories,
  getProjectScreenshotUrl,
} from "@/lib/content/projects";
import { ArrowRight, ExternalLink, Github, Code } from "lucide-react";
import ProjectScreenshot from "@/components/ProjectScreenshot";

export const metadata: Metadata = {
  title: "Our Works | Projects & Solutions Portfolio",
  description:
    "Explore Finnitrex's portfolio of delivered projects spanning AI platforms, fintech payment systems, LMS solutions, NLP tools, and custom web applications.",
  keywords: [
    "Finnitrex portfolio",
    "software projects",
    "AI solutions",
    "LMS development",
    "fintech projects",
    "NLP platforms",
    "web applications",
    "case studies",
  ],
  openGraph: {
    title: "Finnitrex Works | Our Project Portfolio",
    description:
      "Real projects delivered across AI, fintech, edtech, and custom software development.",
    url: "https://finnitrex.com/works",
    type: "website",
  },
};

function getCategoryStyle(category: string) {
  const map: Record<string, { border: string; text: string; bg: string; glow: string }> = {
    FinTech:      { border: "border-emerald-500/40", text: "text-emerald-400", bg: "bg-emerald-500/10", glow: "from-emerald-600 to-green-600" },
    "E-Commerce": { border: "border-orange-500/40",  text: "text-orange-400",  bg: "bg-orange-500/10",  glow: "from-orange-600 to-amber-600" },
    "Real Estate":{ border: "border-amber-500/40",   text: "text-amber-400",   bg: "bg-amber-500/10",   glow: "from-amber-600 to-yellow-600" },
    Healthcare:   { border: "border-blue-500/40",    text: "text-blue-400",    bg: "bg-blue-500/10",    glow: "from-blue-600 to-cyan-600" },
    Agriculture:  { border: "border-lime-500/40",    text: "text-lime-400",    bg: "bg-lime-500/10",    glow: "from-lime-600 to-emerald-600" },
    Web3:         { border: "border-purple-500/40",  text: "text-purple-400",  bg: "bg-purple-500/10",  glow: "from-purple-600 to-pink-600" },
    "AI Tool":    { border: "border-cyan-500/40",    text: "text-cyan-400",    bg: "bg-cyan-500/10",    glow: "from-cyan-600 to-blue-600" },
    Management:   { border: "border-yellow-500/40",  text: "text-yellow-400",  bg: "bg-yellow-500/10",  glow: "from-yellow-600 to-orange-600" },
  };
  return map[category] || { border: "border-gray-500/40", text: "text-gray-400", bg: "bg-gray-500/10", glow: "from-gray-600 to-gray-600" };
}

export default function WorksPage() {
  const allProjects = getAllProjects();
  const categories = getProjectCategories();
  const featured = allProjects.filter((p) => p.featured);
  const other = allProjects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-lime-500/30">

      {/* ── Hero Header ─────────────────────────────── */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-10 relative z-10">
          <div className="max-w-4xl">
            <p className="text-xs font-mono text-lime-400 mb-3 tracking-[0.3em] uppercase">
              // PROJECT_ARCHIVE
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-[0.9]">
              <span className="text-white">OUR </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
                WORKS
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
              A catalogue of systems we have engineered&nbsp;&mdash; from AI-driven
              platforms and fintech gateways to LMS ecosystems and intelligent
              automation tools.
            </p>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-10 pt-8 border-t border-gray-800">
            <div>
              <div className="text-3xl font-black text-white">{allProjects.length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-mono">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-black text-lime-400">{categories.length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-mono">Sectors Covered</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">
                {new Set(allProjects.flatMap((p) => p.techStack)).size}+
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-mono">Technologies Used</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured Projects ────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 pb-20">
        <h2 className="text-xs font-mono text-lime-400 mb-8 tracking-[0.3em] uppercase">
          // FEATURED_SYSTEMS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
          {featured.map((project) => {
            const style = getCategoryStyle(project.category);
            return (
              <div
                key={project.slug}
                className={`group relative bg-gray-900/50 border ${style.border} rounded-xl overflow-hidden hover:bg-gray-900/80 transition-all duration-500`}
              >
                {/* Hover glow */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${style.glow} rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 pointer-events-none`} />

                <div className="relative">
                  {/* Screenshot — 16/9 ratio, fills full card width */}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden border-b border-gray-800"
                      tabIndex={-1}
                    >
                      <ProjectScreenshot
                        src={getProjectScreenshotUrl(project.liveUrl)}
                        alt={`${project.title} live screenshot`}
                        aspect="aspect-video"
                      />
                    </a>
                  ) : (
                    <div className="aspect-video bg-gray-900/60 flex items-center justify-center border-b border-gray-800">
                      <Code className="w-8 h-8 text-gray-700" />
                    </div>
                  )}

                  <div className="p-5 sm:p-6">
                    {/* Category badge */}
                    <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${style.text} ${style.bg} rounded font-mono`}>
                      {project.category}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-2 leading-tight group-hover:text-lime-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[10px] font-mono bg-black/50 backdrop-blur border border-white/10 rounded-full text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 flex-wrap">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-lime-400 hover:text-lime-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Source Code
                        </a>
                      )}
                      {!project.liveUrl && !project.githubUrl && (
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                          <Code className="w-4 h-4" />
                          Private Repository
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Other Projects ───────────────────────────── */}
        <h2 className="text-xs font-mono text-gray-500 mb-8 tracking-[0.3em] uppercase">
          // ALL_MODULES
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {other.map((project) => {
            const style = getCategoryStyle(project.category);
            return (
              <div
                key={project.slug}
                className="group bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden hover:border-lime-500/30 hover:bg-gray-900/60 transition-all duration-300"
              >
                {/* Screenshot */}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-b border-gray-800"
                    tabIndex={-1}
                  >
                    <ProjectScreenshot
                      src={getProjectScreenshotUrl(project.liveUrl)}
                      alt={`${project.title} live screenshot`}
                      aspect="aspect-video"
                    />
                  </a>
                ) : (
                  <div className="aspect-video bg-gray-900/60 flex items-center justify-center border-b border-gray-800">
                    <Code className="w-6 h-6 text-gray-700" />
                  </div>
                )}

                <div className="p-4 sm:p-5">
                  <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${style.text} ${style.bg} rounded font-mono`}>
                    {project.category}
                  </span>

                  <h3 className="text-base font-bold text-white mt-2.5 mb-1.5 group-hover:text-lime-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono bg-black/40 border border-white/5 rounded-full text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-gray-800 flex-wrap">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        View Code
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
                    {!project.githubUrl && !project.liveUrl && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                        <Code className="w-3.5 h-3.5" />
                        Private
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to build something{" "}
            <span className="text-lime-400">remarkable</span>?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Whether it is a fintech platform, an AI-driven system, or a custom
            LMS&nbsp;&mdash; we engineer solutions that deliver.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/start"
              className="group relative px-8 py-4 bg-lime-400 text-black font-bold text-base sm:text-lg rounded-none skew-x-[-10deg] hover:skew-x-0 transition-transform duration-300 inline-block"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 skew-x-[10deg] group-hover:skew-x-0">
                START A PROJECT <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 ease-out" />
            </Link>
            <Link
              href="/case-studies"
              className="px-8 py-4 rounded-none border border-gray-700 hover:border-lime-400 hover:text-lime-400 transition-all text-base sm:text-lg font-medium tracking-wide inline-block"
            >
              VIEW CASE STUDIES
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
