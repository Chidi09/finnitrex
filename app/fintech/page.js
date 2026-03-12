import { Suspense } from "react";
import dynamic from "next/dynamic";
import FAQSection from "@/components/FAQSection";
import { TrendingUp, ShieldAlert, Activity, Lock } from "lucide-react";

const DataViz3D = dynamic(() => import("@/components/DataViz3D"));

export const metadata = {
  title: "Fintech & Predictive Analytics",
  description:
    "AI-powered fintech solutions including predictive analytics, market flux simulation, RegTech compliance automation, AML/KYC systems, and risk management. Real-time data processing with 99.4% predictive accuracy.",
  keywords: [
    "fintech solutions",
    "predictive analytics",
    "AI trading algorithms",
    "RegTech compliance",
    "AML KYC automation",
    "risk management software",
    "market analysis AI",
    "financial data analytics",
    "UK fintech company",
  ],
  openGraph: {
    title: "Fintech & Predictive Analytics | Finnitrex",
    description:
      "AI-powered fintech solutions for investment firms and corporate finance. Predictive analytics with 99.4% accuracy.",
    url: "https://finnitrex.com/fintech",
  },
  alternates: {
    canonical: "https://finnitrex.com/fintech",
  },
};

const heroMetrics = [
  {
    value: "99.4%",
    label: "Predictive accuracy",
    detail: "Validated through historical backtesting, scenario replay, and signal calibration.",
  },
  {
    value: "4.2M/s",
    label: "Data points processed",
    detail: "High-volume ingestion across trading feeds, operations telemetry, and compliance events.",
  },
  {
    value: "<12ms",
    label: "Decision latency",
    detail: "Low-latency pipelines designed for live monitoring, intervention, and portfolio response.",
  },
];

const capabilityCards = [
  {
    icon: TrendingUp,
    eyebrow: "Predictive analytics",
    title: "Signal models built for live financial movement.",
    description:
      "We shape forecasting systems around market volatility, portfolio drift, and pricing anomalies so teams can act earlier with clearer confidence bands.",
    tone: "bg-white text-stone-900 dark:bg-white/[0.04] dark:text-stone-100",
  },
  {
    icon: Lock,
    eyebrow: "Compliance automation",
    title: "RegTech workflows that stay audit-ready under pressure.",
    description:
      "AML, KYC, and control monitoring are designed as operational surfaces with traceability, policy logic, and regulator-facing documentation built in.",
    tone: "bg-[#f4f8f4] text-stone-900 dark:bg-emerald-950/25 dark:text-stone-100",
  },
  {
    icon: ShieldAlert,
    eyebrow: "Risk management",
    title: "Modelled downside before exposure compounds.",
    description:
      "Risk thresholds, alerting logic, and exception handling are tuned to each institution so teams can move quickly without losing discipline.",
    tone: "bg-[#faf7f1] text-stone-900 dark:bg-amber-950/20 dark:text-stone-100",
  },
];

const operatingLayers = [
  {
    title: "Market intelligence",
    detail: "Pattern recognition, alternative data, and sentiment inputs combined into a single forecasting layer.",
  },
  {
    title: "Regulatory posture",
    detail: "Continuous AML/KYC monitoring, auditable rule changes, and FCA/GDPR-aligned data handling.",
  },
  {
    title: "Decision operations",
    detail: "Intervention pathways, risk tolerances, and escalation logic mapped directly to operating teams.",
  },
];

const systemsNarrative = [
  {
    eyebrow: "For investment firms",
    title: "Forecasting that reads like institutional infrastructure, not speculative AI.",
    description:
      "The architecture is designed to support execution desks, treasury teams, and corporate finance units that need faster interpretation of market movement without sacrificing model oversight.",
  },
  {
    eyebrow: "For compliance teams",
    title: "Controls sit beside analytics instead of behind them.",
    description:
      "We treat compliance as part of the product layer: explainable workflows, documented thresholds, secure data boundaries, and governance states that remain legible during audit review.",
  },
  {
    eyebrow: "For risk leaders",
    title: "Every metric is framed around response quality.",
    description:
      "The page shifts the conversation from dashboard theatre toward practical operating signals: latency, confidence, throughput, and exception management across volatile conditions.",
  },
];

const fintechFAQs = [
  {
    question: "What is the latency on your predictive analytics engine?",
    answer:
      "Our core engine typically operates with <12ms latency for data ingestion and processing. We utilize edge computing and optimized gRPC pipelines to ensure real-time analysis of market fluctuations.",
  },
  {
    question:
      "How do you ensure data privacy and regulatory compliance (GDPR/FCA)?",
    answer:
      "We implement 'Privacy by Design'. All PII (Personally Identifiable Information) is encrypted at rest (AES-256) and in transit (TLS 1.3). Our RegTech modules are specifically updated to adhere to current FCA and GDPR requirements regarding data sovereignty and audit trails.",
  },
  {
    question: "Can the AI model adapt to our specific risk parameters?",
    answer:
      "Yes. We don't use a 'black box' model. We fine-tune our base models on your historical data and specific risk tolerance levels. You maintain control over the sensitivity thresholds for fraud detection and automated trading signals.",
  },
  {
    question: "What data sources does the system integrate with?",
    answer:
      "Our system is agnostic. It can ingest data from standard financial feeds (Bloomberg, Reuters), legacy banking APIs, and alternative data sources (sentiment analysis, blockchain ledgers) simultaneously.",
  },
];

