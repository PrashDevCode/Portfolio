import { NextResponse } from "next/server";
import { getMessages } from "@/lib/db";

export async function GET() {
  try {
    const messages = await getMessages();
    return NextResponse.json({
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error("Messages retrieval error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve messages" },
      { status: 500 }
    );
  }
}

