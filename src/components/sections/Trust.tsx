import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Marquee } from "@/components/animation/Marquee";
import { memberOrganizations } from "@/data/trust";

export function Trust() {
  return (
    <section id="trust" className="scroll-mt-20 border-t border-white/[0.08] py-14 sm:py-18 lg:py-20 bg-surface overflow-hidden">
      <Container size="wide">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel className="mb-4">04 / TRUST & AFFILIATIONS</SectionLabel>
          </Reveal>
          {/* Masked line reveal */}
          <SplitReveal
            as="h2"
            className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            Organizations that rely on our work.
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Official members of national software and technology associations,
              government initiatives, and enterprise partners across Bangladesh.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* Infinite Velocity-Linked Marquee of Real Member & Partner Logos */}
      <div className="mt-8 sm:mt-10 w-full">
        <Marquee duration={28} className="py-2">
          {memberOrganizations.map((org) => {
            const card = (
              <div
                key={org.name}
                className="group relative flex h-24 min-w-[220px] max-w-[280px] shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-bg px-6 py-4 transition-all duration-300 hover:border-accent hover:bg-surface hover:-translate-y-0.5"
              >
                <div className="relative flex h-12 w-full items-center justify-center">
                  <Image
                    src={org.logo}
                    alt={org.fullName || org.name}
                    width={160}
                    height={48}
                    className="max-h-12 w-auto max-w-[160px] object-contain opacity-80 filter transition-all duration-300 group-hover:opacity-100 group-hover:brightness-110"
                  />
                </div>
              </div>
            );

            return org.url ? (
              <a
                key={org.name}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${org.fullName} (${org.name})`}
                className="focus-visible:outline-2 focus-visible:outline-accent rounded-2xl"
              >
                {card}
              </a>
            ) : (
              card
            );
          })}
        </Marquee>
      </div>

      <Container size="wide">
        {/* Beneath short line */}
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-5 font-mono text-xs text-ink/50">
            <span>Industry memberships: BASIS · NSDA · BACCO · BCS · Shomvob</span>
            <span>Public sector collaboration: Department of Youth Development</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
