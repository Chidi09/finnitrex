"use client";

import { motion } from "framer-motion";

export default function FinnitrexLogo({ className = "w-24 h-24", textVisible = true }) {
  return (
    <div className="flex flex-col items-center gap-4 select-none">
      
      {/* THE ICON: Neural Circuit */}
      <div className={`${className} relative`}>
        <motion.svg
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(190,242,100,0.5)]" // Slime Glow
        >
          <defs>
            <linearGradient id="slimeGradient" x1="0" y1="0" x2="300" y2="300">
              <stop offset="0%" stopColor="#bef264" /> {/* Lime-400 */}
              <stop offset="100%" stopColor="#10b981" /> {/* Emerald-500 */}
            </linearGradient>
            <radialGradient id="brainGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#bef264" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Outer Circuit Ring (Rotating) */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            style={{ transformOrigin: "150px 150px" }}
          >
             <circle cx="150" cy="150" r="120" stroke="url(#slimeGradient)" strokeWidth="2" strokeDasharray="10 10" opacity="0.6" />
             {/* Rotating Blip on Ring */}
             <circle cx="150" cy="30" r="4" fill="#bef264" />
          </motion.g>

          {/* 2. Neural Nodes & Connections */}
          <g opacity="0.9">
            {/* Lines */}
            <path d="M150 60 L150 115" stroke="#bef264" strokeWidth="2" />
            <path d="M210 100 L175 125" stroke="#bef264" strokeWidth="2" />
            <path d="M230 170 L185 160" stroke="#bef264" strokeWidth="2" />
            <path d="M190 230 L165 185" stroke="#bef264" strokeWidth="2" />
            <path d="M110 230 L135 185" stroke="#bef264" strokeWidth="2" />
            <path d="M70 170 L115 160" stroke="#bef264" strokeWidth="2" />
            <path d="M90 100 L125 125" stroke="#bef264" strokeWidth="2" />

            {/* Nodes */}
            {[
              { cx: 150, cy: 60 }, { cx: 210, cy: 100 }, { cx: 230, cy: 170 },
              { cx: 190, cy: 230 }, { cx: 110, cy: 230 }, { cx: 70, cy: 170 }, { cx: 90, cy: 100 }
            ].map((node, i) => (
              <motion.circle 
                key={i} 
                cx={node.cx} 
                cy={node.cy} 
                r="6" 
                fill="#1a2e05" 
                stroke="#bef264" 
                strokeWidth="2"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
              />
            ))}
          </g>
          
          {/* 3. Central AI Brain (Pulsing) */}
          <motion.g
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "150px 150px" }}
          >
            {/* Core Glow */}
            <circle cx="150" cy="150" r="40" fill="url(#brainGradient)" opacity="0.4" />
            {/* Hexagon Core Shape */}
            <path d="M 150 130 L 167 140 L 167 160 L 150 170 L 133 160 L 133 140 Z" stroke="#bef264" strokeWidth="3" fill="none" />
            <circle cx="150" cy="150" r="4" fill="#bef264" />
          </motion.g>

          {/* 4. Pulse Shockwave */}
          <motion.circle 
            cx="150" 
            cy="150" 
            r="50" 
            stroke="#bef264" 
            strokeWidth="1" 
            fill="none" 
            initial={{ r: 50, opacity: 0.5 }}
            animate={{ r: 100, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />

        </motion.svg>
      </div>

      {/* THE TEXT: Monospace Lime */}
      {textVisible && (
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold tracking-wider leading-none" style={{ fontFamily: 'monospace' }}>
            <span className="text-lime-400 drop-shadow-[0_0_8px_rgba(190,242,100,0.8)]">FINNI</span>
            <span className="text-white">TREX</span>
          </div>
          <div className="text-[10px] md:text-xs tracking-[0.4em] text-emerald-500 font-bold mt-2">
            INTELLIGENT SOLUTIONS
          </div>
        </div>
      )}
    </div>
  );
}
