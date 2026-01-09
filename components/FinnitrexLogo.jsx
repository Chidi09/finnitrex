"use client";

import { motion } from "framer-motion";

export default function FinnitrexLogo({ className = "w-10 h-10", textVisible = true }) {
  // 1. The Glitch Animation Keyframes
  const glitch = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      textShadow: [
        "2px 0 #00ffff, -2px 0 #ff00ff", // Split channels
        "0px 0 transparent",            // Normal
        "-2px 0 #00ffff, 2px 0 #ff00ff", // Reverse split
        "0px 0 transparent"
      ],
      transition: { 
        duration: 0.2, // Fast glitch
        repeat: 4,     // Repeat a few times on load
        repeatType: "mirror",
        repeatDelay: 3 // Glitch again every 3 seconds
      }
    }
  };

  return (
    <div className="flex items-center gap-3 select-none">
      
      {/* THE ICON: Abstract F + Data Node */}
      <div className={`${className} relative`}>
        <motion.svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
        >
          {/* Static SVG Paths (removed draw animation for stability if you want instant show) */}
          <path d="M 25 10 L 45 10 L 45 90 L 25 90 Z" stroke="#06b6d4" strokeWidth="4" fill="rgba(6,182,212, 0.2)" />
          <path d="M 50 10 L 90 10 L 75 40 L 50 40 Z" stroke="#3b82f6" strokeWidth="4" fill="rgba(59,130,246, 0.2)" />
          <path d="M 50 50 L 80 50 L 70 70 L 50 70 Z" stroke="#8b5cf6" strokeWidth="4" fill="rgba(139,92,246, 0.2)" />
          
          {/* The AI Node Pulse */}
          <motion.circle
            cx="35"
            cy="25"
            r="4"
            fill="white"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.svg>
      </div>

      {/* THE TEXT: Glitch Effect */}
      {textVisible && (
        <div className="flex flex-col justify-center">
          <motion.h1 
            variants={glitch}
            initial="hidden"
            animate="visible"
            className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-none font-mono"
          >
            FINNITREX
          </motion.h1>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] font-mono tracking-[0.3em] text-cyan-500 leading-none mt-1"
          >
            SYSTEMS
          </motion.span>
        </div>
      )}
    </div>
  );
}
