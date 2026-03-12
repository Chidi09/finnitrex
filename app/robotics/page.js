import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Bot, CheckCircle2, Cpu, ShieldCheck } from "lucide-react";

const ProceduralArm = dynamic(() => import("@/components/ProceduralArm"));

const researchTracks = [
  {
    title: "Hardware interface research",
    description:
      "We are extending our software and data practice into robotics-ready control surfaces, sensing layers, and machine coordination patterns.",
    icon: Cpu,
    tone:
      "bg-[#e8ede7] text-[#17352e] dark:bg-emerald-950/40 dark:text-emerald-100",
  },
  {
    title: "Human-safe automation",
    description:
      "Every concept is framed around practical collaboration, traceable control logic, and environments where people and machines share workflows.",
    icon: ShieldCheck,
    tone:
      "bg-white text-stone-900 dark:bg-white/5 dark:text-stone-100",
  },
  {
    title: "Applied prototype lab",
    description:
      "The robotics lab remains R&D-first: validating concepts, simulation patterns, and deployment pathways before production commitments are made.",
    icon: Bot,
    tone:
      "bg-[#e3ebf2] text-[#213549] dark:bg-sky-950/40 dark:text-sky-100",
  },
];

const industryCards = [
  {
    title: "Logistics & Supply Chain",
    description:
      "Automated sorting and retrieval systems designed to improve warehouse flow, traceability, and operational efficiency.",
  },
  {
    title: "Advanced Manufacturing",
    description:
      "Precision assembly arms intended to work safely alongside human operators in repeatable, high-accuracy production tasks.",
  },
  {
    title: "Healthcare Robotics",
    description:
      "Assistive robotics for surgery support, clinical handling, and automated laboratory processing where reliability matters most.",
  },
];

const systemsCards = [
  {
    eyebrow: "01 // Control layer",
    title: "Software-led robotics architecture",
    description:
      "The lab builds from Finnitrex's core capability: dependable software systems. Robotics work is approached as orchestration, telemetry, and decision logic before hardware spectacle.",
  },
  {
    eyebrow: "02 // Perception layer",
    title: "Sensing, simulation, and environment awareness",
    description:
      "Computer vision, machine perception, and digital simulation help us test how robotic systems respond to dynamic spaces, constrained workflows, and safety-critical contexts.",
  },
  {
    eyebrow: "03 // Deployment layer",
    title: "Industry-specific pathway design",
    description:
      "Research is mapped against logistics, manufacturing, and healthcare so prototypes stay grounded in operational reality and future integration needs.",
  },
];

