import dynamic from "next/dynamic";
import Link from "next/link";
import FinnitrexLogo from "@/components/FinnitrexLogo";
import ProjectScreenshot from "@/components/ProjectScreenshot";
import {
  getFeaturedProjects,
  getProjectScreenshotUrl,
} from "@/lib/content/projects";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Globe,
  LineChart,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";

const TechTicker = dynamic(() => import("@/components/TechTicker"));

const capabilities = [
  {
    title: "Global infrastructure",
    description:
      "UK-led delivery with distributed engineering teams, dependable rollout plans, and systems designed to perform across regions.",
    icon: Globe,
    tone:
      "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]",
  },
  {
    title: "Speed and precision",
    description:
      "Static-first architectures, clear delivery scopes, and practical engineering decisions that remove friction from launch to maintenance.",
    icon: Zap,
    tone:
      "border-[color:rgba(91,143,61,0.18)] bg-[var(--foreground)] text-[var(--surface-elevated)]",
  },
  {
    title: "Data fortified",
    description:
      "Compliance-aware data handling, banking-grade controls, and reporting pipelines built for financial and operational confidence.",
    icon: ShieldCheck,
    tone:
      "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]",
  },
  {
    title: "Integrated technology stack",
    description:
      "From LMS platforms to analytics and research-led automation, Finnitrex connects legacy complexity with modern product delivery.",
    icon: LineChart,
    tone:
      "border-[color:rgba(91,143,61,0.14)] bg-[color:rgba(91,143,61,0.08)] text-[var(--foreground)]",
  },
] as const;

const serviceLinks = [
  {
    title: "LMS and software",
    description:
      "Custom learning platforms, business software, and durable web systems built around operational clarity.",
    href: "/lms",
    icon: Terminal,
  },
  {
    title: "Data analytics",
    description:
      "Predictive reporting, fintech dashboards, and decision systems that turn raw signals into usable insight.",
    href: "/fintech",
    icon: LineChart,
  },
  {
    title: "Future labs",
    description:
      "Applied R&D across robotics, automation, and advanced technical experimentation for ambitious teams.",
    href: "/robotics",
    icon: Zap,
  },
] as const;

