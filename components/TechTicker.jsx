"use client";

import { motion } from "framer-motion";
import { Cpu, Code2, Database, Globe, Lock, Server, Terminal, Wifi } from "lucide-react";

const stack = [
  { name: "NEXT.JS 14", icon: Globe },
  { name: "REACT NATIVE", icon: Code2 },
  { name: "POSTGRESQL", icon: Database },
  { name: "TENSORFLOW", icon: Cpu },
  { name: "ZEPTOMAIL", icon: Wifi },
  { name: "TAILWIND", icon: Terminal },
  { name: "AWS CLOUD", icon: Server },
  { name: "AES-256", icon: Lock },
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
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {/* Double the list for seamless loop */}
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
