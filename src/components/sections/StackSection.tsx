"use client";

import Image from "next/image";
import { Code2, Monitor, Server, Database, Cloud, Cpu } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  Cpu,
};

export default function StackSection() {
  const { skillCategories } = PORTFOLIO_DATA;

  return (
    <section id="tools" className="py-28 sm:py-32 px-6 sm:px-8 lg:px-24 relative z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-zinc-800/80 pb-6">
          <h2 className="text-xs font-code text-zinc-500 tracking-[0.2em] uppercase">
            03 // Stack & Ecosystem
          </h2>
          <span className="text-xs sm:text-sm font-code text-zinc-500">Core Technologies</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => {
            const IconComponent = categoryIconMap[category.icon] || Code2;

            return (
              <SpotlightCard key={idx} className="p-8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-5">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">{category.title}</h3>
                  <p className="text-zinc-500 text-xs mt-1.5 font-light">{category.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-8">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800/90 text-zinc-200 font-code text-xs hover:border-zinc-700 hover:text-white transition"
                    >
                      {skill.iconSrc && (
                        <Image
                          src={skill.iconSrc}
                          alt={skill.name}
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain"
                          unoptimized
                        />
                      )}
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}

