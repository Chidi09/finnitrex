import { Suspense } from "react";
import LMSStructure from "@/components/LMSStructure";
import ContactTerminal from "@/components/ContactTerminal";
import FAQSection from "@/components/FAQSection"; // Import the new component
import {
  ArrowLeft,
  Code,
  Server,
  Cpu,
  Globe,
  GraduationCap,
  Eye,
} from "lucide-react";
import Link from "next/link";

// ... [Keep existing metadata export] ...
export const metadata = {
  title: "Learning Management System Development",
  description:
    "Custom LMS architecture and development services. Enterprise-grade education platforms with student tracking, certification systems, video delivery, and SCORM compliance. Built with Next.js for optimal performance.",
  keywords: [
    "LMS development",
    "Learning Management System",
    "education platform",
    "e-learning software",
    "student tracking system",
    "certification platform",
    "SCORM compliant LMS",
    "custom LMS UK",
    "enterprise education software",
  ],
  openGraph: {
    title: "Learning Management System Development | Finnitrex",
    description:
      "Custom LMS architecture with student tracking, certification, and video delivery. Enterprise-grade education platforms.",
    url: "https://finnitrex.com/lms",
  },
  alternates: {
    canonical: "https://finnitrex.com/lms",
  },
};

const lmsFAQs = [
  {
    question: "Can the LMS handle over 50,000 concurrent users?",
    answer:
      "Yes. Unlike off-the-shelf plugins (like LearnDash), our custom architectures are built on serverless infrastructure (Next.js + AWS Lambda/Vercel). This allows the system to auto-scale instantly to handle traffic spikes during exam periods or onboarding waves without degradation.",
  },
  {
    question: "Is the platform SCORM and xAPI compliant?",
    answer:
      "Absolutely. We build compliant data wrappers that allow you to import existing course content from tools like Articulate Storyline or Adobe Captivate. We also support LTI 1.3 for secure integration with other educational tools.",
  },
  {
    question: "How do you handle data migration from legacy systems?",
    answer:
      "We use custom ETL (Extract, Transform, Load) pipelines to sanitize and migrate your student records, course history, and certification data. We typically run a parallel system during the transition to ensure zero data loss.",
  },
  {
    question: "Can we integrate this with our internal HRIS or ERP?",
    answer:
      "Yes. Integration is a core part of our 'Engineering as Marketing' philosophy. We build custom API endpoints to sync user data with systems like SAP, Salesforce, Workday, or HubSpot automatically.",
  },
  {
    question: "Do you support video hosting and streaming?",
    answer:
      "We implement adaptive bitrate streaming (HLS) using providers like Mux or AWS Elemental MediaConvert. This ensures secure playback that adjusts to the user's internet speed, preventing buffering even on mobile connections.",
  },
];

export default function SoftwarePage() {
  return (
    <main className="min-h-screen bg-black text-white pb-20">
      {/* ... [Keep existing Header, Hero, and Capabilities sections] ... */}

      <div className="p-6 border-b border-gray-900">
        <Link
          href="/"
          className="flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors w-fit"
        >
          <ArrowLeft size={20} /> Back to Hub
        </Link>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* HERO: Broad Software Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-lime-900/30 border border-lime-500/30 text-lime-400 text-xs font-mono">
              <Code size={12} /> FULL STACK ENGINEERING
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              Complex Systems. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-500 to-lime-600">
                Flawless Execution.
              </span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-lime-900 pl-6">
              We architect digital ecosystems. From high-performance static
              websites to enterprise-grade Learning Management Systems (LMS) and
              AI-driven data pipelines.
            </p>
          </div>
          <div className="w-full h-[500px]">
            {/* We use the structure to show "Complexity" */}
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full text-lime-400 font-mono">
                  LOADING ARCHITECTURE...
                </div>
              }
            >
              <LMSStructure />
            </Suspense>
          </div>
        </div>

        {/* CAPABILITIES MATRIX */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Server className="text-lime-400" /> Active Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* ... [Keep existing capability cards] ... */}

            {/* Card examples for context: */}
            <div className="p-6 rounded-xl bg-gray-900/40 border border-gray-700 hover:border-lime-500 transition-all group">
              <Globe className="w-8 h-8 text-lime-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">
                High-Performance Web
              </h3>
              <p className="text-sm text-gray-400">
                Static site generation (Next.js) for zero-latency loading and
                perfect SEO scoring.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900/40 border border-gray-700 hover:border-emerald-500 transition-all group">
              <GraduationCap className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">
                LMS Architectures
              </h3>
              <p className="text-sm text-gray-400">
                Custom education platforms with student tracking, certification,
                and video delivery.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900/40 border border-gray-700 hover:border-lime-300 transition-all group">
              <Cpu className="w-8 h-8 text-lime-300 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">
                LLM Integration
              </h3>
              <p className="text-sm text-gray-400">
                Fine-tuning language models for customer support bots and
                internal knowledge bases.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900/40 border border-gray-700 hover:border-green-500 transition-all group">
              <Eye className="w-8 h-8 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">
                Optics & Computer Vision
              </h3>
              <p className="text-sm text-gray-400">
                Automated image processing and visual data analytics for
                industrial application.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900/40 border border-gray-700 hover:border-yellow-500 transition-all group">
              <Server className="w-8 h-8 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">
                SaaS Development
              </h3>
              <p className="text-sm text-gray-400">
                Full-cycle software development including subscription
                management and cloud scaling.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-900/20 border border-gray-800 border-dashed relative overflow-hidden">
              <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
                <span className="text-xs font-mono bg-lime-900/50 text-lime-400 px-2 py-1 rounded border border-lime-800">
                  R&D / FUTURE ROADMAP
                </span>
              </div>
              <Cpu className="w-8 h-8 text-gray-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-500 mb-2">
                Robotics Automation
              </h3>
              <p className="text-sm text-gray-600">
                Prototyping next-gen hardware interfaces.
              </p>
            </div>
          </div>
        </div>

        {/* --- ADDED FAQ SECTION HERE --- */}
        <FAQSection
          title="LMS Technical FAQ"
          description="Common architectural questions regarding our educational platforms."
          items={lmsFAQs}
        />

        <div className="max-w-4xl mx-auto mt-24">
          <ContactTerminal />
        </div>
      </div>
    </main>
  );
}