export default function FintechPage() {
  return (
    <main className="bg-white text-stone-900 transition-colors dark:bg-zinc-950 dark:text-stone-100">
      <section className="border-b border-stone-200/80 dark:border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end lg:gap-16 lg:py-28">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              Fintech systems / predictive analytics
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-stone-950 dark:text-white md:text-7xl lg:text-[5.4rem] lg:leading-[0.93]">
              Financial intelligence designed to feel calm, technical, and regulator-ready.
            </h1>
            <div className="mt-8 grid gap-6 text-sm leading-7 text-stone-600 dark:text-stone-300 md:grid-cols-2">
              <p>
                Finnitrex builds predictive analytics systems for institutions
                that need credible modeling, fast operational signals, and a
                clearer line between insight, compliance, and action.
              </p>
              <p>
                We combine live market simulation, measurable model
                performance, and governance controls in one product surface for
                investment, compliance, and risk teams.
              </p>
            </div>
          </div>

          <aside className="border border-stone-200 bg-[#f8f4ed] p-8 dark:border-white/10 dark:bg-white/[0.04] md:p-10">
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

      <section className="bg-white py-16 dark:bg-zinc-900/70 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:px-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
          <article className="flex min-h-[34rem] flex-col justify-between bg-white p-8 shadow-[0_24px_70px_rgba(28,25,23,0.08)] dark:bg-white/[0.04] dark:shadow-none md:p-12">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                <span className="rounded-full bg-[#dde7e1] px-3 py-1 text-[#28483f] dark:bg-emerald-950/40 dark:text-emerald-100">
                  Market flux simulator
                </span>
                <span>Real-time AI prediction modeling</span>
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-white md:text-4xl">
                A live visualization retained as supporting proof, not the whole story.
              </h2>
              <div className="mt-8 grid gap-8 text-sm leading-7 text-stone-600 dark:text-stone-300 md:grid-cols-2">
                <p>
                  The simulation demonstrates how Finnitrex interprets movement
                  across multiple financial signals in real time, pairing market
                  fluctuation with predictive confidence and intervention logic.
                </p>
                <p>
                  The interface stays technical while presenting the model in a
                  format that is easier for stakeholders to review, compare, and
                  trust.
                </p>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-[2rem] border border-stone-200 bg-[#fcfaf6] dark:border-white/10 dark:bg-[#111310]">
              <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 dark:border-white/10">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                    Simulation viewport
                  </p>
                  <p className="mt-2 text-sm font-semibold text-stone-950 dark:text-white">
                    Market flux simulator</p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                  <Activity className="h-4 w-4" />
                  <span>Live signal study</span>
                </div>
              </div>

              <div className="relative h-[24rem] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(217,228,220,0.75),transparent_50%),linear-gradient(180deg,#f7f3eb_0%,#efe7db_100%)] dark:bg-[linear-gradient(180deg,rgba(20,24,23,0.95),rgba(10,12,12,0.98))]">
                <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(246,242,233,0.15),rgba(246,242,233,0.02))] dark:bg-[linear-gradient(180deg,rgba(245,241,232,0.08),rgba(12,18,16,0.08))]" />
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                      Loading market simulation
                    </div>
                  }
                >
                  <DataViz3D />
                </Suspense>
              </div>
            </div>
          </article>

          <aside className="border border-stone-200 bg-[#f8f5ef] p-8 dark:border-white/10 dark:bg-white/[0.03] md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              Operating layers
            </p>
            <div className="mt-8 space-y-6">
              {operatingLayers.map((item) => (
                <div
                  key={item.title}
                  className="border-t border-stone-200 pt-6 first:border-t-0 first:pt-0 dark:border-white/10"
                >
                  <p className="text-lg font-semibold tracking-[-0.03em] text-stone-950 dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-5 border-b border-stone-200 pb-10 dark:border-white/10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                Core capabilities
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white md:text-5xl">
                Predictive systems, compliance controls, and risk logic composed into one enterprise offer.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-300">
              The offer is organized around the three areas financial teams ask
              us to prove first: forecasting quality, compliance coverage, and
              response to risk.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {capabilityCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className={`flex min-h-[17rem] flex-col justify-between p-8 ${card.tone}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                  <div className="mt-12">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-60">
                      {card.eyebrow}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 opacity-80">
                      {card.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200/80 bg-[#faf7f2] py-16 dark:border-white/10 dark:bg-zinc-900 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              Systems view
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white md:text-5xl">
              A fintech platform evaluated through operating architecture.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-stone-600 dark:text-stone-300">
              Each section shows how the platform supports institutional
              decision-making, governance, and deployment readiness across live
              financial operations.
            </p>
          </div>

          <div className="space-y-5">
            {systemsNarrative.map((item, index) => (
              <article
                key={item.title}
                className={`border border-stone-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.03] md:p-10 ${
                  index === 1 ? "md:ml-8" : ""
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                  {item.eyebrow}
                </p>
                <h3 className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <FAQSection
          title="Fintech Systems FAQ"
          description="Technical specifications regarding our AI models, compliance architecture, and deployment posture."
          items={fintechFAQs}
          variant="editorial"
        />
      </div>
    </main>
  );
}
