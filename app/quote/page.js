"use client";

import PricingCalculator from "@/components/PricingCalculator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="p-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back to Hub
        </Link>
      </div>
      <PricingCalculator />
    </main>
  );
}
