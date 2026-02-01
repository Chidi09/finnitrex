import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Technical Insights & Industry Trends",
  description:
    "Expert insights on AI, LMS development, fintech innovation, software architecture, and Next.js best practices from Finnitrex engineering team.",
  keywords: [
    "AI blog",
    "LMS development",
    "fintech insights",
    "software architecture",
    "Next.js tutorials",
    "technical blog",
    "engineering insights",
  ],
  openGraph: {
    title: "Finnitrex Blog | Technical Insights",
    description:
      "Expert insights on AI, LMS, fintech, and software development",
    url: "https://finnitrex.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Technical Blog
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl">
          Insights on AI, LMS architecture, fintech innovation, and software
          engineering from the Finnitrex team.
        </p>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-400">
            We're preparing insightful content on AI integration, LMS best
            practices, fintech security patterns, and Next.js optimization.
          </p>
        </div>
      </div>
    </div>
  );
}