export const metadata = {
  title: "Robotics & Automation R&D",
  description:
    "Future Labs robotics division researching early-stage automation concepts for logistics, manufacturing, and healthcare. Exploring precision assembly, warehouse workflows, and clinical support systems through R&D.",
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
    <main className="bg-[#f6f2e9] text-stone-900 transition-colors dark:bg-zinc-950 dark:text-stone-100">
      <section className="border-b border-stone-200/80 dark:border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-10 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-28">
          <div className="lg:col-span-7">
            <p className="mb-8 inline-flex rounded-full bg-[#dde9e3] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#34564f] dark:bg-emerald-950/40 dark:text-emerald-100">
              Labs 01: Autonomous Systems
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-stone-950 dark:text-white md:text-7xl lg:text-[5.7rem] lg:leading-[0.92]">
              Robotics research for the next operating environment.
            </h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="text-lg leading-8 text-stone-600 dark:text-stone-300">
              Finnitrex Future Labs is prototyping robotics-driven automation
              as a disciplined extension of our software and data practice. Our
              core focus remains digital systems, while the lab explores
              hardware interfaces for logistics, manufacturing, and healthcare
              to prepare for the next generation of industrial AI.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-20 bg-stone-300 dark:bg-white/15" />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500 dark:text-stone-400">
                R&amp;D phase / active exploration
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#efebe6] py-16 dark:bg-zinc-900/70 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:px-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
          <article className="flex min-h-[32rem] flex-col justify-between bg-white p-8 shadow-[0_24px_60px_rgba(28,25,23,0.06)] dark:bg-white/[0.04] dark:shadow-none md:p-12">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                Research frame
              </p>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-white md:text-4xl">
                A lab page shaped like a working brief, not a showroom.
              </h2>
              <div className="mt-8 grid gap-8 text-sm leading-7 text-stone-600 dark:text-stone-300 md:grid-cols-2">
                <p>
                  The robotics practice is intentionally early-stage. We are
                  evaluating how precision motion, machine perception, and edge
                  intelligence can support real operational workflows without
                  losing safety, clarity, or maintainability.
                </p>
                <p>
                  Rather than presenting robotics as a separate identity, this
                  page positions it inside the broader Finnitrex narrative:
                  software-led systems design expanding toward physical
                  automation where it creates measurable value.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {researchTracks.map((track) => {
                const Icon = track.icon;

                return (
                  <article
                    key={track.title}
                    className={`flex min-h-[13rem] flex-col justify-between p-6 ${track.tone}`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                    <div className="mt-10">
                      <h3 className="text-lg font-semibold tracking-[-0.03em]">
                        {track.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 opacity-80">
                        {track.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </article>

          <aside className="relative overflow-hidden border border-stone-200 bg-[#f4f0ea] p-8 text-stone-900 dark:border-white/10 dark:bg-[#161d1b] dark:text-stone-100 md:p-10">
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-emerald-100/60">
                  Simulation viewport
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-white">
                  Procedural arm as a supporting study.
                </h2>
                <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-emerald-50/75">
                  The interactive model is retained as a reference artifact for
                  motion language and mechanism study, not as the page&rsquo;s primary
                  message.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white/70 dark:border-white/10 dark:bg-black/20">
                <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(246,242,233,0.36),rgba(244,240,234,0.1))] dark:bg-[linear-gradient(180deg,rgba(245,241,232,0.12),rgba(9,36,30,0.06))]" />
                <div className="mx-auto max-w-[24rem] opacity-70 saturate-[0.85]">
                  <Suspense
                    fallback={
                      <div className="flex h-[20rem] items-center justify-center text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-emerald-100/70">
                        Loading simulation
                      </div>
                    }
                  >
                    <ProceduralArm />
                  </Suspense>
                </div>
              </div>

              <div className="grid gap-4 text-sm text-stone-600 dark:text-emerald-50/75">
                <div className="border-t border-stone-200 pt-4 dark:border-white/10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-emerald-100/55">
                    Current posture
                  </p>
                  <p className="mt-2">R&amp;D-led exploration grounded in operational use cases.</p>
                </div>
                <div className="border-t border-stone-200 pt-4 dark:border-white/10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-emerald-100/55">
                    Core capability
                  </p>
                  <p className="mt-2">Control logic, sensing workflows, and software-defined automation.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              Target industries
            </p>
            <h2 className="max-w-lg text-4xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white md:text-5xl">
              Research tracks aligned to sectors where automation has practical consequence.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-stone-600 dark:text-stone-300">
              The lab stays focused on environments that benefit from precision,
              safety-aware systems, and measurable workflow improvement rather
              than speculative robotics theatre.
            </p>
          </div>

          <div className="grid gap-5">
            {industryCards.map((card) => (
              <article
                key={card.title}
                className="flex gap-4 border border-stone-200 bg-white p-6 shadow-[0_16px_40px_rgba(28,25,23,0.05)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-300" />
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.03em] text-stone-950 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200/80 py-20 dark:border-white/10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              Systems view
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white md:text-5xl">
              The page closes on the logic behind the lab.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-stone-600 dark:text-stone-300">
              This editorial structure is translated here into a quieter,
              shell-friendly sequence: context first, prototype second, and
              implementation logic last.
            </p>
          </div>

          <div className="space-y-5">
            {systemsCards.map((card, index) => (
              <article
                key={card.title}
                className={`border border-stone-200 bg-[#f0ece6] p-8 dark:border-white/10 dark:bg-white/[0.03] md:p-10 ${
                  index === 1 ? "md:ml-8" : ""
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                  {card.eyebrow}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-white">
                  {card.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
