import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudyBySlug, getAllCaseStudies } from "@/lib/content/caseStudies";
import { ArrowLeft, CheckCircle2, Quote } from "lucide-react";
import { BreadcrumbSchema, CaseStudySchema } from "@/components/StructuredData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) return { title: "Not Found" };

  return {
    title: `${study.title} | ${study.client} Case Study`,
    description: study.description,
  };
}

export default async function CaseStudyDetail({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://finnitrex.com" },
          { name: "Case Studies", url: "https://finnitrex.com/case-studies" },
          { name: study.title, url: `https://finnitrex.com/case-studies/${study.slug}` },
        ]}
      />
      <CaseStudySchema
        title={study.title}
        description={study.description}
        date={study.date}
        author="Finnitrex Team"
        url={`https://finnitrex.com/case-studies/${study.slug}`}
        image={study.heroImage}
      />

      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="bg-gray-900/30 border-b border-gray-800">
          <div className="container mx-auto px-4 py-20 max-w-5xl">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Case Studies
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-purple-400 font-mono text-sm">{study.client}</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span className="text-gray-400 text-sm">{study.industry}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-8">{study.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {study.results.map((res) => (
                <div key={res.label} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {res.value}
                  </div>
                  <div className="text-sm text-gray-400">{res.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Left Column: Narrative */}
            <div className="lg:col-span-2 space-y-16">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">The Challenge</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {study.challenge}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">Our Solution</h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  {study.solution}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-300">Scalable architecture design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-300">Performance optimization & caching</span>
                  </li>
                </ul>
              </section>

              {study.testimonial && (
                <blockquote className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-8 rounded-2xl border border-purple-500/20">
                  <Quote className="w-10 h-10 text-purple-400 mb-4 opacity-50" />
                  <p className="text-xl text-gray-200 italic mb-6">
                    "{study.testimonial.quote}"
                  </p>
                  <footer className="text-sm">
                    <strong className="text-white block">{study.testimonial.author}</strong>
                    <span className="text-gray-500">{study.testimonial.role}</span>
                  </footer>
                </blockquote>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-6">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {study.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-black border border-gray-700 rounded-lg text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800">
                  <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-4">
                    Services
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>Custom Development</li>
                    <li>System Architecture</li>
                    <li>UI/UX Design</li>
                    <li>Cloud Infrastructure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
