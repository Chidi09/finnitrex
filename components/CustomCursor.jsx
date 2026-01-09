"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only run on desktop to save mobile performance
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  return (
    <>
      {/* 1. Main Dot */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
        transition={{ type: "tween", ease: "backOut", duration: 0 }}
      />
      
      {/* 2. Trailing Ring */}
      <motion.div
        className={`hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999] transition-colors duration-200 ${
          isClicking ? "border-cyan-400 bg-cyan-400/20" : "border-white/50"
        }`}
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16, scale: isClicking ? 0.8 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.8 }}
      />
    </>
  );
}
