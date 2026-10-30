"use client";

import { useState } from "react";
import { Copy, Check, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ContactSection() {
  const { email, phone } = PORTFOLIO_DATA.personal;

  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    toast.success(`${type} copied to clipboard!`);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.8 },
            colors: ["#ffffff", "#818cf8", "#52525b"],
          });
        } catch {
          // Fallback if canvas-confetti is unavailable
        }
      } else {
        toast.error(data.error || "Failed to send message. Please try email directly.");
      }
    } catch {
      toast.error("Network error. Please try sending an email directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 sm:py-32 px-6 sm:px-8 lg:px-24 relative z-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        
        {/* Left Information Column */}
        <div className="space-y-10">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tighter leading-none">
            Let's build <br />
            <span className="text-zinc-600">the future.</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-light max-w-md leading-relaxed">
            Currently available for full-stack software engineering roles, distributed architecture design, and technical collaborations.
          </p>

          <div className="space-y-4 pt-4">
            
            {/* Email item */}
            <div
              onClick={() => handleCopy(email, "Email")}
              className="border-b border-zinc-800/80 pb-4 flex justify-between items-center group cursor-pointer hover:border-zinc-700 transition"
            >
              <div>
                <span className="block text-[11px] font-code text-zinc-500 uppercase tracking-widest mb-1">
                  Email
                </span>
                <span className="text-base sm:text-lg font-heading text-white group-hover:text-zinc-300 transition">
                  {email}
                </span>
              </div>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-white hover:text-black font-code text-xs text-white transition flex items-center gap-1.5"
              >
                {copiedType === "Email" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone item */}
            <div
              onClick={() => handleCopy(phone, "Phone")}
              className="border-b border-zinc-800/80 pb-4 flex justify-between items-center group cursor-pointer hover:border-zinc-700 transition"
            >
              <div>
                <span className="block text-[11px] font-code text-zinc-500 uppercase tracking-widest mb-1">
                  Phone
                </span>
                <span className="text-base sm:text-lg font-heading text-white group-hover:text-zinc-300 transition">
                  {phone}
                </span>
              </div>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-white hover:text-black font-code text-xs text-white transition flex items-center gap-1.5"
              >
                {copiedType === "Phone" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Right Interactive Form Column */}
        <div>
          <SpotlightCard className="p-8 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 py-3.5 font-code text-sm focus:outline-none focus:border-white transition"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 py-3.5 font-code text-sm focus:outline-none focus:border-white transition"
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="Project details or message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 py-3.5 font-code text-sm focus:outline-none focus:border-white transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 sm:py-5 bg-white text-black font-bold font-code text-xs uppercase tracking-widest hover:bg-zinc-200 transition mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </SpotlightCard>
        </div>

      </div>
    </section>
  );
}

