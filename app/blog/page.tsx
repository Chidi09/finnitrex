import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content/blog";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

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
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <div className="container mx-auto px-4 py-24">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Technical Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Deep dives into engineering challenges, architectural decisions, and
            the future of educational technology.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col h-full bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors duration-300"
            >
              {/* Image Placeholder - fallback if no image */}
              <div className="aspect-video w-full bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10" />
                {/* You can add <Image /> here later */}
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full capitalize">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-blue-400 group-hover:translate-x-1 transition-transform">
                    Read <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
