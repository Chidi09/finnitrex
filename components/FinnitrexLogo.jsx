"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FinnitrexLogo({ className = "w-16 h-16", textVisible = true }) { // Default size increased
  const [glitchActive, setGlitchActive] = useState(false);

  // Trigger glitch periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300); // Short burst
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // "Ethereal" RGB Split Animation
  const rgbVariant = {
    idle: { x: 0, opacity: 1, textShadow: "0px 0px 0px transparent" },
    glitch: {
      x: [0, -2, 2, -1, 1, 0],
      textShadow: [
        "2px 0 #bef264, -2px 0 #a855f7", // Lime & Purple
        "-2px 0 #a855f7, 2px 0 #bef264",
        "0px 0 transparent"
      ],
      transition: { duration: 0.2, ease: "linear" }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 select-none">
      
      {/* THE ICON: Scaled Up & New Colors */}
      <div className={`${className} relative`}>
        <motion.svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(190,242,100,0.4)]" // Lime Glow
        >
          {/* Main Spine (Structure) - Now Lime */}
          <path d="M 25 10 L 45 10 L 45 90 L 25 90 Z" stroke="#bef264" strokeWidth="4" fill="rgba(190,242,100, 0.1)" />
          
          {/* Top Fin (Fintech) - Now Emerald */}
          <path d="M 50 10 L 90 10 L 75 40 L 50 40 Z" stroke="#10b981" strokeWidth="4" fill="rgba(16,185,129, 0.1)" />
          
          {/* Mid Fin (Optics) - Now Violet */}
          <path d="M 50 50 L 80 50 L 70 70 L 50 70 Z" stroke="#8b5cf6" strokeWidth="4" fill="rgba(139,92,246, 0.1)" />
          
          {/* The Node Pulse - White Hot */}
          <motion.circle
            cx="35"
            cy="25"
            r="4"
            fill="white"
            animate={{ opacity: [1, 0.2, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.svg>
      </div>

      {/* THE TEXT: Big, Bold, Glitching */}
      {textVisible && (
        <div className="flex flex-col items-center md:items-start">
          <motion.h1 
            variants={rgbVariant}
            animate={glitchActive ? "glitch" : "idle"}
            className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none font-sans"
          >
            FINNITREX
          </motion.h1>
          
          {/* The "Systems" Subtext */}
          <motion.div 
            className="flex justify-between w-full mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
             <span className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-lime-400 font-bold uppercase">
               SYSTEMS
             </span>
             {/* Decorative blinking block */}
             <motion.div 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-2 bg-lime-400" 
             />
          </motion.div>
        </div>
      )}
    </div>
  );
}
