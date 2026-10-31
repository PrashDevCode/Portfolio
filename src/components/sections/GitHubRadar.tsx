"use client";

import { useEffect, useState } from "react";
import { GitBranch, GitCommit, Star, ExternalLink, Activity } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import SpotlightCard from "@/components/ui/SpotlightCard";

interface GitHubData {
  publicRepos: number;
  followers: number;
  recentRepos: {
    name: string;
    language: string;
    url: string;
    stars: number;
  }[];
}

export default function GitHubRadar() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load GitHub activity", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 px-6 sm:px-8 lg:px-24 border-b border-zinc-900 bg-zinc-950/40 relative z-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="flex items-center gap-2">
              <GithubIcon className="w-4 h-4 text-zinc-300" />
              <h3 className="text-sm font-code uppercase tracking-widest text-white font-bold">
                Live GitHub Pulse // @PrashDevCode
              </h3>
            </div>
          </div>

          <a
            href="https://github.com/PrashDevCode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-code text-zinc-400 hover:text-white transition flex items-center gap-1.5"
          >
            <span>View Full Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Live Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Stat 1: Total Repositories */}
          <SpotlightCard className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-code text-zinc-500 uppercase tracking-wider">
                Public Repos
              </span>
              <GitBranch className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="pt-6">
              <span className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                {loading ? "..." : data?.publicRepos || 33}
              </span>
              <span className="block text-[10px] font-code text-zinc-500 mt-1 uppercase tracking-widest">
                Actively Maintained
              </span>
            </div>
          </SpotlightCard>

          {/* Stat 2, 3, 4: Recent Repositories */}
          {data?.recentRepos?.slice(0, 3).map((repo, idx) => (
            <SpotlightCard key={idx} className="p-6 flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-code px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {repo.language || "TypeScript"}
                  </span>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 group-hover:text-white transition"
                    title="Open on GitHub"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <h4 className="text-base font-bold font-heading text-white truncate group-hover:text-zinc-300 transition">
                  {repo.name}
                </h4>
              </div>

              <div className="pt-5 border-t border-zinc-900 mt-4 flex justify-between items-center text-xs font-code text-zinc-500">
                <span className="flex items-center gap-1">
                  <GitCommit className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Main Branch</span>
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500/80" />
                  <span>{repo.stars}</span>
                </span>
              </div>
            </SpotlightCard>
          ))}

        </div>

      </div>
    </section>
  );
}

