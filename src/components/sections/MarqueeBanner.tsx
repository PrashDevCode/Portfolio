"use client";

import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function MarqueeBanner() {
  const items = PORTFOLIO_DATA.tickerItems;

  return (
    <section className="py-7 border-y border-zinc-900 overflow-hidden bg-black/50 backdrop-blur-md relative z-10">
      <div className="animate-marquee text-2xl sm:text-3xl lg:text-5xl font-extrabold font-heading uppercase text-zinc-700 whitespace-nowrap select-none">
        {items.concat(items).map((item, idx) => (
          <span key={idx} className="inline-flex items-center">
            <span className="px-6 hover:text-zinc-400 transition-colors">{item}</span>
            <span className="text-zinc-800 text-2xl lg:text-3xl">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}

