"use client";

import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Footer() {
  const { github, linkedin, name } = PORTFOLIO_DATA.personal;

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="py-12 px-6 sm:px-8 lg:px-24 border-t border-zinc-900 bg-black relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-zinc-500 font-code uppercase tracking-widest">
        <p>© 2026 {name}. All rights reserved.</p>

        <div className="flex items-center space-x-8">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-1.5"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <button
            onClick={scrollToTop}
            className="hover:text-white transition flex items-center gap-1 border-l border-zinc-800 pl-6"
            title="Scroll to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

