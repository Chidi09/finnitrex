import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Globe,
  MapPin,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

const profileCards = [
  {
    title: "Software architecture",
    description:
      "We design static-first and cloud-connected systems that stay fast, resilient, and maintainable as operations expand.",
    icon: Building2,
    tone:
      "bg-emerald-50 text-[#16342d] dark:bg-emerald-950/40 dark:text-emerald-100",
  },
  {
    title: "AI integration",
    description:
      "We connect predictive models, workflow automation, and practical analytics to real business processes rather than isolated demos.",
    icon: Target,
    tone:
      "bg-white text-stone-900 dark:bg-white/5 dark:text-stone-100",
  },
  {
    title: "Digital ecosystems",
    description:
      "We unify product experience, APIs, and delivery operations so each platform behaves like one coherent system.",
    icon: Globe,
    tone:
      "bg-sky-50 text-[#1d3145] dark:bg-sky-950/40 dark:text-sky-100",
  },
];

const principleCards = [
  {
    title: "Mission",
    description:
      "To architect digital ecosystems that combine cutting-edge AI, static-first performance, and enterprise-grade security.",
    icon: Target,
  },
  {
    title: "Global talent model",
    description:
      "Our delivery structure pairs UK oversight with a carefully assembled international network so specialist teams can scale without losing clarity.",
    icon: Users,
  },
  {
    title: "Compliance posture",
    description:
      "GDPR-conscious architecture, controlled delivery practices, and banking-grade encryption expectations shape how every engagement is built.",
    icon: ShieldCheck,
  },
];

const capabilities = [
  {
    title: "LMS and software platforms",
    description:
      "Next.js and modern web architectures designed for instant availability, editorial clarity, and sustainable product growth.",
  },
  {
    title: "Fintech data systems",
    description:
      "Predictive AI modelling, reporting layers, and visual analytics for finance teams that need decision-ready insight.",
  },
  {
    title: "Future labs",
    description:
      "Robotics and computer vision research translated into practical prototypes, internal tools, and longer-range innovation programs.",
  },
  {
    title: "Enterprise integration",
    description:
      "Cloud infrastructure, API design, and service orchestration that connect legacy environments with new operating models.",
  },
];

