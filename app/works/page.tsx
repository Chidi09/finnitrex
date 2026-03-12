import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code, ExternalLink, Github } from "lucide-react";
import ProjectScreenshot from "@/components/ProjectScreenshot";
import {
  getAllProjects,
  getProjectCategories,
  getProjectScreenshotUrl,
} from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Works | Finnitrex Proof Hub",
  description:
    "Explore Finnitrex's proof hub of delivered projects across AI platforms, fintech systems, commerce builds, and custom web applications.",
  keywords: [
    "Finnitrex portfolio",
    "Finnitrex proof hub",
    "software projects",
    "AI solutions",
    "LMS development",
    "fintech projects",
    "NLP platforms",
    "web applications",
  ],
  openGraph: {
    title: "Finnitrex Works | Proof of Delivery",
    description:
      "A single proof hub showing real Finnitrex delivery across AI, fintech, edtech, and custom software.",
    url: "https://finnitrex.com/works",
    type: "website",
  },
};

const categoryPillClass =
  "inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]";

function ProjectLinks({
  githubUrl,
  liveUrl,
  compact = false,
}: {
  githubUrl?: string;
  liveUrl?: string;
  compact?: boolean;
}) {
  const linkClass = compact
    ? "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors"
    : "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-4">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} text-[var(--muted)] hover:text-[var(--foreground)]`}
        >
          <Github className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          Source
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} text-[var(--foreground)] hover:text-[var(--accent)]`}
        >
          <ExternalLink className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          Live
        </a>
      )}
      {!githubUrl && !liveUrl && (
        <span
          className={`${linkClass} text-[var(--muted)]`}
        >
          <Code className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          Private repository
        </span>
      )}
    </div>
  );
}

