import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://finnitrex.com"),
  title: {
    default: "Finnitrex | AI, LMS & Software Solutions",
    template: "%s | Finnitrex"
  },
  description: "Advanced technological solutions specializing in LMS architecture, predictive analytics, AI integration, and custom software development. UK-based technology company providing enterprise-grade solutions for education, finance, and manufacturing sectors.",
  keywords: [
    "LMS",
    "Learning Management System",
    "AI solutions",
    "predictive analytics",
    "fintech",
    "software development",
    "Next.js",
    "custom software",
    "UK technology company",
    "data analytics",
    "computer vision",
    "optics",
    "SaaS development",
    "enterprise software",
    "education technology"
  ],
  authors: [{ name: "Finnitrex Solutions" }],
  creator: "Finnitrex Solutions",
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
    description: "Advanced technological solutions specializing in LMS architecture, predictive analytics, AI integration, and custom software development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finnitrex - Advanced Technology Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finnitrex | AI, LMS & Software Solutions",
    description: "Advanced technological solutions for LMS, AI, and custom software development.",
    images: ["/og-image.png"],
    creator: "@finnitrex",
  },
  alternates: {
    canonical: "https://finnitrex.com",
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-black text-white antialiased selection:bg-cyan-500/30 selection:text-white`}
      >
        {/* ENHANCEMENT: Custom Cursor */}
        <CustomCursor />
        
        {/* Main Content */}
        <div className="min-h-screen">
          {children}
        </div>

        {/* ENHANCEMENT: High-Tech Footer */}
        <Footer />

        {/* ENHANCEMENT: Mobile App Dock */}
        <MobileDock />
      </body>
    </html>
  );
}
