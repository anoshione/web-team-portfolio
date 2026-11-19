import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { featuredProjects } from "@/data/projects";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Reveal } from "@/components/animation/Reveal";
import { ProjectGridAnimation } from "@/components/animation/ProjectGridAnimation";

export function Projects() {
  const erpProject = featuredProjects.find((p) => p.slug === "promise-erp");
  const otherProjects = featuredProjects.filter((p) => p.slug !== "promise-erp");

  return (
    <section id="projects" className="relative border-t border-white/[0.08] py-14 sm:py-16 lg:py-[70px] bg-bg overflow-hidden">
      {/* Ambient neon aura */}
      <div
        className="ambient-neon-glow -bottom-40 -left-40 h-[600px] w-[600px] opacity-35"
        aria-hidden="true"
      />
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel className="mb-4">03 / SELECTED WORK</SectionLabel>
          </Reveal>
          {/* Masked line reveal */}
          <SplitReveal
            as="h2"
            className="font-display text-[22px] font-bold tracking-tight text-ink sm:text-[28px] lg:text-[40px]"
          >
            Systems we have built and run.
          </SplitReveal>
        </div>

        {/* Bento Grid with Clip-Path Reveal, Scale, and Parallax */}
        <ProjectGridAnimation>
          {/* Tile 1: Promise ERP - The Largest Featured Tile */}
          {erpProject && (
            <div
              data-project-tile
              data-spotlight
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-surface p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-accent hover:-translate-y-1.5 hover:shadow-[0_0_40px_-5px_rgba(34,197,94,0.35),0_0_20px_-5px_rgba(31,138,87,0.35)] lg:col-span-12"
            >
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent shadow-[0_0_8px_rgba(34,197,94,0.25)]">
                      Enterprise Resource Planning
                    </span>
                    <span className="font-mono text-xs text-ink/40">
                      {erpProject.status}
                    </span>
                  </div>

                  <h3 className="font-display text-[16px] font-bold tracking-tight text-ink sm:text-[22px] md:text-[28px]">
                    {erpProject.name}
                  </h3>

                  <p className="text-base leading-relaxed text-ink/70">
                    {erpProject.description}
                  </p>

                  <div className="pt-2 font-mono text-xs text-ink/40">
                    Centralizing enterprise workflows, automated reconciliations & departmental intelligence.
                  </div>

                  {erpProject.url && (
                    <div className="pt-4">
                      <a
                        href={erpProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-ink"
                      >
                        <span>Launch Interactive Prototype</span>
                        <svg
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-7">
                  {erpProject.url ? (
                    <a
                      href={erpProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden rounded-2xl group/thumb focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label="View Promise ERP Interactive Prototype"
                    >
                      <BrowserFrame
                        title="Promise ERP Operational Suite"
                        url="erp.promisegroup.net/dashboard"
                        image={erpProject.image}
                        aspect="wide"
                        frameless
                      />
                    </a>
                  ) : (
                    <BrowserFrame
                      title="Promise ERP Operational Suite"
                      url="erp.promisegroup.net/dashboard"
                      image={erpProject.image}
                      aspect="wide"
                      frameless
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tiles 2-5: Bento Sub-Grid */}
          {otherProjects.map((project) => (
            <div
              key={project.slug}
              data-project-tile
              data-spotlight
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-surface p-6 sm:p-8 transition-all duration-300 hover:border-accent hover:-translate-y-1.5 hover:shadow-[0_0_35px_-5px_rgba(34,197,94,0.35),0_0_15px_-5px_rgba(31,138,87,0.3)] lg:col-span-6"
            >
              <div className="space-y-4">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-2xl group/thumb focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`View ${project.name}`}
                  >
                    <BrowserFrame
                      title={project.name}
                      url={project.url}
                      image={project.image}
                      aspect="video"
                      frameless
                    />
                  </a>
                ) : (
                  <BrowserFrame
                    title={project.name}
                    url={`${project.slug}.promise.internal`}
                    image={project.image}
                    aspect="video"
                    frameless
                  />
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="rounded-md border border-white/[0.08] bg-bg px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-accent shadow-[0_0_6px_rgba(34,197,94,0.2)]">
                    {project.slug === "promise-crm" && "Sales & Relationship"}
                    {project.slug === "promise-mart" && "E-commerce"}
                    {project.slug === "promise-hotel-resort" && "Hospitality Management"}
                    {project.slug === "promise-assets" && "Asset & Property"}
                    {project.slug === "dyd-ai" && "Artificial Intelligence"}
                  </span>
                  <span className="font-mono text-xs text-ink/40">
                    {project.status}
                  </span>
                </div>

                <h3 className="font-display text-[14px] font-bold tracking-tight text-ink sm:text-[18px]">
                  {project.name}
                </h3>

                <p className="text-sm leading-relaxed text-ink/70">
                  {project.description}
                </p>
              </div>

              {/* Visit live site link - ONLY shown if URL exists */}
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors hover:text-accent/80 hover:underline"
                  >
                    <span>Visit live site</span>
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                ) : (
                  <span className="font-mono text-xs text-ink/30">
                    Internal Enterprise System
                  </span>
                )}
              </div>
            </div>
          ))}
        </ProjectGridAnimation>

        {/* View full portfolio link */}
        <Reveal delay={0.2} className="mt-12 text-center">
          <Link
            href="#"
            className="group inline-flex items-center gap-2 font-mono text-sm font-medium text-ink/70 transition-colors hover:text-accent"
          >
            <span>View full portfolio</span>
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
