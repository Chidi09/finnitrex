import { Suspense } from "react";
import ProjectPricingWizard from "@/components/ProjectPricingWizard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lime-900/20 via-black to-black -z-10" />
      
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 z-10">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
          <ArrowLeft size={18} /> Abort
        </Link>
        <div className="text-right">
          <h1 className="text-xl font-bold text-white tracking-widest">NEW PROJECT</h1>
          <p className="text-xs text-lime-400 font-mono">SECURE CONNECTION ESTABLISHED</p>
        </div>
      </div>

      {/* The Wizard */}
      <div className="w-full z-10">
        <Suspense fallback={<div className="flex items-center justify-center h-full text-lime-400 font-mono">LOADING WIZARD...</div>}>
          <ProjectPricingWizard />
        </Suspense>
      </div>

    </main>
  );
}
