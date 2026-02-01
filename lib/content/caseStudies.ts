// lib/content/caseStudies.ts

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    label: string;
  }[];
  techStack: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  heroImage: string;
  date: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "legacy-fintech-migration-nextjs",
    title: "Migrating Legacy Fintech to Next.js 14 Zero Downtime",
    client: "Sterling Pay",
    industry: "FinTech",
    description:
      "Complete architectural overhaul of a 10-year-old monolithic banking application.",
    challenge:
      "The client's legacy Angular codebase took 8s to load, causing a 40% drop-off rate. They needed to migrate to a modern stack without disrupting $50M in daily transaction volume.",
    solution:
      "We utilized the 'Strangler Fig' pattern to migrate routes incrementally to Next.js 14. We built a parallel static-first frontend that communicated with their legacy backend via a new GraphQL mesh layer.",
    results: [
      { metric: "Downtime", value: "0ms", label: "During Migration" },
      { metric: "Lighthouse", value: "98/100", label: "Performance Score" },
      { metric: "Conversion", value: "+45%", label: "Lead Gen Increase" },
    ],
    techStack: ["Next.js 14", "GraphQL", "Node.js", "Docker", "AWS ECS"],
    testimonial: {
      quote:
        "We were terrified of touching the legacy code. Finnitrex not only migrated us safely but improved our site speed by 400% in the process.",
      author: "Marcus Thorne",
      role: "Operations Director, Sterling Pay",
    },
    heroImage: "/case-studies/migration.jpg",
    date: "2025-01-10",
  },
  {
    slug: "edutech-lms-transformation",
    title: "Scaling Remote Learning for 50k Students",
    client: "GlobalEdu Partners",
    industry: "EdTech",
    description:
      "Rebuilding a legacy LMS into a real-time, AI-driven learning platform.",
    challenge:
      "GlobalEdu's existing platform crashed under the load of pandemic-era traffic. They needed a solution that could handle 50,000 concurrent users while adding adaptive learning features.",
    solution:
      "We migrated their monolith to a Next.js micro-frontend architecture backed by a scalable serverless API. We implemented Redis caching strategies and edge functions for low-latency content delivery globally.",
    results: [
      { metric: "Uptime", value: "99.99%", label: "System Availability" },
      { metric: "Speed", value: "300%", label: "Faster Load Times" },
      { metric: "Scale", value: "50k+", label: "Concurrent Users" },
    ],
    techStack: ["Next.js", "PostgreSQL", "Redis", "AWS Lambda", "Tailwind"],
    testimonial: {
      quote:
        "Finnitrex didn't just fix our scaling issues; they completely modernized our student experience. The AI recommendations have increased course completion by 40%.",
      author: "Sarah Jenkins",
      role: "CTO, GlobalEdu Partners",
    },
    heroImage: "/case-studies/edutech.jpg",
    date: "2024-11-15",
  },
  {
    slug: "fintech-predictive-engine",
    title: "Real-time Fraud Detection System",
    client: "NeoBank Corp",
    industry: "FinTech",
    description:
      "Implementing machine learning pipelines to detect transaction anomalies in milliseconds.",
    challenge:
      "NeoBank was facing increasing fraud attempts that manual review couldn't catch. They needed an automated system to flag suspicious transactions without adding friction to legitimate payments.",
    solution:
      "We built a custom predictive engine using Python and TensorFlow, integrated via gRPC for high performance. The system analyzes 50+ data points per transaction in under 200ms.",
    results: [
      { metric: "Savings", value: "$2.4M", label: "Fraud Prevented/Year" },
      { metric: "Latency", value: "180ms", label: "Avg Analysis Time" },
      { metric: "Accuracy", value: "99.6%", label: "Detection Rate" },
    ],
    techStack: ["Python", "TensorFlow", "Node.js", "Kafka", "PostgreSQL"],
    heroImage: "/case-studies/fintech.jpg",
    date: "2024-09-20",
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
