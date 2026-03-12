import { Suspense } from "react";
import ProjectPricingWizard from "@/components/ProjectPricingWizard";

export default function StartPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(91,143,61,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(177,159,123,0.14),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.8),rgba(244,241,236,0.92))]" />

      <section className="border-b border-[var(--border)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.75fr)] lg:items-end lg:gap-16 lg:px-10 lg:py-20">
          <div className="max-w-4xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
              Project start
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl lg:text-6xl lg:leading-[1.02]">
              Scope the engagement with clarity before delivery begins.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
              Use the pricing wizard to define the system, shape the scope, and
              generate an estimate grounded in practical delivery assumptions.
            </p>
          </div>

          <aside className="border border-[var(--border)] bg-[color:rgba(255,255,255,0.74)] p-6 shadow-[0_24px_60px_rgba(28,25,23,0.06)] backdrop-blur dark:bg-white/[0.04] dark:shadow-none sm:p-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              What to expect
            </p>
            <div className="mt-6 space-y-5 text-sm leading-7 text-[var(--muted)]">
              <p>
                A structured flow for selecting the core system, setting scope,
                and aligning budget with timeline.
              </p>
              <p>
                Instant pricing guidance with room for a negotiated offer where
                needed.
              </p>
              <p>
                A premium estimate experience designed to feel calm, direct, and
                credible from first step to final quote.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[var(--border)] bg-[color:rgba(255,255,255,0.72)] p-3 shadow-[0_30px_80px_rgba(28,25,23,0.08)] backdrop-blur sm:p-5 lg:p-6 dark:bg-white/[0.04] dark:shadow-none">
          <div className="rounded-[1.6rem] border border-[color:rgba(0,0,0,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(244,241,236,0.42))] p-4 sm:p-6 dark:border-white/10 dark:bg-transparent">
            <div className="mb-6 flex flex-col gap-4 border-b border-[color:rgba(0,0,0,0.08)] pb-6 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                  Guided estimate
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-3xl">
                  Build the brief, then review the commercial shape.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
                Answer a few practical questions, review the commercial shape,
                and move into delivery with a clearer brief.
              </p>
            </div>

            <div className="w-full">
              <Suspense
                fallback={
                  <div className="flex min-h-[24rem] items-center justify-center rounded-[1.5rem] border border-dashed border-[var(--border)] bg-white/60 px-6 text-center text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)] dark:bg-white/[0.03]">
                    Loading wizard...
                  </div>
                }
              >
                <ProjectPricingWizard />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
