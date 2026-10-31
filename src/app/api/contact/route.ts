import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { saveMessage } from "@/lib/db";
import { sendContactNotificationEmails } from "@/lib/mailer";
import { checkRateLimit } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Protection (Anti-Spam / Anti-DDoS)
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous_client";
    const { success: isAllowed } = await checkRateLimit(ip);

    if (!isAllowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. You can only send 3 messages per minute. Please try again later.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // 1. Permanently Save to Database (Supabase PostgreSQL / Persistent Storage)
    const saved = await saveMessage(result.data);

    // 2. Dispatch High-End Transactional Emails via Resend (To Admin + Auto-reply to Client)
    await sendContactNotificationEmails(result.data);

    // 3. Optional Instant Alert Webhook (Discord / Telegram)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📬 **New Portfolio Lead!**\n**From:** ${name} (<${email}>)\n**Storage:** ${saved.source}\n**Message:**\n${message}`,
          }),
        });
      } catch (err) {
        console.error("Webhook notification error:", err);
      }
    }

    console.log(`[DB Stored] ID: ${saved.id} from ${name} (${email})`);

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! I will respond promptly.",
      id: saved.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
