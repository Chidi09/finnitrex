import { db } from "@/lib/store";
import RevenueClient from "@/components/RevenueClient";
import { Shield } from "lucide-react";
import Link from "next/link";

export default async function RevenuePage() {
  const stats = await db.getRevenueStats();

  return (
    <main className="min-h-screen bg-black text-gray-300 font-sans selection:bg-lime-500/30 p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 bg-lime-900/20 rounded-lg border border-lime-500/20 hover:bg-lime-900/40 transition-colors">
            <Shield className="w-6 h-6 text-lime-400" />
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">
            REVENUE <span className="text-lime-400">INTELLIGENCE</span>
          </h1>
        </div>

        <RevenueClient stats={stats} />
      </div>
    </main>
  );
}