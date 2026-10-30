import { NextResponse } from "next/server";
import { PORTFOLIO_SYSTEM_PROMPT } from "@/data/systemPrompt";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const cleanPrompt = prompt.trim().toLowerCase();

    // Check if Gemini API key exists
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const { google } = await import("@ai-sdk/google");
        const { generateText } = await import("ai");

        const { text } = await generateText({
          model: google("gemini-1.5-flash"),
          system: PORTFOLIO_SYSTEM_PROMPT,
          prompt: cleanPrompt,
        });

        return NextResponse.json({ response: text });
      } catch (aiError) {
        console.warn("AI SDK call fallback:", aiError);
      }
    }

    // Smart Fallback Engine based on keywords
    let reply = "";
    if (cleanPrompt.includes("hire") || cleanPrompt.includes("job") || cleanPrompt.includes("opportunity")) {
      reply = `Prashant is actively open to Full-Stack Software Engineering roles. You can reach out directly via email at ${PORTFOLIO_DATA.personal.email} or call at ${PORTFOLIO_DATA.personal.phone}.`;
    } else if (cleanPrompt.includes("experience") || cleanPrompt.includes("work") || cleanPrompt.includes("sheryians") || cleanPrompt.includes("vinratech")) {
      reply = `Prashant has software development experience at VinraTech (building scalable web apps with React, Node.js, and TypeScript) and Sheryians Pvt. Limited (architecting an MCRS hiring platform and BullMQ/Redis worker pipelines).`;
    } else if (cleanPrompt.includes("skill") || cleanPrompt.includes("stack") || cleanPrompt.includes("technolog")) {
      reply = `Core tech stack includes Java, TypeScript, JavaScript, React.js, Next.js, Node.js, Express, MongoDB, PostgreSQL, Redis, BullMQ, AWS S3, and System Design.`;
    } else if (cleanPrompt.includes("project") || cleanPrompt.includes("jubilo") || cleanPrompt.includes("skyblog")) {
      reply = `Key featured projects include Jubilo (Next.js event platform with Cashfree payments), SkyBlog (Node.js/Express CMS with JWT & Brevo), Contact App REST system, and Skynexes EdTech UI.`;
    } else if (cleanPrompt.includes("contact") || cleanPrompt.includes("email") || cleanPrompt.includes("phone")) {
      reply = `Email: ${PORTFOLIO_DATA.personal.email} | Phone: ${PORTFOLIO_DATA.personal.phone} | GitHub: ${PORTFOLIO_DATA.personal.github}`;
    } else {
      reply = `Prashant Kr. Singh is a Full-Stack Software Engineer with an 8.1 CGPA in B.Tech, specialized in React, Next.js, Java, Node.js, and distributed queue architectures (BullMQ + Redis). How can I assist you with his background?`;
    }

    return NextResponse.json({ response: reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Failed to process chat query" },
      { status: 500 }
    );
  }
}

