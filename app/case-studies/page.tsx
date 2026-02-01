import { Metadata } from "next";

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Case Studies
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl">
          Discover how we've helped clients achieve measurable results through
          AI-powered solutions, custom LMS platforms, fintech innovations, and
          enterprise software development.
        </p>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-400">
            We're compiling detailed case studies showcasing our client
            successes in AI, LMS, fintech, and custom software development.
          </p>
        </div>
      </div>
    </div>
  );
}
