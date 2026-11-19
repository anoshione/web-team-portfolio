import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { FooterAnimation } from "@/components/animation/FooterAnimation";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-surface pt-16 pb-12 text-ink overflow-hidden">
      <FooterAnimation>
        {/* Giant low-opacity wordmark rising with scrubbed yPercent 40 to 0 */}
        <div
          className="footer-giant-wordmark pointer-events-none select-none absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[14vw] font-black tracking-tighter text-white/[0.02] will-change-transform z-0"
          aria-hidden="true"
        >
          {siteConfig.shortName}
        </div>

        <Container size="wide" className="relative z-10">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            {/* Brand & Mission Column */}
            <div className="footer-column lg:col-span-5 space-y-4">
              <Link
                href="#top"
                className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-90"
                aria-label="e-Learning & Earning Ltd. - Back to top"
              >
                <Image
                  src="/images/logo.png"
                  alt="e-Learning & Earning Ltd."
                  width={180}
                  height={33}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <p className="max-w-md text-sm leading-relaxed text-ink/60">
                The internal software engineering and digital operations team of
                Promise Group, delivering production-grade web systems and
                digital growth infrastructure.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-bg px-3 py-1 font-mono text-[11px] text-ink/60">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>A concern of {siteConfig.parentGroup}</span>
              </div>
            </div>

            {/* Navigate Column */}
            <div className="footer-column lg:col-span-2 space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink/40">
                Navigate
              </h3>
              <ul className="space-y-2.5 text-sm">
                {siteConfig.navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-ink/70 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div className="footer-column lg:col-span-3 space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink/40">
                Services
              </h3>
              <ul className="space-y-2.5 text-sm">
                {services.map((service) => (
                  <li key={service.number}>
                    <Link
                      href="#what-we-do"
                      className="text-ink/70 transition-colors hover:text-accent"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="footer-column lg:col-span-2 space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink/40">
                Contact
              </h3>
              <ul className="space-y-2.5 font-mono text-xs text-ink/70">
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email.replace(/[\[\]]/g, "")}`}
                    className="transition-colors hover:text-accent break-all"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <span className="text-ink/60">{siteConfig.contact.phone}</span>
                </li>
                <li>
                  <span className="text-ink/60">{siteConfig.contact.address}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 sm:flex-row">
            <p className="text-xs text-ink/50 text-center sm:text-left">
              © 2026 {siteConfig.name} A Promise Group concern.
            </p>
            <a
              href="#top"
              className="flex items-center gap-1.5 text-xs text-ink/60 transition-colors hover:text-accent"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </a>
          </div>
        </Container>
      </FooterAnimation>
    </footer>
  );
}
