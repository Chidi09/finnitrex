import { Suspense } from "react";
import dynamic from "next/dynamic";
const ProceduralArm = dynamic(() => import("@/components/ProceduralArm"));
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Robotics & Automation R&D",
  description:
    "Future Labs robotics division researching automation solutions for logistics, manufacturing, and healthcare. Prototyping precision assembly arms, warehouse automation, and surgical robotics support systems.",
  keywords: [
    "robotics automation",
    "industrial robotics",
    "warehouse automation",
    "healthcare robotics",
    "manufacturing automation",
    "precision assembly",
    "logistics robotics",
    "UK robotics R&D",
    "collaborative robots",
  ],
  openGraph: {
    title: "Robotics & Automation R&D | Finnitrex",
    description:
      "Future Labs division prototyping next-generation robotics for logistics, manufacturing, and healthcare sectors.",
    url: "https://finnitrex.com/robotics",
  },
  alternates: {
    canonical: "https://finnitrex.com/robotics",
  },
};

export default function RoboticsPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Navigation Helper */}
      <div className="p-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors w-fit"
        >
          <ArrowLeft size={20} /> Back to Hub
        </Link>
      </div>

      <div className="flex-1 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-12">
        {/* LEFT COLUMN: Text Content */}
        <div className="space-y-8">
          <div>
            <div className="inline-block px-3 py-1 bg-lime-900/30 border border-lime-500/30 rounded-full text-lime-400 text-xs font-mono mb-4">
              FUTURE LABS // R&D DIVISION
            </div>
            <h2 className="text-lime-400 font-mono tracking-widest text-sm mb-2">
              SERVICE VECTOR: 02
            </h2>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Robotics <br />
              <span className="text-gray-600">(In Development)</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Our "Future Labs" division is currently prototyping
              robotics-driven automation.
              <br />
              <br />
              [cite_start]While our core focus remains Software & Data, we are
              actively researching hardware interfaces for logistics and
              healthcare [cite: 23] to prepare for the next generation of
              industrial AI.
            </p>
          </div>

          {/* Sector Applications (From Business Plan) */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b border-gray-800 pb-2">
              Target Industries
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                <CheckCircle2 className="text-lime-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">
                    Logistics & Supply Chain
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    [cite_start]Automated sorting and retrieval systems to
                    optimize warehouse efficiency[cite: 23].
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                <CheckCircle2 className="text-emerald-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">
                    Advanced Manufacturing
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    [cite_start]Precision assembly arms capable of working
                    alongside human operators safely[cite: 23].
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-900/50 border border-gray-800">
                <CheckCircle2 className="text-green-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Healthcare Robotics</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    [cite_start]Assistive robotics for surgery support and
                    automated laboratory processing[cite: 23].
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The 3D Interaction */}
        <div className="relative h-full w-full min-h-[500px] bg-gradient-to-b from-gray-900 to-black rounded-3xl border border-gray-800 overflow-hidden shadow-2xl shadow-lime-900/20">
          <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs text-lime-400 font-mono border border-lime-900">
            LIVE RENDER // INTERACTIVE
          </div>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full text-lime-400 font-mono">
                LOADING SYSTEM...
              </div>
            }
          >
            <ProceduralArm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
