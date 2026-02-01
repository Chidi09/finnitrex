import { Metadata } from "next";
import Link from "next/link";
import { getAllCaseStudies } from "@/lib/content/caseStudies";
import { ArrowRight, BarChart3, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies | Client Success Stories",
  description:
    "Explore real-world success stories showcasing Finnitrex's AI solutions, LMS implementations, fintech platforms, and custom software projects with measurable results.",
  keywords: [
    "case studies",
    "client success stories",
    "AI implementation",
    "LMS case studies",
    "fintech projects",
    "software development portfolio",
    "client testimonials",
  ],
  openGraph: {
    title: "Finnitrex Case Studies | Client Success",
    description:
      "Real-world success stories from our AI, LMS, and fintech projects",
    url: "https://finnitrex.com/case-studies",
    type: "website",
  },
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-20 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Our Work
          </h1>
          <p className="text-xl text-gray-400">
            Real problems. Elegant solutions. Measurable results. Explore how we
            engineer success for our partners.
          </p>
        </div>

        {/* Case Study Grid */}
        <div className="space-y-24">
          {caseStudies.map((study, index) => (
            <div
              key={study.slug}
              className={`flex flex-col gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Image / Visual Side */}
              <div className="flex-1 relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative aspect-video bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                    {/* Placeholder for actual image */}
                    <span className="text-lg font-medium">
                      Project: {study.client}
                    </span>
                  </div>
                  {/* Overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-950 to-transparent">
                    <div className="flex flex-wrap gap-2">
                      {study.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-black/50 backdrop-blur border border-white/10 rounded-full text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 text-xs font-bold tracking-wider text-purple-400 uppercase bg-purple-500/10 rounded-md">
                    {study.industry}
                  </span>
                  <span className="text-sm text-gray-500">{study.client}</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  {study.title}
                </h2>

                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  {study.description}
                </p>

                {/* Mini Metrics Preview */}
                <div className="grid grid-cols-2 gap-6 mb-8 border-l-2 border-gray-800 pl-6">
                  {study.results.slice(0, 2).map((res) => (
                    <div key={res.label}>
                      <div className="text-2xl font-bold text-white">
                        {res.value}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 text-white font-semibold hover:text-purple-400 transition-colors group"
                  >
                    View Full Case Study
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
