"use client";

import { motion } from "framer-motion";
import { Download, ArrowDownRight, Circle } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function HeroSection() {
  const { headline, subheadline, resumeUrl, status } = PORTFOLIO_DATA.personal;

  const scrollToContact = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo("#contact", { offset: -80 });
    } else {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 sm:px-8 lg:px-24 pt-36 pb-16 relative z-10">
      <div className="max-w-6xl space-y-10">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md text-xs font-code text-zinc-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{status}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-[105px] font-extrabold font-heading tracking-tighter leading-[0.92] text-white"
        >
          FULL-STACK <br />
          <span className="text-zinc-600">SOFTWARE</span> ENGINEER.
        </motion.h1>

        {/* Subtitle & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="grid md:grid-cols-2 gap-10 pt-8 items-end border-t border-zinc-800/80"
        >
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg font-light">
            {subheadline}
          </p>

          <div className="flex flex-wrap gap-4 md:justify-end items-center">
            <MagneticButton href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <span className="px-8 py-4 rounded-full bg-white text-black font-bold text-xs font-code uppercase tracking-widest hover:bg-zinc-200 transition flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                <Download className="w-4 h-4" /> Download CV
              </span>
            </MagneticButton>

            <MagneticButton onClick={scrollToContact}>
              <span className="px-8 py-4 rounded-full border border-zinc-700 bg-zinc-950/60 backdrop-blur text-white font-bold text-xs font-code uppercase tracking-widest hover:bg-zinc-900 transition flex items-center gap-2">
                Contact <ArrowDownRight className="w-4 h-4 text-zinc-400" />
              </span>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

