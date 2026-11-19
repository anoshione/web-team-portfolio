import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Magnetic } from "@/components/animation/Magnetic";
import { Reveal } from "@/components/animation/Reveal";
import { CtaBannerAnimation } from "@/components/animation/CtaBannerAnimation";

export function CtaBanner() {
  const mailtoAddress = siteConfig.contact.email.replace(/[\[\]]/g, "");

  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32 bg-bg overflow-hidden">
      {/* Ambient neon aura behind CTA section */}
      <div
        className="ambient-neon-glow -top-32 left-1/2 -translate-x-1/2 h-[450px] w-[750px] opacity-45"
        aria-hidden="true"
      />
      <Container className="relative z-10">
        {/* Full-width rounded block with green accent - Expanding container animation */}
        <CtaBannerAnimation>
          {/* Subtle inner grid accent */}
          <div
            className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top_right,white_0%,transparent_70%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-widest text-ink/80 font-bold">
                GET IN TOUCH
              </span>
            </Reveal>

            {/* Masked line reveal */}
            <SplitReveal
              as="h2"
              className="mt-4 font-display text-[22px] font-extrabold tracking-tight text-ink sm:text-[28px] lg:text-[40px]"
            >
              Let&apos;s talk about your next digital project.
            </SplitReveal>

            <Reveal delay={0.15}>
              <p className="mt-6 text-base leading-relaxed text-ink/90 sm:text-lg">
                Tell us about your operations and priorities and we will suggest
                practical solutions. We would be happy to arrange an introductory
                meeting.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href={`mailto:${mailtoAddress}?subject=Introductory%20Meeting%20Request`}
                    className="inline-flex items-center justify-center rounded-xl bg-bg px-7 py-3.5 text-sm font-semibold text-ink shadow-lg transition-all hover:bg-surface hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-white"
                  >
                    Book an introductory meeting
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={`mailto:${mailtoAddress}`}
                    className="inline-flex items-center justify-center rounded-xl border border-ink/40 bg-transparent px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-white/10 hover:border-ink focus-visible:outline-2 focus-visible:outline-white"
                  >
                    Email us
                  </a>
                </Magnetic>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 font-mono text-xs text-ink/80">
                Direct inbox: {siteConfig.contact.email}
              </div>
            </Reveal>
          </div>
        </CtaBannerAnimation>
      </Container>
    </section>
  );
}
