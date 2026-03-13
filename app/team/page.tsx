import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Crown, Layers3, Users } from "lucide-react";

export const metadata = {
  title: "Meet the Team | Finnitrex",
  description:
    "Meet the leadership behind Finnitrex: founder Divine Adoyi Samuel and lead developer Nneji Chidi Ben.",
  alternates: {
    canonical: "https://finnitrex.com/team",
  },
  openGraph: {
    title: "Meet the Team | Finnitrex",
    description:
      "Leadership and delivery roles behind Finnitrex's software, AI, and platform work.",
    url: "https://finnitrex.com/team",
  },
};

const teamMembers = [
  {
    name: "Divine Adoyi Samuel",
    role: "Founder",
    icon: Crown,
    summary:
      "Leads company direction, client relationships, and the broader operating vision behind Finnitrex's software, AI, and systems work.",
    focus: [
      "Company leadership and strategic direction",
      "Client discovery, scope definition, and partnership development",
      "Oversight of delivery posture, governance, and growth planning",
    ],
    details: [
      "London-registered Finnitrex leadership",
      "Client partnerships and commercial direction",
      "Delivery governance and company growth planning",
    ],
    image: "/team/divine-adoyi-samuel.jpeg",
    tone: "bg-emerald-50 border-emerald-100 text-stone-900 dark:bg-emerald-950/30 dark:border-white/10 dark:text-stone-100",
  },
  {
    name: "Nneji Chidi Ben",
    role: "Lead Developer",
    icon: Layers3,
    summary:
      "Software engineer focused on building digital ecosystems that combine high-performance engineering with refined product execution. As Finnitrex's lead developer, he has solo-architected and developed core platform infrastructure across fintech, AI, real estate, commerce, and operations products.",
    focus: [
      "System architecture and application delivery",
      "Frontend and backend implementation across product builds",
      "Technical quality, maintainability, and production readiness",
    ],
    details: [
      "B.Sc. Computer Science, Crawford University (2021 - 2025)",
      "Based in Lagos, Nigeria",
      "Specialises in Next.js, React, Angular, Python, Golang, PostgreSQL, and Supabase",
    ],
    spotlight: [
      "Built the Finnitrex UK platform solo with Next.js, React, and Tailwind",
      "Developed VarianTrade, an AI-powered trading and betting platform",
      "Shipped platforms across fintech, e-commerce, real estate, agriculture, and AI tools",
    ],
    image: "/team/nneji-chidi-ben.jpeg",
    tone: "bg-white border-stone-200 text-stone-900 dark:bg-white/[0.04] dark:border-white/10 dark:text-stone-100",
  },
];

const principles = [
  {
    title: "Leadership with delivery visibility",
    description:
      "Commercial direction and implementation stay connected so projects do not drift between vision and execution.",
  },
  {
    title: "Small core, serious build discipline",
    description:
      "Finnitrex keeps the leadership layer focused while shaping delivery around clear ownership, dependable scope, and practical systems thinking.",
  },
  {
    title: "Technical work tied to business outcomes",
    description:
      "The team is positioned around platform delivery that supports education, finance, and advanced technical operations with clarity and control.",
  },
];

export default function TeamPage() {
  return (
    <main className="bg-white text-stone-900 transition-colors dark:bg-zinc-950 dark:text-stone-100">
      <section className="border-b border-stone-200/80 dark:border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:items-end lg:gap-16 lg:py-28">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              Meet the team
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-stone-950 dark:text-white md:text-7xl lg:text-[5.4rem] lg:leading-[0.93]">
              The people shaping Finnitrex delivery.
            </h1>
          </div>

          <aside className="border border-stone-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.04] md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              Leadership layer
            </p>
            <div className="mt-6 space-y-5 text-sm leading-7 text-stone-600 dark:text-stone-300">
              <p>
                Finnitrex is represented through a focused leadership structure
                that keeps company direction and technical execution close to the
                work itself.
              </p>
              <p>
                The result is a clearer line between strategy, implementation,
                and delivery accountability across software, AI, and digital
                systems engagements.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-900/70 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            {teamMembers.map((member) => {
              const Icon = member.icon;

              return (
                <article key={member.name} className={`border p-8 md:p-10 ${member.tone}`}>
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">
                            {member.role}
                          </p>
                          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                            {member.name}
                          </h2>
                        </div>
                        <Icon className="h-6 w-6 shrink-0" strokeWidth={1.8} />
                      </div>

                      <p className="mt-8 max-w-2xl text-sm leading-7 opacity-85">
                        {member.summary}
                      </p>

                      <div className="mt-8 grid gap-6 md:grid-cols-2">
                        <div className="border-t border-current/10 pt-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">
                            Core focus
                          </p>
                          <ul className="mt-4 space-y-3 text-sm leading-7 opacity-85">
                            {member.focus.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="border-t border-current/10 pt-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">
                            Profile details
                          </p>
                          <ul className="mt-4 space-y-3 text-sm leading-7 opacity-85">
                            {member.details.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {member.spotlight ? (
                        <div className="mt-8 border-t border-current/10 pt-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">
                            Selected delivery highlights
                          </p>
                          <ul className="mt-4 space-y-3 text-sm leading-7 opacity-85">
                            {member.spotlight.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>

                    <div className="order-first lg:order-last">
                      {member.image ? (
                        <div className="overflow-hidden border border-current/10 bg-stone-100 dark:bg-white/5">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={600}
                            height={760}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[4/5] items-center justify-center border border-current/10 bg-white/50 text-center dark:bg-white/5">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-60">
                              {member.role}
                            </p>
                            <p className="mt-3 text-3xl font-semibold tracking-[-0.05em]">
                              {member.name
                                .split(" ")
                                .map((part) => part[0])
                                .join("")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-5 border-b border-stone-200 pb-10 dark:border-white/10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
                Working principles
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-stone-950 dark:text-white md:text-5xl">
                A leadership structure designed for clarity, not theatre.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-stone-600 dark:text-stone-300">
              This leadership view shows who sets direction, who leads implementation, and how both roles support dependable delivery.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="border border-stone-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <Users className="h-5 w-5 text-stone-500 dark:text-stone-300" />
                <h3 className="mt-8 text-xl font-semibold tracking-[-0.03em] text-stone-950 dark:text-white">
                  {principle.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-300">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 border border-stone-900 bg-stone-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-transparent hover:text-stone-900 dark:border-white dark:bg-white dark:text-zinc-950 dark:hover:bg-transparent dark:hover:text-white"
            >
              Start Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-stone-200 bg-stone-50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-900 transition hover:border-stone-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
            >
              About Finnitrex
              <BriefcaseBusiness className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
