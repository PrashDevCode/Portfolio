"use client";

import { useState } from "react";
import { ExternalLink, Layers } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";
import ProjectModal from "@/components/ui/ProjectModal";

export default function ProjectsSection() {
  const { projects } = PORTFOLIO_DATA;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-28 sm:py-32 px-6 sm:px-8 lg:px-24 border-y border-zinc-900 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-zinc-800/80 pb-6">
          <h2 className="text-xs font-code text-zinc-500 tracking-[0.2em] uppercase">
            04 // Featured Projects
          </h2>
          <span className="text-xs sm:text-sm font-code text-zinc-500">Selected Works</span>
        </div>

        <div className="flex flex-col border-t border-zinc-800">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="project-row border-b border-zinc-800/80 py-10 lg:py-16 relative overflow-hidden group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                
                {/* Index & Title */}
                <div className="flex items-start sm:items-center gap-6 sm:gap-8">
                  <span className="text-sm font-code text-zinc-600 font-bold group-hover:text-white transition mt-1 sm:mt-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="project-title text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tighter">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-xs font-code mt-2 tracking-wide">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className="flex flex-wrap items-center gap-3 pt-2 md:pt-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-3.5 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-xs font-code text-zinc-300 hover:text-white transition flex items-center gap-1.5"
                    title="Inspect Architecture"
                  >
                    <Layers className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Architecture</span>
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-white text-xs font-code text-white transition flex items-center gap-1.5"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-code font-bold transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Deep-dive Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

