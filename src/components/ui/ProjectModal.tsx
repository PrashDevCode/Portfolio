"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Layers, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { ProjectItem } from "@/data/portfolioData";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
          className="relative w-full max-w-3xl rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-start gap-4 border-b border-zinc-800 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-code text-zinc-500 uppercase tracking-widest mb-1.5">
                <Layers className="w-3.5 h-3.5 text-zinc-400" />
                <span>Architecture & Engineering Deep Dive</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <div className="py-5 space-y-6">
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
              {project.description}
            </p>

            {/* Architecture Pipeline */}
            {project.architecture && (
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 sm:p-5 space-y-3">
                <span className="text-[11px] font-code text-zinc-400 uppercase tracking-wider block">
                  // System Flow & Architecture
                </span>
                <div className="font-code text-xs text-zinc-300 bg-black/60 p-3.5 rounded-lg border border-zinc-800 flex flex-wrap items-center gap-2 leading-relaxed">
                  {project.architecture.split("➔").map((step, idx, arr) => (
                    <span key={idx} className="inline-flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-zinc-800/80 text-white font-medium">
                        {step.trim()}
                      </span>
                      {idx < arr.length - 1 && <span className="text-zinc-500 font-bold">➔</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Technical Highlights */}
            <div className="space-y-3">
              <span className="text-[11px] font-code text-zinc-400 uppercase tracking-wider block">
                // Engineering Highlights & Production Wins
              </span>
              <ul className="space-y-2.5">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300 font-light">
                    <CheckCircle2 className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Badges */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-code text-zinc-500 uppercase tracking-wider block">
                Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-code text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-zinc-800">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-code text-white transition flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" /> Source Code
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-code font-bold transition flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

