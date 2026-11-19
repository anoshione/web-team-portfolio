import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { concernCompanies } from "@/data/group";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Reveal } from "@/components/animation/Reveal";
import { GroupListAnimation } from "@/components/animation/GroupListAnimation";

export function Group() {
  return (
    <section id="group" className="scroll-mt-20 border-t border-white/[0.08] py-20 sm:py-28 lg:py-32 bg-bg">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel className="mb-4">05 / PROMISE GROUP</SectionLabel>
          </Reveal>
          {/* Masked line reveal */}
          <SplitReveal
            as="h2"
            className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            Part of a larger group.
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-base leading-relaxed text-ink/70 sm:text-lg">
              Our software systems and digital workflows are engineered, deployed,
              and battle-tested directly inside Promise Group&apos;s own active
              operating enterprises before being delivered to external clients.
            </p>
          </Reveal>
        </div>

        {/* Concern Companies List with Divider Lines Draw & Staggered Rise */}
        <GroupListAnimation>
          {concernCompanies.map((company, index) => (
            <div key={company.name} className="relative">
              {/* Divider Line: Draws in scaleX from left */}
              {index > 0 && (
                <div
                  className="group-divider-line h-[1px] w-full origin-left bg-white/[0.08]"
                  style={{ transform: "scaleX(0)" }}
                  aria-hidden="true"
                />
              )}

              {/* Row with hover state: text slides 12px right, arrow rotates -45 to 0, faint green wash */}
              <div className="group-row group relative flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-8 transition-colors duration-400 ease-out hover:bg-accent/[0.04]">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 transition-transform duration-400 ease-out group-hover:translate-x-3">
                  <span className="font-mono text-xs text-accent">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                        {company.name}
                      </h3>
                      {company.logo && (
                        <div className="relative inline-flex h-5 w-20 shrink-0 items-center">
                          <Image
                            src={company.logo}
                            alt={company.name}
                            width={80}
                            height={20}
                            className="max-h-5 w-auto max-w-[80px] object-contain opacity-70 filter transition-opacity duration-300 group-hover:opacity-100"
                          />
                        </div>
                      )}
                      <span className="rounded-md border border-white/[0.06] bg-bg px-2 py-0.5 font-mono text-[10px] uppercase text-ink/50">
                        {company.category}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink/60">
                      {company.description}
                    </p>
                  </div>
                </div>

                {/* Optional Link with rotating arrow */}
                <div className="shrink-0 pt-2 sm:pt-0">
                  {company.url ? (
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors hover:underline"
                    >
                      <span>Visit website</span>
                      <svg
                        className="h-3 w-3 -rotate-45 transition-transform duration-400 ease-out group-hover:rotate-0"
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
                      Internal Enterprise
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </GroupListAnimation>
      </Container>
    </section>
  );
}
