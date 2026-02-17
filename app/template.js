"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ ease: "easeOut", duration: 0.25 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
