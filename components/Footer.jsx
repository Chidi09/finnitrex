import FinnitrexLogo from "@/components/FinnitrexLogo";
import {
  ShieldCheck,
  Lock,
  Globe,
  ArrowUpRight,
  MapPin,
  Phone,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--surface)] pb-32 pt-16 text-sm text-[var(--foreground)] md:pb-16 md:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(91,143,61,0.35),transparent)]" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1fr] lg:gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FinnitrexLogo className="h-12 w-12" />
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                  Finnitrex Solutions
                </p>
                <h2 className="mt-2 max-w-sm text-xl font-semibold tracking-tight text-[var(--foreground)]">
                  Applied AI, learning systems, and data products for regulated teams.
                </h2>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
              Editorial clarity in the interface, enterprise-grade delivery in the work. Established UK limited company serving education, finance, and advanced technology teams.
            </p>
            <div className="flex w-fit items-center gap-2 rounded-full border border-[color:rgba(91,143,61,0.22)] bg-[color:rgba(91,143,61,0.08)] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">
              <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              Operational
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="border-b border-[var(--border)] pb-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Compliance
            </h3>
            <ul className="space-y-3 text-[var(--muted)]">
              <li className="flex items-center gap-3">
                <Globe size={16} className="text-[var(--accent)]" />
                <span>Global Talent Visa route</span>
              </li>
              <li className="flex items-center gap-3">
                <Lock size={16} className="text-[var(--muted)]" />
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  GDPR / Privacy Policy
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <FileText size={16} className="text-[var(--muted)]" />
                <Link
                  href="/cookie-policy"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  Cookie Policy
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-[var(--muted)]" />
                <Link
                  href="/terms"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="border-b border-[var(--border)] pb-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  About Us <ArrowUpRight size={10} />
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  Get Quote <ArrowUpRight size={10} />
                </Link>
              </li>
              <li>
                <Link
                  href="/works"
                  className="flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  Our Works <ArrowUpRight size={10} />
                </Link>
              </li>
              <li>
                <Link
                  href="/lms"
                  className="flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  LMS & Software <ArrowUpRight size={10} />
                </Link>
              </li>
              <li>
                <Link
                  href="/fintech"
                  className="flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  Data Analytics <ArrowUpRight size={10} />
                </Link>
              </li>
              <li>
                <Link
                  href="/robotics"
                  className="flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  Future Labs <ArrowUpRight size={10} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="border-b border-[var(--border)] pb-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Registered Entity
            </h3>
            <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 text-[var(--muted)] shadow-[0_18px_40px_rgba(23,21,17,0.04)]">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <span>
                  483 Green Lanes
                  <br />
                  London, N13 4BS
                  <br />
                  United Kingdom
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-[var(--accent)]" />
                <span>+44 7521 511800</span>
              </div>

              <div className="border-t border-[var(--border)] pt-4 text-[11px] leading-5 text-[var(--muted)]">
                Trading as: Finnitrex
                <br />
                Associated entities: Axora, Fintrix
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-5 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Finnitrex Solutions Ltd.</p>
          <p>Calm systems. Measured delivery. Enterprise-ready interfaces.</p>
        </div>
      </div>
    </footer>
  );
}
