// lib/content/projects.ts

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "variantrade",
    title: "VarianTrade",
    category: "FinTech",
    description:
      "Comprehensive AI-Powered Trading & Betting Platform with real-time arbitrage detection, built solo from the ground up.",
    techStack: ["Angular", "Python", "Go", "PostgreSQL"],
    liveUrl: "https://variantrades.com",
    featured: true,
  },
  {
    slug: "nigerian-china-invest",
    title: "Nigerian China Invest",
    category: "E-Commerce",
    description:
      "Robust investment portal with trade opportunities and cart-based ordering systems, architected and developed solo.",
    techStack: ["React", "Vite", "Golang", "Supabase"],
    liveUrl: "https://www.nigerianchinainvestmentclub.com",
    featured: true,
  },
  {
    slug: "grandkonsul-gardens",
    title: "Grandkonsul Gardens",
    category: "Real Estate",
    description:
      "Premium real estate platform with smooth animations and SEO optimization, built solo using React.",
    techStack: ["React", "Tailwind", "Framer Motion"],
    liveUrl: "https://grandkonsulgardens.com",
    featured: true,
  },
  {
    slug: "cliftonville-gardens",
    title: "Cliftonville Gardens",
    category: "Healthcare",
    description:
      "Modern supported living community website with mobile-first design, developed solo.",
    techStack: ["React", "Vite", "Tailwind"],
    liveUrl: "https://www.cliftonvillegardens.com",
    githubUrl: "https://github.com/Chidi09/Clifton-ville-website",
    featured: true,
  },
  {
    slug: "cliftonville-farms",
    title: "Cliftonville Farms",
    category: "Agriculture",
    description:
      "Digital presence for agricultural operations showcasing sustainable produce, built solo.",
    techStack: ["React", "Vite", "Tailwind"],
    liveUrl: "https://www.cliftonvillefarms.com",
    featured: true,
  },
  {
    slug: "fluxpay-crypto-gateway",
    title: "FluxPay",
    category: "Web3",
    description:
      "Automated crypto payment gateway supporting USDT, Solana, BTC, and ETH with unique wallet generation per transaction, solo-developed.",
    techStack: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/Chidi09/fluxpay-repo-link-if-any",
    featured: false,
  },
  {
    slug: "smart-theming-engine",
    title: "Smart Theming Engine",
    category: "AI Tool",
    description:
      "AI-powered engine analyzing visuals to generate automatic UI themes, built solo.",
    techStack: ["Python", "AI/ML"],
    githubUrl: "https://github.com/Chidi09/smart-theming-engine",
    featured: false,
  },
  {
    slug: "campus-manager",
    title: "Campus Manager",
    category: "Management",
    description:
      "Comprehensive system for managing campus events and tasks, developed solo using Flask.",
    techStack: ["Python", "Flask"],
    githubUrl: "https://github.com/Chidi09/campus-event-manager",
    featured: false,
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectCategories(): string[] {
  return [...new Set(projects.map((p) => p.category))];
}

export function getProjectScreenshotUrl(liveUrl: string): string {
  const encodedUrl = encodeURIComponent(liveUrl);
  // waitFor=6000 gives JS-heavy SPAs time to fully render past loading screens.
  // force=true bypasses Microlink's cache so stale/blank captures aren't served.
  // We keep embed=screenshot.url so the API returns the image directly as a src-safe URL.
  return `https://api.microlink.io/?url=${encodedUrl}&screenshot=true&meta=false&embed=screenshot.url&waitFor=6000&force=true&viewport.width=1280&viewport.height=800`;
}
