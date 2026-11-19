"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useSmoothScroll } from "@/components/animation/SmoothScroll";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Navbar hide on scroll down, show on scroll up
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      let lastScroll = 0;

      ScrollTrigger.create({
        onUpdate: (self) => {
          const scroll = self.scroll();
          setIsScrolled(scroll > 40);

          if (scroll > 120 && scroll > lastScroll) {
            // Scrolling down -> hide navbar
            gsap.to(header, {
              yPercent: -100,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else {
            // Scrolling up -> show navbar
            gsap.to(header, {
              yPercent: 0,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          lastScroll = scroll;
        },
      });
    },
    { scope: headerRef }
  );

  const closeMenu = () => setIsOpen(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      closeMenu();
      scrollTo(href, { offset: -80 });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 w-full transition-all duration-300 will-change-transform ${
        isScrolled
          ? "border-b border-white/[0.08] bg-bg/90 backdrop-blur-md shadow-lg"
          : "border-b border-transparent bg-transparent backdrop-blur-none"
      }`}
    >
      <Container size="wide" className="flex h-18 items-center justify-between">
        {/* Wordmark Left */}
        <Link
          href="#top"
          onClick={(e) => handleLinkClick(e, "#top")}
          className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
          aria-label="e-Learning & Earning Ltd. - Home"
        >
          <Image
            src="/images/logo.png"
            alt="e-Learning & Earning Ltd."
            width={180}
            height={33}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main Navigation"
        >
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            href="#contact"
            variant="primary"
            size="sm"
            onClick={(e) => handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, "#contact")}
          >
            Contact us
          </Button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-surface text-ink/80 transition-colors hover:border-accent hover:text-ink lg:hidden focus-visible:outline-2 focus-visible:outline-accent"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close main navigation" : "Open main navigation"}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile Full-Screen Menu Overlay */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-18 bottom-0 z-50 flex flex-col justify-between bg-bg/98 px-6 py-8 backdrop-blur-xl lg:hidden border-t border-white/[0.08]"
        >
          <nav
            className="flex flex-col gap-6"
            aria-label="Mobile Navigation Links"
          >
            {siteConfig.navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group flex items-baseline justify-between border-b border-white/[0.06] pb-4 font-display text-2xl font-semibold tracking-tight text-ink transition-colors hover:text-accent"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-ink/40 group-hover:text-accent">
                  0{idx + 1}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pt-8">
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              className="w-full text-center"
              onClick={(e) => handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, "#contact")}
            >
              Contact us
            </Button>
            <p className="text-center font-mono text-xs text-ink/40">
              {siteConfig.legalName} · {siteConfig.parentGroup}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
