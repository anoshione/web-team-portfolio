import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/data/site";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { ScrollWords } from "@/components/animation/ScrollWords";
import { Counter } from "@/components/animation/Counter";
import { Reveal } from "@/components/animation/Reveal";

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="border-t border-white/[0.08] py-20 sm:py-28 lg:py-32 bg-bg">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Section Label & Heading */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel className="mb-4">01 / WHO WE ARE</SectionLabel>
            </Reveal>

            {/* Masked line reveal */}
            <SplitReveal
              as="h2"
              className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-tight"
            >
              A team that builds, runs and improves business software.
            </SplitReveal>
          </div>

          {/* Right Column: Scroll-linked word highlight */}
          <div className="lg:col-span-7 space-y-6 text-base leading-relaxed text-ink/70 sm:text-lg">
            <ScrollWords
              text="We are the software and digital team behind Promise Group's own systems (ERP, LMS, CRM, e-commerce, hospitality, AI), and we now bring that same experience to other businesses."
            />
            <Reveal delay={0.15}>
              <p data-reveal>
                We focus on practical solutions aligned with business goals, not
                over-engineered ones. Every system is built to scale reliably and
                support day-to-day operations with minimal friction.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Stats Row - Animated numerical count-up from 0 */}
        <div className="mt-16 grid grid-cols-1 gap-6 border-t border-white/[0.08] pt-12 sm:grid-cols-3 lg:gap-8">
          {/* Stat 1: Systems Built */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/[0.08] bg-surface p-6 sm:p-8 transition-colors hover:border-accent/40">
              <div className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
                <Counter
                  target={siteConfig.stats.systemsBuilt.count}
                  suffix={siteConfig.stats.systemsBuilt.suffix}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-ink/60">
                {siteConfig.stats.systemsBuilt.label}
              </p>
            </div>
          </Reveal>

          {/* Stat 2: Team Members */}
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-white/[0.08] bg-surface p-6 sm:p-8 transition-colors hover:border-accent/40">
              <div className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
                <Counter target={siteConfig.stats.teamMembers.count} />
              </div>
              <p className="mt-2 text-sm font-medium text-ink/60">
                {siteConfig.stats.teamMembers.label}
              </p>
            </div>
          </Reveal>

          {/* Stat 3: Core Service Areas */}
          <Reveal delay={0.3}>
            <div className="rounded-2xl border border-white/[0.08] bg-surface p-6 sm:p-8 transition-colors hover:border-accent/40">
              <div className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
                <Counter target={siteConfig.stats.coreServices.count} />
              </div>
              <p className="mt-2 text-sm font-medium text-ink/60">
                {siteConfig.stats.coreServices.label}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
