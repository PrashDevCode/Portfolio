"use client";

import SpotlightCard from "@/components/ui/SpotlightCard";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Briefcase, Calendar } from "lucide-react";

export default function ExperienceSection() {
  const { experiences } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-28 sm:py-32 px-6 sm:px-8 lg:px-24 border-b border-zinc-900 bg-zinc-950/20 relative z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-zinc-800/80 pb-6">
          <h2 className="text-xs font-code text-zinc-500 tracking-[0.2em] uppercase">
            02 // Experience
          </h2>
          <span className="text-xs sm:text-sm font-code text-zinc-500">Industry Roles</span>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <SpotlightCard key={idx} className="p-8 sm:p-10 lg:p-12">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                    {exp.role}
                  </h3>
                  <p className="text-zinc-400 font-code text-sm mt-2 flex items-center gap-2">
                    <span className="text-white font-medium">{exp.company}</span>
                    <span className="text-zinc-600">— {exp.location}</span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 font-code text-xs text-zinc-300 w-fit">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-4 text-zinc-400 text-sm leading-relaxed font-light max-w-3xl">
                {exp.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} className="flex items-start gap-3">
                    <span className="text-zinc-600 font-code mt-0.5 select-none">{">"}</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}

