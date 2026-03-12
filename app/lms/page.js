import ContactTerminal from "@/components/ContactTerminal";
import FAQSection from "@/components/FAQSection";
import {
  ArrowUpRight,
  CheckCircle2,
  Database,
  Gauge,
  GraduationCap,
  Layers3,
  Network,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";

export const metadata = {
  title: "Learning Management System Development",
  description:
    "Custom LMS architecture and development services. Enterprise-grade education platforms with student tracking, certification systems, video delivery, and SCORM compliance. Built with Next.js for optimal performance.",
  keywords: [
    "LMS development",
    "Learning Management System",
    "education platform",
    "e-learning software",
    "student tracking system",
    "certification platform",
    "SCORM compliant LMS",
    "custom LMS UK",
    "enterprise education software",
  ],
  openGraph: {
    title: "Learning Management System Development | Finnitrex",
    description:
      "Custom LMS architecture with student tracking, certification, and video delivery. Enterprise-grade education platforms.",
    url: "https://finnitrex.com/lms",
  },
  alternates: {
    canonical: "https://finnitrex.com/lms",
  },
};

const lmsFAQs = [
  {
    question: "Can the LMS handle over 50,000 concurrent users?",
    answer:
      "Yes. Unlike off-the-shelf plugins (like LearnDash), our custom architectures are built on serverless infrastructure (Next.js + AWS Lambda/Vercel). This allows the system to auto-scale instantly to handle traffic spikes during exam periods or onboarding waves without degradation.",
  },
  {
    question: "Is the platform SCORM and xAPI compliant?",
    answer:
      "Absolutely. We build compliant data wrappers that allow you to import existing course content from tools like Articulate Storyline or Adobe Captivate. We also support LTI 1.3 for secure integration with other educational tools.",
  },
  {
    question: "How do you handle data migration from legacy systems?",
    answer:
      "We use custom ETL (Extract, Transform, Load) pipelines to sanitize and migrate your student records, course history, and certification data. We typically run a parallel system during the transition to ensure zero data loss.",
  },
  {
    question: "Can we integrate this with our internal HRIS or ERP?",
    answer:
      "Yes. Integration is a core part of our 'Engineering as Marketing' philosophy. We build custom API endpoints to sync user data with systems like SAP, Salesforce, Workday, or HubSpot automatically.",
  },
  {
    question: "Do you support video hosting and streaming?",
    answer:
      "We implement adaptive bitrate streaming (HLS) using providers like Mux or AWS Elemental MediaConvert. This ensures secure playback that adjusts to the user's internet speed, preventing buffering even on mobile connections.",
  },
];

const heroMetrics = [
  {
    value: "50k+",
    label: "Concurrent learners",
    detail: "Autoscaling for enrollment spikes, mandatory training cycles, and timed assessments.",
  },
  {
    value: "SCORM + xAPI",
    label: "Standards-ready course delivery",
    detail: "Legacy packages, modern tracking, and reporting continuity in one platform.",
  },
  {
    value: "LTI 1.3",
    label: "Connected learning ecosystem",
    detail: "Secure launch flows for external tools, content libraries, and campus partners.",
  },
];

const dashboardNav = ["Overview", "Catalog", "Live sessions", "Assessments"];

const dashboardModules = [
  {
    title: "Faculty rollout / active",
    meta: "1,248 learners this week",
    progress: "68% completion",
  },
  {
    title: "Compliance academy",
    meta: "SCORM and xAPI reporting synced",
    progress: "96% content parity",
  },
  {
    title: "Partner portal",
    meta: "LTI 1.3 launch enabled",
    progress: "12 external tools live",
  },
];

const dashboardSignals = [
  "Adaptive streaming profile available across desktop and mobile cohorts.",
  "Migration ledger tracks historical records before cutover and after validation.",
  "HRIS and ERP sync windows are monitored with role-aware provisioning rules.",
];

const architecturePillars = [
  {
    eyebrow: "01 / platform load",
    title: "Infrastructure designed for real institutional peaks",
    description:
      "We shape the platform around exam-day demand, enterprise onboarding surges, and large faculty rollouts so the product remains calm under 50,000-plus concurrent users.",
    icon: Gauge,
  },
  {
    eyebrow: "02 / content fidelity",
    title: "Standards support without editorial compromise",
    description:
      "SCORM, xAPI, and LTI 1.3 are handled as first-class architecture decisions, allowing existing learning assets and external tools to move into a cleaner product experience.",
    icon: ShieldCheck,
  },
  {
    eyebrow: "03 / system continuity",
    title: "Migration and integration planned as one programme",
    description:
      "ETL pipelines, HRIS and ERP connectors, and certification history are mapped together so launch readiness includes operational data integrity, not just interface polish.",
    icon: Network,
  },
];

const capabilityCards = [
  {
    title: "Migration and ETL",
    description:
      "Parallel migrations, validation ledgers, and record normalization for learner histories, enrolments, and certifications.",
    icon: Database,
    tone: "bg-[#e2ece9] text-[#17362f] dark:bg-emerald-950/35 dark:text-emerald-100",
  },
  {
    title: "HRIS and ERP sync",
    description:
      "Provisioning flows and status updates coordinated with systems such as Workday, SAP, Salesforce, or internal directories.",
    icon: Users,
    tone: "bg-white text-stone-900 dark:bg-white/[0.04] dark:text-stone-100",
  },
  {
    title: "Adaptive streaming",
    description:
      "Secure HLS delivery designed for bandwidth shifts, mobile playback, and enterprise video governance.",
    icon: Video,
    tone: "bg-[#e4ebf4] text-[#22364a] dark:bg-sky-950/35 dark:text-sky-100",
  },
  {
    title: "Assessment and certification",
    description:
      "Structured quiz delivery, completion evidence, and certificate logic aligned to regulated training environments.",
    icon: GraduationCap,
    tone: "bg-[#efe7dc] text-[#4e3b27] dark:bg-amber-950/30 dark:text-amber-100",
  },
  {
    title: "Modular product layers",
    description:
      "Dashboard, catalog, live learning, and reporting surfaces designed to work as one platform rather than disconnected features.",
    icon: Layers3,
    tone: "bg-[#dfe6df] text-[#26352c] dark:bg-lime-950/30 dark:text-lime-100",
  },
  {
    title: "Measured rollout",
    description:
      "Pilot cohorts, stakeholder training, and proof dashboards that give programme owners confidence before full launch.",
    icon: CheckCircle2,
    tone: "bg-[#e8e0ea] text-[#413148] dark:bg-fuchsia-950/25 dark:text-fuchsia-100",
  },
];

export default function LMSPage() {
  return (
    <main className="bg-[#f6f2e9] text-stone-900 transition-colors dark:bg-zinc-950 dark:text-stone-100">
      <section className="border-b border-stone-200/80 dark:border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-end lg:gap-16 lg:py-28">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              LMS architecture / custom platforms
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-stone-950 dark:text-white md:text-7xl lg:text-[5.4rem] lg:leading-[0.93]">
              Custom LMS platforms that feel composed at institutional scale.
            </h1>
            <div className="mt-8 grid gap-6 text-sm leading-7 text-stone-600 dark:text-stone-300 md:grid-cols-2">
              <p>
                Finnitrex designs learning platforms for organisations that need
                more than a plugin stack: product-grade learner dashboards,
                controlled migrations, and infrastructure that stays responsive
                during critical delivery windows.
              </p>
              <p>
                The page leads with Finnitrex&rsquo;s LMS consulting offer, then
                demonstrates how that capability becomes a credible platform
                surface: calm, editorial, and operationally ready from content
                delivery to integration governance.
              </p>
            </div>
          </div>

          <aside className="border border-stone-200 bg-[#ece5d8] p-8 dark:border-white/10 dark:bg-white/[0.04] md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              Delivery brief
            </p>
            <div className="mt-6 space-y-6">
              {heroMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="border-t border-stone-300 pt-5 first:border-t-0 first:pt-0 dark:border-white/10"
                >
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-white">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#efe9de] py-16 dark:bg-zinc-900/70 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-5 border-b border-stone-200 pb-10 dark:border-white/10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                Product-style proof
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white md:text-5xl">
                A dashboard-led view of how a premium LMS can be organised.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-300">
              The composition combines a clear sidebar, a composed learning
              overview, and supporting programme cards to show how enterprise
              education products can feel both structured and premium.
            </p>
          </div>

          <div className="mt-10 overflow-hidden border border-stone-200 bg-[#f8f5ef] shadow-[0_30px_80px_rgba(28,25,23,0.08)] dark:border-white/10 dark:bg-[#111310] dark:shadow-none">
            <div className="grid lg:grid-cols-[250px_minmax(0,1fr)]">
              <aside className="border-b border-stone-200 bg-[#f1ece3] p-6 dark:border-white/10 dark:bg-white/[0.03] lg:border-b-0 lg:border-r">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                    Current workspace
                  </p>
                  <p className="mt-3 text-sm font-semibold text-stone-950 dark:text-white">
                    Enterprise Learning Suite
                  </p>
                </div>

                <div className="mt-8 space-y-2" aria-label="Dashboard sections preview">
                  {dashboardNav.map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm ${
                        index === 0
                          ? "bg-white text-stone-950 shadow-sm dark:bg-white/10 dark:text-white"
                          : "text-stone-600 dark:text-stone-300"
                      }`}
                    >
                      <span>{item}</span>
                      {index === 0 ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="mt-10 border-t border-stone-200 pt-6 dark:border-white/10">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                    <span>Rollout progress</span>
                    <span>64%</span>
                  </div>
                  <div
                    className="mt-3 h-2 overflow-hidden rounded-full bg-stone-200 dark:bg-white/10"
                    role="progressbar"
                    aria-label="Rollout progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={64}
                    aria-valuetext="64 percent complete"
                  >
                    <div className="h-full w-[64%] rounded-full bg-stone-900 dark:bg-stone-100" />
                  </div>
                </div>
              </aside>

              <div className="p-6 md:p-8 lg:p-10">
                <header className="border-b border-stone-200 pb-8 dark:border-white/10">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                    <span className="rounded-full bg-[#dfe7e2] px-3 py-1 text-[#29453e] dark:bg-emerald-950/40 dark:text-emerald-100">
                      Institutional dashboard
                    </span>
                    <span>Multi-tenant enrolment</span>
                  </div>
                  <h3 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-white md:text-4xl">
                    Learning operations, learner experience, and reporting
                    architecture shown in one surface.
                  </h3>
                  <div className="mt-8 grid gap-4 text-sm leading-7 text-stone-600 dark:text-stone-300 md:grid-cols-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                        Audience
                      </p>
                      <p className="mt-2">Enterprise workforce and academic cohorts</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                        Delivery mode
                      </p>
                      <p className="mt-2">Self-paced, live, and certification-led pathways</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                        Governance
                      </p>
                      <p className="mt-2">Role-aware access, analytics, and integration observability</p>
                    </div>
                  </div>
                </header>

                <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
                  <article className="flex min-h-[20rem] flex-col justify-between bg-[#e8e0d4] p-8 dark:bg-[#171a16] md:p-10">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                        Program overview
                      </p>
                      <h4 className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-white md:text-3xl">
                        A custom learner home that balances progress, live
                        sessions, compliance signals, and next actions.
                      </h4>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-3">
                      {dashboardModules.map((module) => (
                        <div
                          key={module.title}
                          className="border border-stone-300 bg-[#f7f2ea] p-5 dark:border-white/10 dark:bg-white/[0.04]"
                        >
                          <p className="text-sm font-semibold text-stone-950 dark:text-white">
                            {module.title}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">
                            {module.meta}
                          </p>
                          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                            {module.progress}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>

                  <aside className="border border-stone-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                      Architecture signals
                    </p>
                    <div className="mt-6 space-y-4">
                      {dashboardSignals.map((signal) => (
                        <div
                          key={signal}
                          className="border-t border-stone-200 pt-4 first:border-t-0 first:pt-0 dark:border-white/10"
                        >
                          <p className="text-sm leading-7 text-stone-600 dark:text-stone-300">
                            {signal}
                          </p>
                        </div>
                      ))}
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              Architecture proof
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white md:text-5xl">
              The selling points are framed as programme architecture, not feature noise.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-stone-600 dark:text-stone-300">
              Each section below translates a familiar LMS requirement into a
              calmer proof point: capacity, standards, migration continuity, and
              operational integration.
            </p>
          </div>

          <div className="space-y-5">
            {architecturePillars.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <article
                  key={pillar.title}
                  className={`border border-stone-200 bg-[#f0ece6] p-8 dark:border-white/10 dark:bg-white/[0.03] md:p-10 ${
                    index === 1 ? "md:ml-8" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Icon className="mt-1 h-5 w-5 text-stone-500 dark:text-stone-300" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                        {pillar.eyebrow}
                      </p>
                      <h3 className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-white">
                        {pillar.title}
                      </h3>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 dark:text-stone-300">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200/80 bg-[#ede7de] py-16 dark:border-white/10 dark:bg-zinc-900 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-5 border-b border-stone-200 pb-10 dark:border-white/10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                Delivery capabilities
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white md:text-5xl">
                The platform layer is supported by migration, integration, and media operations.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-300">
              These cards reinforce the core Finnitrex LMS offer while matching
              the quieter, shared-shell presentation established across the rest
              of the site.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {capabilityCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className={`flex min-h-[16rem] flex-col justify-between p-8 ${card.tone}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                  <div className="mt-12">
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 opacity-80">
                      {card.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <FAQSection
          title="LMS Technical FAQ"
          description="Common architectural questions regarding our educational platforms."
          items={lmsFAQs}
          variant="editorial"
        />

        <div className="mx-auto mt-24 max-w-4xl">
          <ContactTerminal />
        </div>
      </div>
    </main>
  );
}