export default function AboutPage() {
  return (
      <main className="bg-white text-stone-900 transition-colors dark:bg-zinc-950 dark:text-stone-100">
      <section className="border-b border-stone-200/80 dark:border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.7fr)] lg:gap-20 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              About Finnitrex
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-stone-950 dark:text-white md:text-7xl lg:text-[5.5rem] lg:leading-[0.95]">
              Engineering digital systems with staying power.
            </h1>
          </div>

          <div className="flex flex-col justify-end gap-6 border-l border-stone-200 pl-6 text-sm leading-7 text-stone-600 dark:border-white/10 dark:text-stone-300">
            <p>
              Finnitrex Solutions Ltd is a UK limited company established in
              2024, building software architecture, AI-enabled products, and
              connected delivery systems for ambitious organisations.
            </p>
            <p>
              The company is structured for credibility first: calm execution,
              rigorous governance, and technical capability that can scale from
              a London base into international delivery teams.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16 dark:bg-zinc-900/70 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:px-10 lg:grid-cols-3">
          <article className="flex min-h-[22rem] flex-col justify-between border border-stone-200/80 bg-white p-8 shadow-[0_20px_60px_rgba(28,25,23,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-none md:col-span-2 md:p-12">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                Corporate profile
              </p>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-stone-950 dark:text-white md:text-4xl">
                Architectural discipline, modern delivery, and a company model
                built for trust.
              </h2>
            </div>

            <div className="mt-10 grid gap-8 text-sm leading-7 text-stone-600 dark:text-stone-300 md:grid-cols-2">
              <p>
                From our headquarters in London, we support organisations in
                education, finance, and manufacturing with enterprise-grade
                software design and implementation. Every engagement is shaped
                around performance, maintainability, and business fit.
              </p>
              <p>
                Our operating model combines UK oversight with a borderless
                talent network, allowing specialist teams to be assembled with
                speed while preserving compliance, delivery accountability, and
                technical consistency.
              </p>
            </div>
          </article>

          <article className="flex min-h-[22rem] flex-col justify-center border border-emerald-100 bg-emerald-50 p-8 text-stone-900 md:p-12 dark:border-white/10 dark:bg-emerald-950/40 dark:text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-800/70 dark:text-white/60">
              Established
            </p>
            <div className="mt-5 text-6xl font-semibold tracking-[-0.06em]">
              2024
            </div>
            <p className="mt-5 max-w-xs text-sm leading-7 text-stone-600 dark:text-emerald-50/80">
              A London-registered company building software, AI, and digital
              infrastructure with a focus on reliability, governance, and
              long-term operational value.
            </p>
          </article>

          {profileCards.map((card) => {
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
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              How we work
            </p>
            <h2 className="max-w-lg text-4xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white md:text-5xl">
              Calm structure for complex programmes.
            </h2>
          </div>

          <div className="space-y-10">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="border-l border-stone-300 pl-5 dark:border-white/15">
                <h3 className="text-lg font-semibold text-stone-950 dark:text-white">
                  Technical capability
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  We specialise in advanced software architecture, AI
                  integration, and digital ecosystem development, with delivery
                  shaped to support both immediate launches and future operating
                  scale.
                </p>
              </div>

              <div className="border-l border-stone-200 pl-5 dark:border-white/10">
                <h3 className="text-lg font-semibold text-stone-950 dark:text-white">
                  Delivery governance
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  Security expectations, compliance review, and clear ownership
                  are built into delivery from the start so teams can move
                  quickly without becoming careless.
                </p>
              </div>
            </div>

            <div className="border border-stone-200 bg-stone-50 p-8 dark:border-white/10 dark:bg-white/[0.04] md:p-10">
              <p className="max-w-2xl text-2xl font-medium tracking-[-0.04em] text-stone-950 dark:text-white md:text-3xl">
                &ldquo;The best systems feel composed long before they feel
                complex.&rdquo;
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                Finnitrex delivery principle
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200/80 bg-stone-50 py-16 dark:border-white/10 dark:bg-zinc-900 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[minmax(260px,0.7fr)_minmax(0,1.3fr)] lg:items-center lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              Registered HQ
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white md:text-5xl">
              London, with international reach.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-stone-600 dark:text-stone-300">
              Our headquarters anchors company governance and client trust,
              while our talent model lets us build globally distributed teams
              around the right expertise.
            </p>

            <div className="mt-8 space-y-4 text-sm text-stone-700 dark:text-stone-200">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-stone-500 dark:text-stone-400" />
                <span>483 Green Lanes, London, N13 4BS, United Kingdom</span>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-5 w-5 text-stone-500 dark:text-stone-400" />
                <span>UK limited company with London-based administrative oversight.</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {principleCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="flex h-full flex-col border border-stone-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <Icon className="h-5 w-5 text-stone-500 dark:text-stone-300" />
                  <h3 className="mt-8 text-lg font-semibold tracking-[-0.03em] text-stone-950 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-6 border-b border-stone-200 pb-10 dark:border-white/10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                Technical capabilities
              </p>
              <h2 className="text-4xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white md:text-5xl">
                Built to serve modern operations.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-300">
              Our capability set spans software delivery, data intelligence,
              emerging technology research, and enterprise integration.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden bg-stone-200 dark:bg-white/10 md:grid-cols-2">
            {capabilities.map((capability) => (
              <article
                key={capability.title}
                 className="bg-white p-8 dark:bg-zinc-950/80 md:p-10"
              >
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-stone-950 dark:text-white">
                  {capability.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 justify-start">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 border border-stone-200 bg-stone-50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-900 transition hover:border-stone-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
            >
              Meet the Team
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/start"
              className="inline-flex items-center gap-2 border border-stone-900 bg-stone-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-transparent hover:text-stone-900 dark:border-white dark:bg-white dark:text-zinc-950 dark:hover:bg-transparent dark:hover:text-white"
            >
              Start Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
