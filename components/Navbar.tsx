"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useState } from "react";
import FinnitrexLogo from "@/components/FinnitrexLogo";

const navLinks = [
  { label: "Works", href: "/works" },
  { label: "LMS", href: "/software" },
  { label: "Data", href: "/fintech" },
  { label: "Labs", href: "/robotics" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";
  // Admin and portal pages get no navbar
  if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">

        {/* Left: back button on inner pages, logo on home */}
        <div className="flex items-center gap-3 min-w-0">
          {!isHome && (
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="flex items-center gap-1.5 text-gray-400 hover:text-lime-400 transition-colors shrink-0 text-sm font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Finnitrex home">
            <FinnitrexLogo className="w-7 h-7" />
            <span className="text-white font-black tracking-tight text-sm hidden sm:inline">
              FINNITREX
            </span>
          </Link>
        </div>

        {/* Centre: nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded transition-colors ${
                  active
                    ? "text-lime-400 bg-lime-500/10"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/start"
            className="hidden sm:inline-flex items-center px-4 py-1.5 bg-lime-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-lime-300 transition-colors"
          >
            Start Project
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2.5 text-sm font-mono uppercase tracking-wider rounded transition-colors ${
                    active
                      ? "text-lime-400 bg-lime-500/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/start"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-3 py-2.5 bg-lime-400 text-black text-sm font-bold uppercase tracking-wider text-center"
            >
              Start Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
