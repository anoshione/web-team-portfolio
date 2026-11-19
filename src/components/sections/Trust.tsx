import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Marquee } from "@/components/animation/Marquee";

export function Trust() {
  return (
    <section id="trust" className="relative border-t border-white/[0.08] py-20 sm:py-28 lg:py-32 bg-surface overflow-hidden">
      {/* Ambient neon aura */}
      <div
        className="ambient-neon-glow -top-32 -left-32 h-[450px] w-[450px] opacity-30"
        aria-hidden="true"
      />
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel className="mb-4">04 / TRUSTED BY</SectionLabel>
          </Reveal>
          {/* Masked line reveal */}
          <SplitReveal
            as="h2"
            className="font-display text-[22px] font-bold tracking-tight text-ink sm:text-[28px] lg:text-[40px]"
          >
            Organizations that rely on our work.
          </SplitReveal>
        </div>
      </Container>

      {/* Infinite Velocity-Linked Marquee of Logo Slots */}
      <div className="mt-14 w-full">
        <Marquee duration={28} className="py-2">
          {/* Slot 1: Department of Youth Development (Real) */}
          <div className="flex h-24 w-56 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-bg px-4 py-3 text-center transition-all duration-300 hover:border-accent hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]">
            <div className="space-y-1">
              <span className="block font-display text-xs font-bold uppercase tracking-wider text-ink sm:text-sm">
                Department of
              </span>
              <span className="block font-display text-xs font-bold uppercase tracking-wider text-accent sm:text-sm">
                Youth Development
              </span>
            </div>
          </div>

          {/* Slots 2 - 6: Subtle Dashed Client Logo Placeholders */}
          {[2, 3, 4, 5, 6].map((slotNumber) => (
            <div
              key={slotNumber}
              className="group flex h-24 w-52 shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.12] bg-bg/50 px-4 py-3 text-center transition-colors hover:border-accent/50"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-ink/40 group-hover:text-ink/60">
                Client logo
              </span>
              <span className="mt-1 font-mono text-[10px] text-ink/20">
                0{slotNumber}
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      <Container>
        {/* Beneath short line */}
        <Reveal delay={0.15}>
          <p className="mt-8 text-center sm:text-left text-sm text-ink/60">
            From public sector programs to commerce and hospitality.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