export default function WorksPage() {
  const allProjects = getAllProjects();
  const categories = getProjectCategories();
  const featured = allProjects.filter((project) => project.featured);
  const other = allProjects.filter((project) => !project.featured);
  const leadProject = featured[0];
  const supportingFeatured = featured.slice(1);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-[color:rgba(91,143,61,0.22)] bg-[color:rgba(91,143,61,0.08)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)] dark:bg-[color:rgba(159,211,109,0.12)]">
              Proof hub
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.07em] sm:text-6xl lg:text-7xl">
              Real delivery, arranged as one continuous body of work.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              This is the single public record of what Finnitrex ships across fintech,
              commerce, operations, and AI tooling. Featured builds carry a little more
              story, while the wider archive keeps the same calm, white-first framing.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Featured work
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                The lead projects show the brief, the build approach, and the proof in one place.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
              Larger cards make room for context without turning the page into a separate case-study flow.
            </p>
          </div>

          {leadProject && (
            <div className="grid gap-6 lg:grid-cols-12">
              <article className="group overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface-elevated)] shadow-[0_18px_48px_rgba(23,21,17,0.06)] dark:shadow-none lg:col-span-8">
                {leadProject.liveUrl ? (
                  <a
                    href={leadProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]"
                    tabIndex={-1}
                  >
                    <ProjectScreenshot
                      src={getProjectScreenshotUrl(leadProject.liveUrl)}
                      alt={`${leadProject.title} live screenshot`}
                      aspect="aspect-[16/10]"
                    />
                  </a>
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center border-b border-[var(--border)] bg-[var(--surface)]">
                    <Code className="h-10 w-10 text-[var(--muted)]" />
                  </div>
                )}

                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap gap-2">
                    <span className={categoryPillClass}>
                      {leadProject.category}
                    </span>
                    {leadProject.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[var(--muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                      <h3 className="text-3xl font-semibold tracking-[-0.05em] transition-colors group-hover:text-[var(--accent)] sm:text-4xl">
                        {leadProject.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
                        {leadProject.description}
                      </p>
                    </div>
                    <ExternalLink className="hidden h-10 w-10 shrink-0 text-[var(--foreground)] transition-transform duration-200 group-hover:translate-x-1 lg:block" />
                  </div>

                  {(leadProject.challenge || leadProject.approach) && (
                    <div className="mt-8 grid gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-2">
                      {leadProject.challenge && (
                        <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                            Challenge
                          </p>
                          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                            {leadProject.challenge}
                          </p>
                        </div>
                      )}
                      {leadProject.approach && (
                        <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                            Approach
                          </p>
                          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                            {leadProject.approach}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {leadProject.proofPoints?.length ? (
                    <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                        Proof points
                      </p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        {leadProject.proofPoints.map((point) => (
                          <p
                            key={point}
                            className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-4 text-sm leading-7 text-[var(--muted)]"
                          >
                            {point}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-8 border-t border-[var(--border)] pt-5">
                    <ProjectLinks githubUrl={leadProject.githubUrl} liveUrl={leadProject.liveUrl} />
                  </div>
                </div>
              </article>

              <div className="flex flex-col gap-6 lg:col-span-4">
                <aside className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-7">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    Sectors covered
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {categories.map((category) => (
                      <span key={category} className={categoryPillClass}>
                        {category}
                      </span>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          )}

          {supportingFeatured.length > 0 && (
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {supportingFeatured.map((project) => (
                <article
                  key={project.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-elevated)] transition-colors duration-200 hover:border-[color:rgba(91,143,61,0.24)]"
                >
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]"
                      tabIndex={-1}
                    >
                      <ProjectScreenshot
                        src={getProjectScreenshotUrl(project.liveUrl)}
                        alt={`${project.title} live screenshot`}
                        aspect="aspect-video"
                      />
                    </a>
                  ) : (
                    <div className="flex aspect-video items-center justify-center border-b border-[var(--border)] bg-[var(--surface)]">
                      <Code className="h-8 w-8 text-[var(--muted)]" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className={categoryPillClass}>
                        {project.category}
                      </span>
                    </div>

                    <div className="mt-5 flex-1">
                      <h3 className="text-2xl font-semibold tracking-[-0.04em] transition-colors group-hover:text-[var(--accent)]">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                        {project.description}
                      </p>

                      {(project.challenge || project.approach) && (
                        <div className="mt-5 space-y-3 rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-4">
                          {project.challenge && (
                            <div>
                              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                                Challenge
                              </p>
                              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                                {project.challenge}
                              </p>
                            </div>
                          )}
                          {project.approach && (
                            <div>
                              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                                Approach
                              </p>
                              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                                {project.approach}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {project.proofPoints?.length ? (
                        <div className="mt-5 space-y-2">
                          {project.proofPoints.slice(0, 2).map((point) => (
                            <p
                              key={point}
                              className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm leading-6 text-[var(--muted)]"
                            >
                              {point}
                            </p>
                          ))}
                        </div>
                      ) : null}

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 border-t border-[var(--border)] pt-5">
                      <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-[var(--background)] py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Archive entries
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                The rest of the portfolio keeps the same editorial treatment at a tighter scale.
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[var(--muted)]">
              Smaller cards stay compact and scan-friendly, so the page still reads like one proof hub instead of several content types stitched together.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {other.map((project) => (
              <article
                key={project.slug}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-elevated)] transition-colors duration-200 hover:border-[color:rgba(91,143,61,0.24)]"
              >
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]"
                    tabIndex={-1}
                  >
                    <ProjectScreenshot
                      src={getProjectScreenshotUrl(project.liveUrl)}
                      alt={`${project.title} live screenshot`}
                      aspect="aspect-video"
                    />
                  </a>
                ) : (
                  <div className="flex aspect-video items-center justify-center border-b border-[var(--border)] bg-[var(--surface)]">
                    <Code className="h-8 w-8 text-[var(--muted)]" />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                  <span className={`${categoryPillClass} w-fit`}>
                    {project.category}
                  </span>

                  <div className="mt-4 flex-1">
                    <h3 className="text-xl font-semibold tracking-[-0.04em] transition-colors group-hover:text-[var(--accent)]">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-[var(--border)] pt-5">
                    <ProjectLinks
                      githubUrl={project.githubUrl}
                      liveUrl={project.liveUrl}
                      compact
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-8 shadow-[0_18px_48px_rgba(23,21,17,0.06)] dark:shadow-none sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-10">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Start something new
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                Ready to turn the next brief into a durable, well-shaped product?
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
                From first architecture decisions to launch-ready interfaces, Finnitrex builds systems meant to read clearly, scale cleanly, and last.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0">
              <Link
                href="/start"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Discuss your brief
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
