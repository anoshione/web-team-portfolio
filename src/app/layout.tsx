import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { siteConfig } from "@/data/site";
import { SmoothScrollProvider } from "@/components/animation/SmoothScroll";
import { IntroOverlay } from "@/components/animation/IntroOverlay";
import { ScrollProgress } from "@/components/animation/ScrollProgress";
import { Cursor } from "@/components/animation/Cursor";
import { ParticleFlow } from "@/components/animation/ParticleFlow";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} — Software Development & Digital Growth`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "Software Development",
    "Web Solutions",
    "Digital Marketing",
    "Enterprise ERP",
    "Custom CRM",
    "Promise Group",
    "Automation",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    title: `${siteConfig.name} — Software Development & Digital Solutions`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Software Development & Digital Solutions`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.parentGroup,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support & Sales",
      email: siteConfig.contact.email.replace(/[\[\]]/g, ""),
      telephone: siteConfig.contact.phone.replace(/[\[\]]/g, ""),
    },
  };

  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <head>
        {/* FOUC Prevention: add 'js' class to html before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        {/* Noscript fallback to unhide reveals if JS is disabled */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "html.js [data-reveal] { opacity: 1 !important; transform: none !important; }",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-bg font-sans text-ink selection:bg-accent selection:text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only fixed top-4 left-4 z-50 rounded-md bg-accent px-4 py-2 font-medium text-ink focus:not-sr-only focus:outline-none"
        >
          Skip to main content
        </a>
        <div id="top" />
        <SmoothScrollProvider>
          <IntroOverlay />
          <ScrollProgress />
          <Cursor />
          {/* Animated 3D Particle Flow (Reversed Trumpet Funnel in Hero + Continuous Downward Central Column) */}
          <ParticleFlow />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
