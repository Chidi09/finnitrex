"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PricingCalculator from "@/components/PricingCalculator";

export default function QuotePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(91,143,61,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(177,159,123,0.14),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(244,241,236,0.92))] dark:bg-[radial-gradient(circle_at_top_left,rgba(74,120,53,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(103,93,74,0.2),transparent_26%),linear-gradient(180deg,rgba(16,20,15,0.95),rgba(14,16,13,0.98))]" />

      <div className="mx-auto w-full max-w-7xl px-6 pb-6 pt-8 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <ArrowLeft size={18} />
          Back to Hub
        </Link>
      </div>

      <PricingCalculator />
    </main>
  );
}
