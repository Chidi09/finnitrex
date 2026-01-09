"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Activity, UserCircle } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { name: "Hub", path: "/", icon: Home },
  { name: "LMS", path: "/lms", icon: Layers },
  { name: "Data", path: "/fintech", icon: Activity },
  { name: "Labs", path: "/robotics", icon: UserCircle },
];

export default function MobileDock() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/90 flex justify-between items-center px-6 py-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link key={item.path} href={item.path} className="relative group flex flex-col items-center gap-1">
              {isActive && (
                <motion.div 
                  layoutId="dock-glow"
                  className="absolute -top-10 bg-cyan-500/20 w-12 h-12 rounded-full blur-xl"
                />
              )}
              
              <div className={`transition-all duration-300 ${isActive ? "text-cyan-400 -translate-y-1" : "text-gray-500"}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
              </div>
              
              {isActive && (
                <motion.div 
                  layoutId="dock-dot"
                  className="absolute -bottom-2 w-1 h-1 bg-cyan-400 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
