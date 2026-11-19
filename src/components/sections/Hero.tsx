import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Parallax } from "@/components/animation/Parallax";
import { Magnetic } from "@/components/animation/Magnetic";
import { HeroAtmosphere } from "@/components/animation/HeroAtmosphere";
import { ParticleFlow } from "@/components/animation/ParticleFlow";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 lg:pt-18 lg:pb-24">
      {/* 3D Animated Particle Flow - Reversed Trumpet Shape Confined to Hero */}
      <ParticleFlow />

      <HeroAtmosphere>
        {/* Subtle CSS grid that drifts slowly */}
        <div
          className="pointer-events-none absolute inset-0 hero-grid hero-grid-drift z-0"
          aria-hidden="true"
        />

        {/* Soft dark green radial glow that breathes */}
        <div
          className="pointer-events-none absolute inset-0 hero-glow hero-glow-breathe z-0"
          aria-hidden="true"
        />

        <Container size="wide" className="relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Asymmetric Left-Aligned Copy */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <SectionLabel className="mb-6">
                  SOFTWARE · WEB · DIGITAL GROWTH
                </SectionLabel>
              </Reveal>

              {/* Masked line reveal on H1 */}
              <SplitReveal
                as="h1"
                className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.08]"
              >
                We build the software and digital presence your business grows on.
              </SplitReveal>

              {/* Staggered fade + y 24 for subline, buttons, and mono label */}
              <Reveal delay={0.25} stagger={0.08} y={24}>
                <p
                  data-reveal
                  className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg md:text-xl"
                >
                  From corporate websites and custom CRM to automation and SEO, our
                  in-house team designs, builds and supports the systems that keep
                  your business moving.
                </p>

                <div
                  data-reveal
                  className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10"
                >
                  <Magnetic>
                    <Button href="#projects" variant="primary" size="lg">
                      View our work
                    </Button>
                  </Magnetic>
                  <Button href="#contact" variant="outline" size="lg">
                    Talk to us
                  </Button>
                </div>

                <p
                  data-reveal
                  className="mt-8 font-mono text-xs uppercase tracking-wider text-ink/40 sm:mt-10"
                >
                  Software development · Web solutions · Digital marketing
                </p>
              </Reveal>
            </div>

            {/* Right Column: Stacked, Offset BrowserFrames with ample top clearance (no cropping) */}
            <div className="relative lg:col-span-5 flex justify-center lg:justify-end">
              <div className="hero-mockup-stack relative w-full max-w-lg lg:max-w-none pt-8 sm:pt-12">
                {/* Back Mockup: Positioned within top clearance */}
                <Parallax
                  yPercent={-10}
                  className="absolute top-0 right-0 sm:-right-2 w-11/12 opacity-40 blur-[0.5px] transition-transform duration-500 hover:opacity-60 hidden sm:block"
                >
                  <BrowserFrame
                    title="Clickel Digital Agency"
                    url="clickeldigital.com"
                    image="/screenshots/clickel-digital-1.webp"
                    images={[
                      "/screenshots/clickel-digital-1.webp",
                      "/screenshots/clickel-digital-2.webp",
                      "/screenshots/clickel-digital-3.webp",
                    ]}
                    variant="compact"
                    aspect="video"
                  />
                </Parallax>

                {/* Front Primary Mockup: Sits below back mockup with clean offset */}
                <Parallax
                  yPercent={-4}
                  className="relative z-10 shadow-2xl transition-transform duration-300 hover:-translate-y-1 mt-8 sm:mt-10"
                >
                  <BrowserFrame
                    title="Promise ERP Operations Dashboard"
                    url="erp.promisegroup.net/dashboard"
                    image="/screenshots/promise-erp-1.webp"
                    images={[
                      "/screenshots/promise-erp-1.webp",
                      "/screenshots/promise-erp-2.webp",
                      "/screenshots/promise-erp-3.webp",
                    ]}
                    aspect="video"
                  />
                </Parallax>
              </div>
            </div>
          </div>
        </Container>
      </HeroAtmosphere>
    </section>
  );
}
