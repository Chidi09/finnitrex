"use client";

import { Suspense } from "react";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Users,
  Target,
  Globe,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
const TalentGlobe = dynamic(() => import("@/components/TalentGlobe"));
import { motion } from "framer-motion";

// Animation Variants
const containerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVar = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={containerVar}
      className="min-h-screen bg-black text-gray-300 font-sans relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <motion.div variants={itemVar}>
          <Link
            href="/"
            className="flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors w-fit mb-8 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            Return to Hub
          </Link>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVar} className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              ABOUT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
                FINNITREX
              </span>
            </h1>
            <p className="text-sm text-emerald-500 font-mono tracking-widest border-l-2 border-lime-500 pl-4">
              UK LIMITED COMPANY | ESTABLISHED 2024
            </p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
            {/* Left: 3D Globe */}
            <motion.div
              variants={itemVar}
              className="space-y-6 flex flex-col h-full"
            >
              <div className="bg-gray-900/30 rounded-3xl border border-gray-800 overflow-hidden backdrop-blur-sm w-full h-[500px] relative group hover:border-lime-500/30 transition-colors duration-500">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center w-full h-full text-lime-400 font-mono animate-pulse">
                      LOADING GLOBAL NETWORK...
                    </div>
                  }
                >
                  <TalentGlobe />
                </Suspense>
              </div>
            </motion.div>

            {/* Right: Company Info */}
            <motion.div variants={itemVar} className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Building2 className="text-lime-400" /> Corporate Profile
                </h2>
                <div className="prose prose-invert text-gray-400 leading-relaxed">
                  <p className="mb-4">
                    Finnitrex Solutions Ltd is a premier UK technology firm
                    specializing in{" "}
                    <span className="text-white">
                      advanced software architecture
                    </span>
                    , AI integration, and digital ecosystem development.
                  </p>
                  <p>
                    From our headquarters in London, we deploy enterprise-grade
                    solutions for the education, finance, and manufacturing
                    sectors. Our hybrid model combines rigorous UK governance
                    with a{" "}
                    <span className="text-lime-400">
                      borderless talent network
                    </span>
                    , allowing us to scale rapid development teams without
                    compromising on security or compliance.
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/30 rounded-2xl p-8 border border-gray-800 hover:bg-gray-900/50 transition-colors">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="text-emerald-400" /> Registered HQ
                </h3>
                <div className="space-y-1 text-gray-300 font-mono text-sm">
                  <p className="text-white font-bold text-base">
                    483 Green Lanes
                  </p>
                  <p>London, N13 4BS</p>
                  <p>United Kingdom</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mission & Values Cards */}
          <motion.div
            variants={containerVar}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            {[
              {
                title: "Our Mission",
                icon: Target,
                color: "text-lime-400",
                border: "border-lime-500/30",
                bg: "bg-lime-900/10",
                desc: "To architect digital ecosystems that combine cutting-edge AI, static-first performance, and enterprise-grade security.",
              },
              {
                title: "Global Talent",
                icon: Users,
                color: "text-emerald-400",
                border: "border-emerald-500/30",
                bg: "bg-emerald-900/10",
                desc: "We are building processes to recruit top-tier overseas talent, ensuring a diverse and skilled global team.",
              },
              {
                title: "Compliance",
                icon: ShieldCheck,
                color: "text-white",
                border: "border-gray-700",
                bg: "bg-gray-800/30",
                desc: "GDPR-compliant architecture by design. We maintain banking-grade encryption standards for all data pipelines.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={itemVar}
                className={`p-8 rounded-2xl border ${card.border} ${card.bg} backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300`}
              >
                <card.icon className={`w-10 h-10 ${card.color} mb-6`} />
                <h3 className="text-xl font-bold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Services Overview */}
          <motion.div
            variants={itemVar}
            className="bg-gradient-to-br from-gray-900/50 to-black rounded-3xl border border-gray-800 p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decorative grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Globe className="text-lime-400" /> Technical Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-lime-400 mb-2">
                    LMS & Software
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Next.js architectures for instant availability.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-400 mb-2">
                    Fintech Data
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Predictive AI modeling & visualization.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-lime-400 mb-2">
                    Future Labs
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Robotics & Computer Vision research.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-400 mb-2">
                    Enterprise Integration
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Cloud infrastructure & API development.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-lime-400 text-black font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(190,242,100,0.3)]"
                >
                  START PROJECT
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
