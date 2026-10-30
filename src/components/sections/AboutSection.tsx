"use client";

import { Check, ShieldCheck } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function AboutSection() {
  const { metrics, coreConcepts } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-28 sm:py-32 px-6 sm:px-8 lg:px-24 border-b border-zinc-900 relative z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-zinc-800/80 pb-6">
          <h2 className="text-xs font-code text-zinc-500 tracking-[0.2em] uppercase">
            01 // About & Philosophy
          </h2>
          <span className="text-xs sm:text-sm font-code text-zinc-500">Engineering Profile</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-3xl sm:text-4xl font-bold font-heading text-white leading-snug">
              Designing secure, highly available architectures utilizing MVC/microservices patterns.
            </h3>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
              Full Stack Software Engineer skilled in engineering production-grade web applications using Java, TypeScript, React, and Node.js. Expert at integrating AI-driven development methodologies to rapidly deliver scalable features from concept to deployment.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800/80">
              {metrics.map((metric, idx) => (
                <div key={idx}>
                  <span className="block text-3xl sm:text-4xl font-bold font-heading text-white">
                    {metric.value}
                  </span>
                  <span className="text-[11px] sm:text-xs font-code text-zinc-500 uppercase tracking-wider">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Spotlight Concepts Card */}
          <div className="lg:col-span-5">
            <SpotlightCard className="p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <span className="text-xs font-code text-zinc-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-zinc-400" />
                  // CORE CONCEPTS
                </span>
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]"></span>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-zinc-300 font-code font-light">
                {coreConcepts.map((concept, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </div>

        </div>
      </div>
    </section>
  );
}

