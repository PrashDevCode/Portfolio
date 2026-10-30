"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, X, CornerDownLeft, Sparkles, Loader2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OutputLine {
  id: string;
  type: "command" | "response" | "system" | "ai";
  text: string;
}

const VALID_COMMANDS = [
  "help",
  "bio",
  "experience",
  "skills",
  "projects",
  "contact",
  "hire",
  "cv",
  "ask",
  "clear",
];

export default function TerminalDrawer({ isOpen, onClose }: TerminalDrawerProps) {
  const [inputVal, setInputVal] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [history, setHistory] = useState<OutputLine[]>([
    {
      id: "initial-1",
      type: "system",
      text: "SYS_CLI_v3.0 initialized. Type 'help' for available commands or 'ask <question>' for AI Copilot.",
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history, loadingAI]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const match = VALID_COMMANDS.find((cmd) => cmd.startsWith(current));
      if (match) setInputVal(match);
      return;
    }

    if (e.key === "Enter") {
      const command = inputVal.trim();
      if (!command) return;

      const newHistory: OutputLine[] = [
        ...history,
        { id: Math.random().toString(), type: "command", text: command },
      ];

      setInputVal("");
      const lowerCmd = command.toLowerCase();

      if (lowerCmd === "clear") {
        setHistory([]);
        return;
      }

      if (lowerCmd === "help") {
        newHistory.push({
          id: Math.random().toString(),
          type: "response",
          text: "Commands: bio, experience, skills, projects, contact, hire, cv, ask <question>, clear",
        });
        setHistory(newHistory);
        return;
      }

      if (lowerCmd === "bio") {
        newHistory.push({
          id: Math.random().toString(),
          type: "response",
          text: PORTFOLIO_DATA.personal.subheadline,
        });
        setHistory(newHistory);
        window.__lenis?.scrollTo("#about", { offset: -80 });
        return;
      }

      if (lowerCmd === "experience") {
        newHistory.push({
          id: Math.random().toString(),
          type: "response",
          text: "VinraTech (Software Developer) | Sheryians Pvt. Limited (Full Stack Developer)",
        });
        setHistory(newHistory);
        window.__lenis?.scrollTo("#experience", { offset: -80 });
        return;
      }

      if (lowerCmd === "skills") {
        newHistory.push({
          id: Math.random().toString(),
          type: "response",
          text: "Java, TypeScript, JavaScript, React.js, Next.js, Node.js, Express, MongoDB, Redis, Docker, System Design.",
        });
        setHistory(newHistory);
        window.__lenis?.scrollTo("#tools", { offset: -80 });
        return;
      }

      if (lowerCmd === "projects") {
        newHistory.push({
          id: Math.random().toString(),
          type: "response",
          text: "Jubilo Event Platform, SkyBlog CMS, Contact App Server, Skynexes Platform.",
        });
        setHistory(newHistory);
        window.__lenis?.scrollTo("#projects", { offset: -80 });
        return;
      }

      if (lowerCmd === "contact") {
        newHistory.push({
          id: Math.random().toString(),
          type: "response",
          text: `Email: ${PORTFOLIO_DATA.personal.email} | Phone: ${PORTFOLIO_DATA.personal.phone}`,
        });
        setHistory(newHistory);
        window.__lenis?.scrollTo("#contact", { offset: -80 });
        return;
      }

      if (lowerCmd === "cv" || lowerCmd === "resume") {
        newHistory.push({
          id: Math.random().toString(),
          type: "response",
          text: "Opening resume...",
        });
        setHistory(newHistory);
        window.open(PORTFOLIO_DATA.personal.resumeUrl, "_blank");
        return;
      }

      if (lowerCmd === "hire") {
        newHistory.push({
          id: Math.random().toString(),
          type: "response",
          text: "Awesome! Opening mail client...",
        });
        setHistory(newHistory);
        setTimeout(() => {
          window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=Job%20Opportunity%20for%20Prashant`;
        }, 800);
        return;
      }

      // AI Copilot Query: either starts with 'ask ' or any arbitrary question
      const queryPrompt = lowerCmd.startsWith("ask ")
        ? command.slice(4).trim()
        : command;

      setHistory(newHistory);
      setLoadingAI(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: queryPrompt }),
        });
        const data = await res.json();
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            type: "ai",
            text: data.response || "No response received.",
          },
        ]);
      } catch {
        setHistory((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            type: "response",
            text: `Command not found: '${command}'. Type 'help' or try 'ask <query>'.`,
          },
        ]);
      } finally {
        setLoadingAI(false);
      }
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 bg-[#050505]/95 border-t border-zinc-800 backdrop-blur-2xl transition-all duration-400 ease-out transform ${
        isOpen ? "translate-y-0 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]" : "translate-y-full"
      }`}
    >
      <div className="max-w-5xl mx-auto p-4 sm:p-6 font-code text-xs sm:text-sm">
        
        {/* Terminal Header */}
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="text-[11px] text-zinc-300 font-bold tracking-widest uppercase flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              SYS_CLI_v3.0 // PrashantOS
            </span>
            <span className="hidden sm:inline text-[10px] text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
              AI Powered
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white text-[11px] uppercase tracking-widest flex items-center gap-1 transition"
          >
            <span>[Close]</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Terminal Log Output */}
        <div
          ref={outputRef}
          className="h-44 sm:h-52 overflow-y-auto space-y-2.5 text-zinc-300 pr-2 font-light select-text"
        >
          {history.map((line) => (
            <div key={line.id} className="leading-relaxed">
              {line.type === "command" && (
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600 font-bold select-none">{">"}</span>
                  <span className="text-white font-medium">{line.text}</span>
                </div>
              )}
              {line.type === "system" && (
                <p className="text-zinc-500 italic text-xs">{line.text}</p>
              )}
              {line.type === "response" && (
                <p className="text-zinc-300 ml-4 font-light text-xs sm:text-sm bg-zinc-900/50 p-2 rounded border border-zinc-800/80">
                  {line.text}
                </p>
              )}
              {line.type === "ai" && (
                <div className="ml-4 p-2.5 rounded bg-zinc-900/80 border border-zinc-700/80 text-zinc-200 text-xs sm:text-sm space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] uppercase font-bold tracking-wider">
                    <Sparkles className="w-3 h-3" /> AI Copilot
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap">{line.text}</p>
                </div>
              )}
            </div>
          ))}

          {loadingAI && (
            <div className="flex items-center gap-2 text-zinc-400 text-xs ml-4 py-1">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>Thinking with AI Copilot...</span>
            </div>
          )}
        </div>

        {/* Prompt Input Line */}
        <div className="flex items-center gap-3 pt-3 mt-2 border-t border-zinc-800/80">
          <span className="text-emerald-400 font-bold select-none">prashant@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or ask anything about Prashant..."
            className="w-full bg-transparent text-white focus:outline-none font-code text-xs sm:text-sm placeholder-zinc-600"
          />
          <CornerDownLeft className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
        </div>

      </div>
    </div>
  );
}

