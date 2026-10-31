import { Resend } from "resend";
import { ContactFormData } from "./validations";
import {
  generateAdminLeadEmail,
  generateClientAcknowledgmentEmail,
} from "./emailTemplates";

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// The registered Resend destination email for system notifications
const RESEND_REGISTERED_EMAIL = "prashantsinghberath@gmail.com";
// Default onboarding sender provided by Resend free tier
const FROM_EMAIL = process.env.FROM_EMAIL || "Prashant Portfolio <onboarding@resend.dev>";

export async function sendContactNotificationEmails(data: ContactFormData) {
  if (!resend) {
    console.warn("[Resend Warning] RESEND_API_KEY missing. Skipping email dispatch.");
    return { success: false, reason: "Missing API Key" };
  }

  try {
    // 1. Send Alert Email to your verified Resend inbox
    const adminEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: [RESEND_REGISTERED_EMAIL],
      replyTo: data.email,
      subject: `⚡ New Portfolio Lead from ${data.name}`,
      html: generateAdminLeadEmail(data),
    });

    console.log("[Resend Response]", {
      adminData: adminEmailResult.data,
      adminError: adminEmailResult.error,
    });

    if (adminEmailResult.error) {
      console.error("[Resend Admin Error]", adminEmailResult.error);
      return { success: false, error: adminEmailResult.error };
    }

    return { success: true, id: adminEmailResult.data?.id };
  } catch (error) {
    console.error("[Email Error] Failed to send email via Resend:", error);
    return { success: false, error };
  }
}

