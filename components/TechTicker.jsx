"use client";

import { motion } from "framer-motion";
import { 
  Cpu, Code2, Database, Globe, Lock, Server, Terminal, Wifi, 
  Cloud, Layers, Zap, Box, GitBranch, Shield, Rocket, Workflow,
  Network, Activity, Package, Settings
} from "lucide-react";

const stack = [
  { name: "NEXT.JS 14", icon: Globe },
  { name: "REACT NATIVE", icon: Code2 },
  { name: "VUE.JS", icon: Layers },
  { name: "GOLANG", icon: Zap },
  { name: "PYTHON", icon: Code2 },
  { name: "FASTAPI", icon: Rocket },
  { name: "FASTIFY", icon: Rocket },
  { name: "POSTGRESQL", icon: Database },
  { name: "MONGODB", icon: Database },
  { name: "REDIS", icon: Database },
  { name: "TENSORFLOW", icon: Cpu },
  { name: "PYTORCH", icon: Cpu },
  { name: "OPENAI API", icon: Network },
  { name: "ANTHROPIC", icon: Network },
  { name: "AWS CLOUD", icon: Server },
  { name: "GCP", icon: Cloud },
  { name: "AZURE", icon: Cloud },
  { name: "DOCKER", icon: Box },
  { name: "KUBERNETES", icon: Settings },
  { name: "TERRAFORM", icon: Workflow },
  { name: "ZEPTOMAIL", icon: Wifi },
  { name: "RESEND", icon: Wifi },
  { name: "TAILWIND CSS", icon: Terminal },
  { name: "TYPESCRIPT", icon: Code2 },
  { name: "GRAPHQL", icon: GitBranch },
  { name: "REST API", icon: Network },
  { name: "AES-256", icon: Lock },
  { name: "JWT", icon: Shield },
  { name: "OAUTH 2.0", icon: Shield },
  { name: "WEBRTC", icon: Activity },
  { name: "WEBSOCKET", icon: Activity },
  { name: "NODE.JS", icon: Code2 },
  { name: "EXPRESS", icon: Code2 },
  { name: "NESTJS", icon: Package },
  { name: "PRISMA", icon: Database },
  { name: "STRIPE", icon: Shield },
  { name: "VERCEL", icon: Cloud },
  { name: "NETLIFY", icon: Cloud },
];

export default function TechTicker() {
  return (
    <div className="w-full bg-black border-y border-lime-900/30 py-8 overflow-hidden relative z-20">
      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

      <div className="flex">
        <motion.div
          className="flex gap-16 pr-16"
          animate={{ x: "-50%" }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {/* Triple the list for seamless loop */}
          {[...stack, ...stack, ...stack].map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div key={i} className="flex items-center gap-3 text-gray-500 hover:text-lime-400 transition-colors cursor-default whitespace-nowrap">
                <Icon size={18} />
                <span className="font-mono text-sm tracking-widest font-bold">{tech.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
