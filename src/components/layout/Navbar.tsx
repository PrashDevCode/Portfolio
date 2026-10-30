"use client";

import { useEffect, useState } from "react";
import { Terminal, Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onToggleTerminal: () => void;
  terminalOpen: boolean;
}

export default function Navbar({ onToggleTerminal, terminalOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (!element) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(id, { offset: -80 });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 w-full z-40">
      <div
        id="navbar-container"
        className={cn(
          "px-6 sm:px-8 lg:px-12 flex justify-between items-center transition-all duration-300 border-b",
          scrolled
            ? "py-4 bg-zinc-950/85 backdrop-blur-xl border-white/10 shadow-lg shadow-black/40"
            : "py-6 bg-black/40 backdrop-blur-md border-white/5"
        )}
      >
        {/* Monogram Brand */}
        <button
          onClick={() => scrollTo("#hero")}
          className="group flex items-center space-x-3 text-left focus:outline-none"
        >
          <div className="relative w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none" className="relative z-10">
              <rect x="6" y="6" width="88" height="88" rx="22" fill="#09090b" stroke="#27272a" strokeWidth="3" />
              <path d="M30 28H55C65 28 70 33 70 41C70 49 65 54 55 54H30V28Z" fill="#ffffff" />
              <path d="M30 54V74" stroke="#ffffff" strokeWidth="8" strokeLinecap="square" />
              <path d="M48 60L56 66L48 72" stroke="#a1a1aa" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold font-heading tracking-widest text-white uppercase">
              Prashant.
            </span>
            <span
              className={cn(
                "text-[10px] font-code text-zinc-500 tracking-[0.2em] uppercase transition-all duration-300",
                scrolled ? "opacity-0 -translate-y-1 h-0 overflow-hidden" : "opacity-100 mt-0.5"
              )}
            >
              Software Eng
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-[11px] font-code tracking-[0.15em] uppercase text-zinc-400">
          <button onClick={() => scrollTo("#about")} className="hover:text-white transition">
            About
          </button>
          <button onClick={() => scrollTo("#experience")} className="hover:text-white transition">
            Experience
          </button>
          <button onClick={() => scrollTo("#tools")} className="hover:text-white transition">
            Stack
          </button>
          <button onClick={() => scrollTo("#projects")} className="hover:text-white transition">
            Works
          </button>
          <button onClick={() => scrollTo("#contact")} className="hover:text-white transition">
            Contact
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTerminal}
            className={cn(
              "px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border text-[11px] font-code transition-all duration-300 flex items-center gap-2",
              terminalOpen
                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "border-zinc-700 bg-zinc-900 text-white hover:bg-white hover:text-black"
            )}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>[CLI Mode]</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-black/95 backdrop-blur-2xl px-6 py-6 space-y-4 font-code text-xs uppercase tracking-widest text-zinc-300 animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => scrollTo("#about")}
            className="block w-full text-left py-2 hover:text-white border-b border-zinc-900"
          >
            01 // About
          </button>
          <button
            onClick={() => scrollTo("#experience")}
            className="block w-full text-left py-2 hover:text-white border-b border-zinc-900"
          >
            02 // Experience
          </button>
          <button
            onClick={() => scrollTo("#tools")}
            className="block w-full text-left py-2 hover:text-white border-b border-zinc-900"
          >
            03 // Tech Stack
          </button>
          <button
            onClick={() => scrollTo("#projects")}
            className="block w-full text-left py-2 hover:text-white border-b border-zinc-900"
          >
            04 // Selected Works
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="block w-full text-left py-2 hover:text-white"
          >
            05 // Contact
          </button>
        </div>
      )}
    </header>
  );
}

