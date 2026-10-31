"use client";

import { useState, useRef, useEffect } from "react";
import {
  Terminal,
  X,
  CornerDownLeft,
  Sparkles,
  Loader2,
  Cpu,
  ArrowRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OutputLine {
  id: string;
  type: "command" | "response" | "system" | "ai";
  title?: string;
  text: string;
  actions?: { label: string; action: string }[];
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
  "clear",
  "about",
];

export default function TerminalDrawer({ isOpen, onClose }: TerminalDrawerProps) {
  const [inputVal, setInputVal] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<OutputLine[]>([
    {
      id: "initial-1",
      type: "system",
      text: "⚡ PrashantOS v3.2 [Neural Copilot Engine Online]. Type 'help' or ask ANY question naturally.",
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

  const executeCommand = async (rawInput: string) => {
    const command = rawInput.trim();
    if (!command) return;

    const newHistory: OutputLine[] = [
      ...history,
      { id: Math.random().toString(), type: "command", text: command },
    ];

    setInputVal("");
    const lowerCmd = command.toLowerCase();

    // Built-in fast terminal utilities
    if (lowerCmd === "clear") {
      setHistory([]);
      return;
    }

    if (lowerCmd === "help") {
      newHistory.push({
        id: Math.random().toString(),
        type: "response",
        text: `Available Terminal Controls:
• Standard Commands: bio, experience, skills, projects, contact, hire, cv, clear
• Natural AI Queries: You don't need 'ask' prefix! Just type whatever you want:
  e.g. "What did Prashant do at Aagento.AI?"
  e.g. "Explain his BullMQ architecture"
  e.g. "Why should our engineering team hire Prashant?"`,
        actions: [
          { label: "Tell me about Aagento.AI", action: "Tell me about Aagento.AI" },
          { label: "Why hire Prashant?", action: "Why should we hire Prashant?" },
          { label: "Show Experience", action: "experience" },
        ],
      });
      setHistory(newHistory);
      return;
    }

    if (lowerCmd === "bio" || lowerCmd === "about") {
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
        text: "1. Aagento.AI (Software Developer — Parametric CAD & 2D AABB Spatial Algorithms)\n2. Sheryians Pvt. Limited (Full Stack Developer — BullMQ, Redis, Microservices)",
      });
      setHistory(newHistory);
      window.__lenis?.scrollTo("#experience", { offset: -80 });
      return;
    }

    if (lowerCmd === "skills") {
      newHistory.push({
        id: Math.random().toString(),
        type: "response",
        text: "TypeScript, Angular, React.js, Next.js, Node.js, Express, Java, Python, HTML5 Canvas API, 2D AABB Collision, MongoDB, MySQL, Redis, System Design.",
      });
      setHistory(newHistory);
      window.__lenis?.scrollTo("#tools", { offset: -80 });
      return;
    }

    if (lowerCmd === "projects") {
      newHistory.push({
        id: Math.random().toString(),
        type: "response",
        text: "1. Jubilo Event Platform (Next.js 14, Cashfree, EmailJS)\n2. SkyBlog CMS (Node.js, Express, Multer, Brevo SMTP)\n3. Contact App REST (Node.js, Express, MongoDB)\n4. Skynexes EdTech (React.js, Tailwind, Node.js)",
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
        text: "Opening latest verified resume...",
      });
      setHistory(newHistory);
      window.open(PORTFOLIO_DATA.personal.resumeUrl, "_blank");
      return;
    }

    if (lowerCmd === "hire") {
      newHistory.push({
        id: Math.random().toString(),
        type: "response",
        text: "Opening direct mail composer to singhprashant0508@gmail.com...",
      });
      setHistory(newHistory);
      setTimeout(() => {
        window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=Job%20Opportunity%20for%20Prashant`;
      }, 700);
      return;
    }

    // Natural Language AI Processing: Strips any leading 'ask ' if user typed it
    const naturalQuery = lowerCmd.startsWith("ask ")
      ? command.slice(4).trim()
      : command;

    setHistory(newHistory);
    setLoadingAI(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: naturalQuery }),
      });
      const data = await res.json();

      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: "ai",
          title: data.title || "Intelligence Engine Response",
          text: data.response || "No response generated.",
          actions: data.suggestedActions,
        },
      ]);
    } catch {
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: "response",
          text: "Connection to neural service interrupted. Type 'help' to review standard commands.",
        },
      ]);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      executeCommand(inputVal);
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 bg-[#070709]/95 border-t border-zinc-800 backdrop-blur-3xl transition-all duration-400 ease-out transform ${
        isOpen ? "translate-y-0 shadow-[0_-15px_50px_rgba(0,0,0,0.85)]" : "translate-y-full"
      }`}
    >
      <div className="max-w-5xl mx-auto p-4 sm:p-6 font-code text-xs sm:text-sm">
        
        {/* Terminal Top Bar */}
        <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            <span className="text-[11px] text-zinc-200 font-bold tracking-widest uppercase flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              PrashantOS // Neural Terminal v3.2
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60">
              <Cpu className="w-3 h-3" />
              <span>Semantic RAG Active</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded text-zinc-500 hover:text-white transition"
              title={isExpanded ? "Collapse height" : "Expand height"}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-white text-[11px] uppercase tracking-widest flex items-center gap-1 transition ml-2"
            >
              <span>[Close]</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Log Console */}
        <div
          ref={outputRef}
          className={`overflow-y-auto space-y-3.5 text-zinc-300 pr-2 font-light select-text transition-all duration-300 ${
            isExpanded ? "h-80 sm:h-96" : "h-48 sm:h-60"
          }`}
        >
          {history.map((line) => (
            <div key={line.id} className="leading-relaxed">
              
              {/* Command Prompt Row */}
              {line.type === "command" && (
                <div className="flex items-start gap-2 text-white">
                  <span className="text-emerald-500 font-bold select-none">{">"}</span>
                  <span className="font-medium text-white">{line.text}</span>
                </div>
              )}

              {/* System Note */}
              {line.type === "system" && (
                <p className="text-zinc-500 text-xs italic">{line.text}</p>
              )}

              {/* Standard Response */}
              {line.type === "response" && (
                <div className="ml-3 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 text-xs sm:text-sm whitespace-pre-wrap">
                  {line.text}
                  {line.actions && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-zinc-800">
                      {line.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => executeCommand(act.action)}
                          className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-white hover:text-black text-[11px] font-code transition flex items-center gap-1"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* High-Intelligence AI Response Card */}
              {line.type === "ai" && (
                <div className="ml-3 p-4 rounded-xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-700/80 text-zinc-200 text-xs sm:text-sm space-y-2 shadow-lg">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{line.title || "Neural Intelligence"}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-code uppercase">Verified Knowledge</span>
                  </div>

                  <p className="leading-relaxed whitespace-pre-wrap text-zinc-300 font-light">
                    {line.text}
                  </p>

                  {/* Dynamic Action Buttons */}
                  {line.actions && line.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 mt-2 border-t border-zinc-800/80">
                      {line.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => {
                            if (act.action.startsWith("http")) {
                              window.open(act.action, "_blank");
                            } else {
                              executeCommand(act.action);
                            }
                          }}
                          className="px-2.5 py-1 rounded-md bg-zinc-800/90 hover:bg-emerald-500 hover:text-black border border-zinc-700 text-[11px] font-code transition flex items-center gap-1.5"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {loadingAI && (
            <div className="flex items-center gap-2 text-zinc-400 text-xs ml-3 py-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              <span>Analyzing engineering graph & synthesizing response...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-3 pt-3 mt-2 border-t border-zinc-800/80">
          <span className="text-emerald-400 font-bold select-none text-xs sm:text-sm">
            prashant@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything naturally... e.g. 'What did Prashant build at Aagento.AI?'"
            className="w-full bg-transparent text-white focus:outline-none font-code text-xs sm:text-sm placeholder-zinc-600"
          />
          <CornerDownLeft className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
        </div>

      </div>
    </div>
  );
}
