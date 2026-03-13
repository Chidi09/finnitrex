// lib/content/projects.ts

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  challenge?: string;
  approach?: string;
  proofPoints?: string[];
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
    challenge:
      "Traders needed one dependable workspace for spotting arbitrage, acting fast, and tracking volatile market movement without juggling disconnected tools.",
    approach:
      "Built an end-to-end platform that combines AI-assisted signal handling, real-time market monitoring, and a backend tuned for fast decision support.",
    proofPoints: [
      "Unified trading and betting workflows inside one product experience.",
      "Surfaced real-time arbitrage opportunities for faster execution.",
      "Delivered the full stack solo across frontend, backend, and data layers.",
    ],
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
    challenge:
      "The business needed to present investment opportunities and product ordering in a single flow without making the platform feel fragmented or hard to trust.",
    approach:
      "Structured the experience around clear trade discovery, guided purchasing, and a reliable portal architecture that could support both content and transactions.",
    proofPoints: [
      "Connected investment discovery with cart-based ordering journeys.",
      "Used Supabase-backed workflows to support a dependable portal foundation.",
      "Handled product architecture and delivery as a solo build.",
    ],
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
    challenge:
      "The brand needed a polished property showcase that felt premium on first impression while still being discoverable through search.",
    approach:
      "Paired motion-led storytelling with a performance-conscious React build so the site could communicate quality without sacrificing visibility.",
    proofPoints: [
      "Created a premium browsing experience with intentional animation.",
      "Balanced visual polish with SEO-focused site structure.",
      "Shipped the experience solo from design-minded frontend through launch.",
    ],
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
    challenge:
      "The site needed to feel calm, credible, and easy to navigate for families and caregivers making high-trust care decisions on mobile.",
    approach:
      "Built a mobile-first experience with clear information hierarchy and an approachable interface tailored to supported living enquiries.",
    proofPoints: [
      "Prioritized mobile usability for on-the-go visitors and families.",
      "Designed the content flow around trust-building and clarity.",
      "Delivered the full website solo with a production-ready frontend stack.",
    ],
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
    challenge:
      "The farm needed a stronger digital presence that could present its sustainability story clearly and make the operation feel established online.",
    approach:
      "Created a straightforward marketing site focused on produce visibility, brand credibility, and an accessible introduction to the farm's operations.",
    proofPoints: [
      "Turned agricultural operations into a clear web-first brand presence.",
      "Highlighted sustainable produce in a format suited to broad audiences.",
      "Built and launched the site solo using a lightweight React stack.",
    ],
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
  // Microlink free-tier limits can return ERATE and break previews.
  // Thum.io returns a direct image URL suitable for <img src>.
  return `https://image.thum.io/get/width/1280/noanimate/${liveUrl}`;
}
