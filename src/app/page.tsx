import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Projects } from "@/components/sections/Projects";
import { Trust } from "@/components/sections/Trust";
import { Group } from "@/components/sections/Group";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <WhoWeAre />
        <WhatWeDo />
        <Projects />
        <Trust />
        <Group />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