const scalePoints = [
  {
    title: "Sovereign compliance",
    description:
      "Delivery shaped around GDPR-conscious handling, auditability, and practical governance across regulated workflows.",
  },
  {
    title: "Hybrid orchestration",
    description:
      "Cloud services, internal platforms, and applied automation framed as one operating system for the business.",
  },
] as const;

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 3);
  const PrimaryCapabilityIcon = capabilities[0].icon;
  const AccentCapabilityIcon = capabilities[1].icon;
  const SecurityCapabilityIcon = capabilities[2].icon;
  const StackCapabilityIcon = capabilities[3].icon;

  return (
    <main className="w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative border-b border-[var(--border)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(91,143,61,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.35),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(159,211,109,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-18 pt-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-10 lg:pb-24 lg:pt-24">
          <div className="lg:col-span-7">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-2 shadow-[0_20px_60px_rgba(23,21,17,0.06)] dark:shadow-none">
                <FinnitrexLogo className="h-12 w-12" />
              </div>
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                  Finnitrex technology solutions
                </p>
                <p className="mt-1 max-w-md text-sm leading-6 text-[var(--muted)]">
                  Advanced digital systems for education, finance, and operational transformation.
                </p>
              </div>
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-6xl lg:text-7xl lg:leading-[1.02]">
              Architecting advanced technology with enterprise calm.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              Finnitrex designs LMS platforms, analytics systems, and applied R&amp;D programs with the rigor of enterprise infrastructure and the clarity of editorial product design.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/start"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--surface-elevated)] transition-opacity duration-200 hover:opacity-90"
              >
                Start project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Get quote
              </Link>
              <Link
                href="/lms"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                View solutions
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-xl lg:ml-auto">
              <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[color:rgba(255,255,255,0.78)] p-6 shadow-[0_28px_60px_rgba(23,21,17,0.06)] dark:bg-[color:rgba(32,29,24,0.94)] dark:shadow-none">
                <div className="rounded-[1.5rem] border border-[color:rgba(0,0,0,0.08)] bg-[var(--surface)] p-5 dark:border-[color:rgba(255,255,255,0.08)]">
                  <div className="mb-10 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
                        Delivery view
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                        Precision-led systems for modern operators.
                      </h2>
                    </div>
                    <div className="rounded-full border border-[var(--border)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                      Since 2020
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        Core sectors
                      </p>
                      <p className="mt-4 text-3xl font-semibold tracking-[-0.05em]">3</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        Education, fintech, and advanced technical operations.
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] border border-[color:rgba(91,143,61,0.22)] bg-[color:rgba(91,143,61,0.08)] p-5 dark:bg-[color:rgba(159,211,109,0.1)]">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        Delivery posture
                      </p>
                      <p className="mt-4 text-3xl font-semibold tracking-[-0.05em]">Static-first</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        Faster experiences, less bloat, and cleaner long-term maintenance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="-mt-8 ml-4 max-w-xs rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-[0_24px_50px_rgba(23,21,17,0.08)] dark:shadow-none sm:absolute sm:-bottom-10 sm:-left-10 sm:mt-0 sm:ml-0">
                <div className="flex items-center gap-3 text-[var(--foreground)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:rgba(91,143,61,0.12)] text-[var(--accent)] dark:bg-[color:rgba(159,211,109,0.14)]">
                    <LineChart className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-[-0.02em]">Data-informed delivery</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Analytics and governance</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  Project framing, reporting clarity, and implementation discipline that help enterprise teams move with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[color:rgba(255,255,255,0.38)] py-6 dark:bg-[color:rgba(255,255,255,0.02)]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              The Finnitrex stack
            </p>
            <p className="hidden text-sm text-[var(--muted)] md:block">
              Tools and platforms used with restraint, not spectacle.
            </p>
          </div>
          <TechTicker />
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              Engineered for excellence
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Capabilities shaped like a system, not a showcase.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3 md:grid-rows-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <article className={`md:col-span-2 flex min-h-[24rem] flex-col justify-between rounded-[2rem] border p-8 sm:p-10 ${capabilities[0].tone}`}>
              <div>
                <div className="mb-8 flex items-center gap-4">
                  <PrimaryCapabilityIcon className="h-6 w-6 text-[var(--accent)]" />
                  <div className="h-px flex-1 bg-[color:rgba(107,101,89,0.18)] dark:bg-[color:rgba(183,174,157,0.16)]" />
                </div>
                <h3 className="max-w-lg text-3xl font-semibold tracking-[-0.05em] sm:text-[2.2rem]">
                  {capabilities[0].title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
                  {capabilities[0].description}
                </p>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-3xl font-semibold tracking-[-0.05em]">UK</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">Governance and delivery oversight</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold tracking-[-0.05em]">Static</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">Fast, dependable product foundations</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold tracking-[-0.05em]">Global</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">Distributed engineering capacity</p>
                </div>
              </div>
            </article>

            <article className={`rounded-[2rem] border p-8 sm:p-10 ${capabilities[1].tone}`}>
              <AccentCapabilityIcon className="h-6 w-6" />
              <h3 className="mt-10 text-2xl font-semibold tracking-[-0.04em]">
                {capabilities[1].title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[color:rgba(252,250,244,0.72)] dark:text-[color:rgba(23,21,17,0.72)]">
                {capabilities[1].description}
              </p>
              <div className="mt-10 border-t border-[color:rgba(252,250,244,0.16)] pt-6 dark:border-[color:rgba(23,21,17,0.14)]">
                <p className="text-4xl font-semibold tracking-[-0.06em]">0 clutter</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[color:rgba(252,250,244,0.62)] dark:text-[color:rgba(23,21,17,0.62)]">
                  Focused execution layers
                </p>
              </div>
            </article>

            <article className={`rounded-[2rem] border p-8 ${capabilities[2].tone}`}>
              <SecurityCapabilityIcon className="h-6 w-6 text-[var(--accent)]" />
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">
                {capabilities[2].title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {capabilities[2].description}
              </p>
            </article>

            <article className={`md:col-span-2 rounded-[2rem] border p-8 sm:p-10 ${capabilities[3].tone}`}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <StackCapabilityIcon className="h-6 w-6 text-[var(--accent)]" />
                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    {capabilities[3].title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                    {capabilities[3].description}
                  </p>
                </div>
                <Link
                  href="/lms"
                  className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Explore solutions
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {serviceLinks.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-7 transition-colors duration-200 hover:border-[color:rgba(91,143,61,0.24)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:rgba(91,143,61,0.08)] text-[var(--accent)] dark:bg-[color:rgba(159,211,109,0.12)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-[-0.03em] group-hover:text-[var(--accent)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {service.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Delivered systems
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                Selected work with live, data-backed project previews.
              </h2>
            </div>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.slug}
                className="group flex h-full flex-col rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-5 transition-colors duration-200 hover:border-[color:rgba(91,143,61,0.24)]"
              >
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)]"
                  >
                    <ProjectScreenshot
                      src={getProjectScreenshotUrl(project.liveUrl)}
                      alt={`${project.title} live screenshot`}
                      aspect="aspect-video"
                    />
                  </a>
                )}

                <div className="mt-5 flex-1">
                  <span className="inline-flex rounded-full border border-[color:rgba(91,143,61,0.22)] bg-[color:rgba(91,143,61,0.08)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)] dark:bg-[color:rgba(159,211,109,0.12)]">
                    {project.category}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] group-hover:text-[var(--accent)]">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-5 border-t border-[var(--border)] pt-5 text-sm font-semibold">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    >
                      <Github className="h-4 w-4" />
                      Source
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface-elevated)] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:rgba(91,143,61,0.18)] bg-[linear-gradient(145deg,rgba(252,250,244,0.98),rgba(242,238,229,0.96))] p-8 text-[var(--foreground)] shadow-[0_18px_48px_rgba(23,21,17,0.08)] dark:border-[var(--border)] dark:bg-[linear-gradient(145deg,rgba(32,29,24,0.92),rgba(27,24,20,0.94))] dark:text-[var(--accent-contrast)] dark:shadow-none sm:p-10">
            <div className="absolute inset-x-0 bottom-0 top-auto h-24 bg-[radial-gradient(circle_at_center,rgba(91,143,61,0.12),transparent_72%)] dark:bg-[radial-gradient(circle_at_center,rgba(159,211,109,0.1),transparent_72%)]" />
            <p className="relative text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)] dark:text-[color:rgba(253,252,248,0.68)]">
              Operational reach
            </p>
            <div className="relative mt-8 flex items-end justify-between gap-8 border-b border-[color:rgba(107,101,89,0.18)] pb-8 dark:border-[color:rgba(253,252,248,0.14)]">
              <div>
                <p className="text-6xl font-semibold tracking-[-0.08em] sm:text-7xl">120+</p>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-[var(--muted)] dark:text-[color:rgba(253,252,248,0.62)]">
                  Country-ready support posture
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[color:rgba(91,143,61,0.18)] bg-[color:rgba(91,143,61,0.08)] px-4 py-3 text-right dark:border-[color:rgba(253,252,248,0.12)] dark:bg-[color:rgba(253,252,248,0.06)]">
                <p className="text-sm font-semibold">Scale without boundaries</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)] dark:text-[color:rgba(253,252,248,0.56)]">
                  Enterprise-ready systems
                </p>
              </div>
            </div>
            <div className="relative mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-[var(--border)] bg-[color:rgba(255,255,255,0.52)] p-5 dark:border-[color:rgba(253,252,248,0.12)] dark:bg-[color:rgba(253,252,248,0.04)]">
                <p className="text-sm font-semibold">Governance-led delivery</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)] dark:text-[color:rgba(253,252,248,0.66)]">
                  Practical controls for sensitive software, finance, and internal operations.
                </p>
              </div>
              <div className="rounded-[1.25rem] border border-[var(--border)] bg-[color:rgba(255,255,255,0.52)] p-5 dark:border-[color:rgba(253,252,248,0.12)] dark:bg-[color:rgba(253,252,248,0.04)]">
                <p className="text-sm font-semibold">Cross-functional execution</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)] dark:text-[color:rgba(253,252,248,0.66)]">
                  Product thinking, engineering, and implementation patterns aligned in one team.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              Scale without boundaries
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              Systems that hold up across jurisdictions, stakeholders, and product phases.
            </h2>

            <div className="mt-10 space-y-8">
              {scalePoints.map((point) => (
                <div key={point.title} className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[color:rgba(91,143,61,0.08)] text-[var(--accent)] dark:bg-[color:rgba(159,211,109,0.12)]">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">{point.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="overflow-hidden rounded-[2rem] border border-[color:rgba(91,143,61,0.18)] bg-[linear-gradient(135deg,rgba(249,246,238,0.98),rgba(239,245,236,0.96))] px-6 py-12 text-center text-[var(--foreground)] shadow-[0_18px_44px_rgba(23,21,17,0.08)] dark:border-[color:rgba(91,143,61,0.16)] dark:bg-[linear-gradient(135deg,rgba(24,47,40,0.98),rgba(19,37,32,0.98))] dark:text-[var(--accent-contrast)] dark:shadow-none sm:px-10 sm:py-16">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)] dark:text-[color:rgba(253,252,248,0.7)]">
              Ready to evolve
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Build your next system with clarity, not noise.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] dark:text-[color:rgba(253,252,248,0.72)] sm:text-lg">
              Bring your product brief, migration challenge, or applied research idea to Finnitrex and we will frame a practical path forward.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-full bg-[var(--surface-elevated)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] transition-opacity duration-200 hover:opacity-90"
              >
                Start project
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-[color:rgba(253,252,248,0.22)] dark:text-[var(--accent-contrast)] dark:hover:bg-[color:rgba(253,252,248,0.08)] dark:hover:text-[var(--accent-contrast)]"
              >
                Speak to an architect
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
