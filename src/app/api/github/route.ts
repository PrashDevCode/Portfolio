import { NextResponse } from "next/server";

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  recentRepos: {
    name: string;
    language: string;
    url: string;
    stars: number;
  }[];
  lastUpdated: string;
}

export async function GET() {
  try {
    const headers = {
      "User-Agent": "Prashant-Portfolio-App",
      Accept: "application/vnd.github.v3+json",
    };

    // 1. Fetch User Stats
    const userRes = await fetch("https://api.github.com/users/PrashDevCode", {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour (ISR)
    });

    if (!userRes.ok) {
      throw new Error(`GitHub user fetch failed: ${userRes.statusText}`);
    }
    const userData = await userRes.json();

    // 2. Fetch Recent Repos
    const reposRes = await fetch(
      "https://api.github.com/users/PrashDevCode/repos?sort=updated&per_page=4",
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    let recentRepos = [];
    if (reposRes.ok) {
      const reposData = await reposRes.json();
      recentRepos = reposData.map((repo: any) => ({
        name: repo.name,
        language: repo.language || "TypeScript",
        url: repo.html_url,
        stars: repo.stargazers_count || 0,
      }));
    }

    const stats: GitHubStats = {
      publicRepos: userData.public_repos || 33,
      followers: userData.followers || 5,
      recentRepos,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    // Graceful fallback data so UI never breaks
    return NextResponse.json({
      publicRepos: 33,
      followers: 5,
      recentRepos: [
        {
          name: "Portfolio",
          language: "TypeScript",
          url: "https://github.com/PrashDevCode/Portfolio",
          stars: 0,
        },
        {
          name: "2D-CAD-Civil-Vector-Engine",
          language: "TypeScript",
          url: "https://github.com/PrashDevCode/2D-CAD-Civil-Vector-Engine",
          stars: 0,
        },
        {
          name: "Skynexes-client",
          language: "TypeScript",
          url: "https://github.com/PrashDevCode/Skynexes-client",
          stars: 0,
        },
        {
          name: "JubiLo",
          language: "Next.js",
          url: "https://github.com/PrashDevCode/JubiLo",
          stars: 0,
        },
      ],
      lastUpdated: new Date().toISOString(),
    });
  }
}

