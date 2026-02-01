// Blog content management
// This provides a lightweight blog system without external CMS dependencies

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: "engineering" | "insights" | "tutorials" | "announcements";
  readingTime: number;
  featured?: boolean;
  image?: string;
}

// Sample blog posts - in production, these could come from a CMS or MDX files
export const blogPosts: BlogPost[] = [
  {
    slug: "building-scalable-lms-with-nextjs",
    title: "Building Scalable Learning Management Systems with Next.js",
    description:
      "A deep dive into our architecture decisions for enterprise-grade LMS platforms, including static generation, caching strategies, and real-time features.",
    content: `
## Introduction

At Finnitrex, we've built multiple Learning Management Systems that serve thousands of concurrent users. This article shares our architectural approach using Next.js.

## Why Next.js for LMS?

Next.js offers several advantages for educational platforms:

1. **Static Generation** - Course catalogs and marketing pages load instantly
2. **Incremental Static Regeneration** - Content updates without full rebuilds
3. **API Routes** - Backend logic co-located with frontend
4. **Edge Functions** - Low-latency authentication and personalization

## Core Architecture Components

### Content Delivery

We structure course content as a hierarchical data model:

- Courses → Modules → Lessons → Content Blocks
- Each level can be independently cached
- Video content served via CDN with adaptive bitrate

### Student Progress Tracking

Real-time progress synchronization using:

- Optimistic UI updates for immediate feedback
- Background sync with conflict resolution
- Offline support via Service Workers

### Assessment Engine

Our assessment system supports:

- Multiple question types (MCQ, coding challenges, essays)
- Automated grading with rubric-based AI assistance
- Proctoring integration for high-stakes exams

## Performance Optimizations

Key metrics we target:

- **LCP < 1.5s** for course pages
- **TTI < 2s** on mobile devices
- **CLS < 0.1** for stable layouts

## Conclusion

Next.js provides the perfect foundation for building LMS platforms that scale. Contact us to discuss your education technology project.
    `,
    author: "Finnitrex Engineering",
    publishedAt: "2025-01-15",
    tags: ["Next.js", "LMS", "Architecture", "Education Technology"],
    category: "engineering",
    readingTime: 8,
    featured: true,
    image: "/blog/lms-architecture.png",
  },
  {
    slug: "ai-predictive-analytics-fintech",
    title: "Implementing AI Predictive Analytics for Financial Services",
    description:
      "How we achieve 99.4% predictive accuracy in market analysis using machine learning pipelines and real-time data processing.",
    content: `
## The Challenge

Financial institutions need real-time insights from massive data streams. Traditional analytics can't keep pace with market volatility.

## Our Approach

We built a multi-layer prediction system:

### Data Ingestion Layer

- Real-time market feeds processing 4.2M data points/second
- News sentiment analysis from 50+ sources
- Social media signal extraction

### Feature Engineering

Key features we extract:

1. Technical indicators (RSI, MACD, Bollinger Bands)
2. Sentiment scores with temporal decay
3. Cross-market correlation matrices
4. Volatility regime classification

### Model Architecture

Our ensemble approach combines:

- LSTM networks for sequence prediction
- Gradient boosting for feature-based signals
- Transformer models for news comprehension

### Risk Management

All predictions include:

- Confidence intervals
- Scenario analysis
- Maximum drawdown estimates

## Results

Backtesting across 5 years of data shows:

- 99.4% directional accuracy (daily)
- 12ms average latency
- Sharpe ratio improvement of 0.8

## Compliance Considerations

Our system is designed for:

- Full audit trails
- Explainable AI outputs
- Regulatory reporting automation

Contact us to explore how AI can enhance your financial analytics.
    `,
    author: "Finnitrex Analytics Team",
    publishedAt: "2025-01-10",
    tags: ["AI", "Fintech", "Predictive Analytics", "Machine Learning"],
    category: "engineering",
    readingTime: 10,
    featured: true,
    image: "/blog/fintech-ai.png",
  },
  {
    slug: "choosing-right-tech-stack-2025",
    title: "Choosing the Right Tech Stack for Enterprise Applications in 2025",
    description:
      "A practical guide to selecting technologies for scalable, maintainable enterprise software based on our experience across dozens of projects.",
    content: `
## Overview

Technology choices made today will impact your business for years. Here's our framework for making informed decisions.

## Frontend Considerations

### React/Next.js Ecosystem

Best for:
- Content-heavy applications
- SEO requirements
- Teams with React experience

### When to Consider Alternatives

- Real-time collaboration → Consider Svelte or Solid
- Mobile-first → React Native or Flutter
- Simple marketing sites → Astro or vanilla JS

## Backend Architecture

### Node.js (Our Default)

Advantages:
- JavaScript throughout the stack
- Excellent for I/O-bound workloads
- Vast package ecosystem

### When to Use Go or Rust

- CPU-intensive processing
- Systems programming
- Maximum performance requirements

## Database Selection

### PostgreSQL (Our Recommendation)

- ACID compliance
- JSON support for flexibility
- Excellent tooling (Drizzle ORM)

### When to Add Redis

- Session management
- Rate limiting
- Real-time features
- Caching layer

## Infrastructure

### Vercel for Most Projects

- Zero-config deployments
- Edge functions
- Built-in analytics

### Self-hosted for Compliance

- Sensitive data requirements
- Specific geographic restrictions
- Cost optimization at scale

## Conclusion

The "best" stack depends on your specific requirements. We help clients navigate these decisions based on their unique constraints.
    `,
    author: "Finnitrex Solutions",
    publishedAt: "2025-01-05",
    tags: ["Tech Stack", "Architecture", "Best Practices", "Enterprise"],
    category: "insights",
    readingTime: 6,
    image: "/blog/tech-stack.png",
  },
];

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogPost["category"]): BlogPost[] {
  return blogPosts
    .filter((post) => post.category === category)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts
    .filter((post) => post.tags.includes(tag))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getAllCategories(): BlogPost["category"][] {
  return ["engineering", "insights", "tutorials", "announcements"];
}
