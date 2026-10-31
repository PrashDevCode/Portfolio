import { NextResponse } from "next/server";
import { PORTFOLIO_SYSTEM_PROMPT } from "@/data/systemPrompt";
import { queryLocalKnowledgeBase } from "@/lib/knowledgeBase";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const cleanPrompt = prompt.trim();

    // 1. Check if Cloud Gemini API key exists
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

        return NextResponse.json({
          response: text,
          title: "Gemini 1.5 Flash Copilot",
          isLiveAI: true,
        });
      } catch (aiError) {
        console.warn("AI SDK live call fallback:", aiError);
      }
    }

    // 2. Intelligent Local Neural Knowledge Engine (RAG-like retrieval)
    const result = queryLocalKnowledgeBase(cleanPrompt);

    return NextResponse.json({
      response: result.response,
      title: result.title,
      suggestedActions: result.suggestedActions,
      isLiveAI: false,
    });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Failed to process chat query" },
      { status: 500 }
    );
  }
}
