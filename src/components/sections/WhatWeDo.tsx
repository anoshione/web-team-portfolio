import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/data/services";
import { SplitReveal } from "@/components/animation/SplitReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Spotlight } from "@/components/animation/Spotlight";

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative border-t border-white/[0.08] py-20 sm:py-28 lg:py-32 bg-surface overflow-hidden">
      {/* Ambient neon aura */}
      <div
        className="ambient-neon-glow -top-36 -right-36 h-[500px] w-[500px] opacity-40"
        aria-hidden="true"
      />
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel className="mb-4">02 / WHAT WE DO</SectionLabel>
          </Reveal>
          {/* Masked line reveal */}
          <SplitReveal
            as="h2"
            className="font-display text-[22px] font-bold tracking-tight text-ink sm:text-[28px] lg:text-[40px]"
          >
            Four ways we help your business.
          </SplitReveal>
        </div>

        {/* 2x2 Technical Grid with Staggered Entrance & Spotlight Effect */}
        <Reveal y={40} stagger={0.12} className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((service) => (
            <Spotlight
              key={service.number}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-bg p-8 sm:p-10 transition-all duration-300 hover:border-accent hover:shadow-[0_0_35px_-5px_rgba(34,197,94,0.4),0_0_15px_-2px_rgba(31,138,87,0.3)] hover:-translate-y-1"
            >
              <div>
                {/* Header: Masked Mono Number & Inline SVG Icon */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-6">
                  {/* Mono number sliding in from a mask */}
                  <div className="overflow-hidden">
                    <span className="block font-mono text-2xl font-bold text-accent sm:text-3xl transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(34,197,94,0.55)]">
                      {service.number}
                    </span>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-surface text-accent transition-colors group-hover:border-accent">
                    {service.number === "01" && (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                        />
                      </svg>
                    )}
                    {service.number === "02" && (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941"
                        />
                      </svg>
                    )}
                    {service.number === "03" && (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                        />
                      </svg>
                    )}
                    {service.number === "04" && (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Service Title & Description */}
                <h3 className="mt-6 font-display text-[15px] font-bold tracking-tight text-ink sm:text-[18px]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
                  {service.description}
                </p>
              </div>

              {/* Capability Tag Line */}
              <div className="mt-8 pt-6 border-t border-white/[0.04]">
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink/40 mb-3">
                  Key Capabilities
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="inline-flex items-center rounded-lg border border-white/[0.06] bg-surface px-2.5 py-1 text-xs text-ink/70"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </Spotlight>
          ))}
        </Reveal>

        {/* Ongoing Support Note Under Grid */}
        <Reveal delay={0.2}>
          <div className="mt-12 rounded-xl border border-white/[0.08] bg-bg px-6 py-4 text-center sm:text-left">
            <p className="text-sm text-ink/70">
              <span className="font-semibold text-ink">Already running a system?</span>{" "}
              We also provide ongoing software support and maintenance.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
