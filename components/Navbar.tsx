"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import FinnitrexLogo from "@/components/FinnitrexLogo";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Works", href: "/works" },
  { label: "LMS", href: "/lms" },
  { label: "Data", href: "/fintech" },
  { label: "Labs", href: "/robotics" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Admin and portal pages get no navbar
  if (pathname.startsWith("/admin") || pathname.startsWith("/portal")) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)]/80 bg-[var(--surface-elevated)]/88 text-[var(--foreground)] shadow-[0_12px_32px_rgba(23,21,17,0.05)] backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Finnitrex home">
            <FinnitrexLogo className="h-7 w-7" textVisible={false} />
            <div className="min-w-0">
              <span className="block text-sm font-black uppercase tracking-[0.18em] text-[var(--foreground)] sm:text-[0.8rem]">
                FINNITREX
              </span>
              <span className="hidden text-[0.65rem] uppercase tracking-[0.22em] text-[var(--muted)] lg:block">
                Applied intelligence studio
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-[var(--border)]/70 bg-[var(--surface)]/88 p-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors ${
                  active
                    ? "bg-[color:rgba(91,143,61,0.14)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <Link
            href="/start"
            className="hidden items-center rounded-full border border-[var(--border)] bg-[var(--foreground)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--surface-elevated)] transition-opacity hover:opacity-88 sm:inline-flex"
          >
            Start Project
          </Link>

          <button
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-elevated)] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--border)]/80 bg-[var(--surface-elevated)]/96 backdrop-blur-xl md:hidden">
          <nav id="mobile-navigation" className="container mx-auto flex flex-col gap-2 px-4 py-4">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] transition-colors ${
                    active
                      ? "border-[color:rgba(91,143,61,0.18)] bg-[color:rgba(91,143,61,0.1)] text-[var(--foreground)]"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                    Theme
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]">Adaptive light and dark surfaces</p>
                </div>
                <ThemeToggle />
              </div>
            </div>
            <Link
              href="/start"
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-full bg-[var(--foreground)] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[var(--surface-elevated)]"
            >
              Start Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
