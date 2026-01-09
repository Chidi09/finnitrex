"use client";

import { motion } from "framer-motion";

export default function FinnitrexLogo({ className = "w-10 h-10", textVisible = true }) {
  // Animation variants for the drawing effect
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.2, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: i * 0.2, duration: 0.01 }
      }
    })
  };

  return (
    <div className="flex items-center gap-3 select-none">
      
      {/* THE ICON: Abstract F + Data Node */}
      <div className={`${className} relative`}>
        <motion.svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" // Neon glow
        >
          {/* 1. The Vertical Spine (Structure) */}
          <motion.path
            d="M 25 10 L 45 10 L 45 90 L 25 90 Z"
            stroke="#06b6d4" // Cyan-500
            strokeWidth="4"
            fill="rgba(6,182,212, 0.2)"
            variants={draw}
            custom={0}
            initial="hidden"
            animate="visible"
          />

          {/* 2. The Upper Fin (Fintech Growth) */}
          <motion.path
            d="M 50 10 L 90 10 L 75 40 L 50 40 Z"
            stroke="#3b82f6" // Blue-500
            strokeWidth="4"
            fill="rgba(59,130,246, 0.2)"
            variants={draw}
            custom={1}
            initial="hidden"
            animate="visible"
          />

          {/* 3. The Middle Fin (Optics/Focus) */}
          <motion.path
            d="M 50 50 L 80 50 L 70 70 L 50 70 Z"
            stroke="#8b5cf6" // Purple-500
            strokeWidth="4"
            fill="rgba(139,92,246, 0.2)"
            variants={draw}
            custom={2}
            initial="hidden"
            animate="visible"
          />
          
          {/* 4. The AI Node (The Brain) */}
          <motion.circle
            cx="35"
            cy="25"
            r="4"
            fill="white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          />
        </motion.svg>
      </div>

      {/* THE TEXT: Brand Name */}
      {textVisible && (
        <div className="flex flex-col justify-center">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold tracking-tight text-white leading-none"
          >
            FINNITREX
          </motion.span>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-[10px] font-mono tracking-[0.2em] text-cyan-500 leading-none mt-1"
          >
            SOLUTIONS
          </motion.span>
        </div>
      )}
    </div>
  );
}
