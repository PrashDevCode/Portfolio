"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import GitHubRadar from "@/components/sections/GitHubRadar";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import StackSection from "@/components/sections/StackSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import TerminalDrawer from "@/components/terminal/TerminalDrawer";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-zinc-100 flex flex-col justify-between overflow-x-hidden selection:bg-white selection:text-black">
      {/* Smart Fixed Header */}
      <Navbar
        terminalOpen={terminalOpen}
        onToggleTerminal={() => setTerminalOpen((prev) => !prev)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex-1">
        <HeroSection />
        <GitHubRadar />
        <MarqueeBanner />
        <AboutSection />
        <ExperienceSection />
        <StackSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Modern Monochrome Footer */}
      <Footer />

      {/* Interactive AI Terminal Drawer */}
      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}
