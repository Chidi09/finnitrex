"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Activity, UserCircle, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { name: "Hub", path: "/", icon: Home },
  { name: "Works", path: "/works", icon: Briefcase },
  { name: "LMS", path: "/lms", icon: Layers },
  { name: "Data", path: "/fintech", icon: Activity },
  { name: "Labs", path: "/robotics", icon: UserCircle },
];

export default function MobileDock() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) return null;

  return (
    <div
      className="fixed z-50 md:hidden"
      style={{
        left: "calc(env(safe-area-inset-left) + 1rem)",
        right: "calc(env(safe-area-inset-right) + 1rem)",
        bottom: "calc(env(safe-area-inset-bottom) + 1rem)",
      }}
    >
      <div className="rounded-[1.75rem] border border-[var(--border)]/80 bg-[var(--surface-elevated)]/92 px-3 py-2 shadow-[0_20px_48px_rgba(23,21,17,0.12)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || pathname.startsWith(item.path + "/");

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-center transition-colors ${
                  isActive ? "text-[var(--foreground)]" : "text-[var(--muted)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="dock-pill"
                    className="absolute inset-0 rounded-2xl border border-[color:rgba(91,143,61,0.16)] bg-[color:rgba(91,143,61,0.1)]"
                  />
                )}

                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className={`transition-transform duration-300 ${isActive ? "-translate-y-0.5" : ""}`}>
                    <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                  </div>
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.18em]">
                    {item.name}
                  </span>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="dock-dot"
                    className="absolute bottom-1.5 h-1 w-8 rounded-full bg-[var(--accent)]"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
