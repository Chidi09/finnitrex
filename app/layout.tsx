import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PWARegister from "@/components/PWARegister";
import Navbar from "@/components/Navbar";
import {
  OrganizationSchema,
  LocalBusinessSchema,
  WebsiteSchema,
} from "@/components/StructuredData";

// Dynamically import heavy client-only components so they are code-split
// and never block the initial server-rendered HTML.
const CustomCursor = dynamic(() => import("@/components/CustomCursor"));
const MobileDock   = dynamic(() => import("@/components/MobileDock"));

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://finnitrex.com"),
  title: {
    default: "Finnitrex | AI, LMS & Software Solutions",
    template: "%s | Finnitrex",
  },
  description:
    "Advanced technological solutions specializing in LMS architecture, predictive analytics, AI integration, and custom software development. UK-based technology company providing enterprise-grade solutions for education, finance, and manufacturing sectors.",
  keywords: [
    "LMS", "Learning Management System", "AI solutions", "predictive analytics",
    "fintech", "software development", "Next.js", "custom software",
    "UK technology company", "data analytics", "computer vision", "optics",
    "SaaS development", "enterprise software", "education technology",
  ],
  authors:   [{ name: "Finnitrex Solutions" }],
  creator:   "Finnitrex Solutions",
  publisher: "Finnitrex Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://finnitrex.com",
    siteName: "Finnitrex",
    title: "Finnitrex | AI, LMS & Software Solutions",
    description:
      "Advanced technological solutions specializing in LMS architecture, predictive analytics, AI integration, and custom software development.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Finnitrex - Advanced Technology Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finnitrex | AI, LMS & Software Solutions",
    description: "Advanced technological solutions for LMS, AI, and custom software development.",
    images: ["/og-image.png"],
    creator: "@finnitrex",
  },
  alternates: { canonical: "https://finnitrex.com" },
  manifest: "/site.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Finnitrex" },
  // Next.js injects these as <link> tags automatically — no need to duplicate them in <head>
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png",  sizes: "512x512" },
    ],
  },
  category: "Technology",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Finnitrex" />
        {/* JSON-LD structured data */}
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebsiteSchema />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-black text-white antialiased selection:bg-lime-500/30 selection:text-white`}>
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID || ""} />

        {/* Desktop custom cursor — client-only, lazy loaded */}
        <CustomCursor />

        {/* Global top navigation */}
        <Navbar />

        {/* Main content — pt-14 offsets the fixed 56px navbar */}
        <div className="min-h-screen pt-14">{children}</div>

        <Footer />

        {/* Mobile bottom dock — client-only, lazy loaded */}
        <MobileDock />

        <CookieBanner />
        <PWARegister />
      </body>
    </html>
  );
}
