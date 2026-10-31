import { ContactFormData } from "./validations";

/**
 * Enterprise Linear/Vercel-Grade Dark Aesthetic Email Template
 * Delivered to Prashant when someone submits a message.
 */
export function generateAdminLeadEmail({
  name,
  email,
  message,
}: ContactFormData): string {
  const dateStr = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #0c0c0e; border: 1px solid #222226; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 36px 36px 20px 36px;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 4px 10px; background-color: #18181b; border: 1px solid #27272a; border-radius: 9999px; font-size: 11px; font-weight: 600; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace;">
                      SYS_ALERT // PORTFOLIO_LEAD
                    </span>
                    <h1 style="margin: 16px 0 6px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                      New Incoming Client Inquiry
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #71717a;">
                      Received on ${dateStr} IST
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Identity Block -->
          <tr>
            <td style="padding: 0 36px 24px 36px;">
              <div style="background-color: #121215; border: 1px solid #1e1e23; border-radius: 12px; padding: 20px;">
                <table role="presentation" width="100%">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <span style="font-size: 11px; font-family: monospace; color: #71717a; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 4px;">From</span>
                      <span style="font-size: 16px; font-weight: 600; color: #ffffff;">${name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style="font-size: 11px; font-family: monospace; color: #71717a; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 4px;">Reply-To Email</span>
                      <a href="mailto:${email}" style="font-size: 14px; color: #818cf8; text-decoration: none; font-family: monospace;">${email}</a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 0 36px 32px 36px;">
              <span style="font-size: 11px; font-family: monospace; color: #71717a; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 10px;">Message Body</span>
              <div style="background-color: #070709; border: 1px solid #1a1a1f; border-left: 3px solid #818cf8; border-radius: 8px; padding: 20px; font-size: 14px; line-height: 1.6; color: #d4d4d8; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
${message}
              </div>
            </td>
          </tr>

          <!-- Quick Action CTA -->
          <tr>
            <td style="padding: 0 36px 36px 36px;" align="center">
              <table role="presentation" width="100%">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re:%20Inquiry%20via%20Portfolio%20-%20Prashant%20Singh" style="display: inline-block; background-color: #ffffff; color: #000000; font-size: 13px; font-weight: 700; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em; padding: 14px 32px; border-radius: 9999px; text-decoration: none;">
                      Reply Directly to ${name} ➔
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 36px; background-color: #08080a; border-top: 1px solid #18181b; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #52525b; font-family: monospace; letter-spacing: 0.05em;">
                Prashant Kr. Singh — Full-Stack Portfolio Automated Delivery Engine
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

/**
 * Enterprise Confirmation Email to the Recruiter/Client
 * Sent immediately after they submit the form.
 */
export function generateClientAcknowledgmentEmail({
  name,
}: {
  name: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Reaching Out</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ededed;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #0c0c0e; border: 1px solid #222226; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <tr>
            <td style="height: 3px; background: linear-gradient(90deg, #6366f1, #818cf8);"></td>
          </tr>

          <tr>
            <td style="padding: 40px 36px;">
              <div style="width: 38px; height: 38px; background-color: #121215; border: 1px solid #27272a; border-radius: 10px; text-align: center; line-height: 38px; font-size: 18px; margin-bottom: 24px;">
                ⚡
              </div>

              <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                Hi ${name}, thank you for reaching out.
              </h1>

              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.7; color: #a1a1aa; font-weight: 300;">
                I've received your note through my portfolio. As a Full-Stack Software Engineer, I actively monitor incoming inquiries and will review your message promptly.
              </p>

              <div style="background-color: #121215; border: 1px solid #1e1e23; border-radius: 10px; padding: 18px; margin-bottom: 28px;">
                <p style="margin: 0; font-size: 13px; color: #d4d4d8; line-height: 1.6;">
                  ⏱️ <strong>Typical response time:</strong> Within 12–24 business hours. If this is urgent, feel free to connect directly via my phone or LinkedIn below.
                </p>
              </div>

              <table role="presentation" width="100%" style="border-top: 1px solid #1a1a1f; padding-top: 24px;">
                <tr>
                  <td>
                    <span style="font-size: 14px; font-weight: 600; color: #ffffff; display: block;">Prashant Kr. Singh</span>
                    <span style="font-size: 12px; color: #71717a; font-family: monospace;">Full-Stack Software Engineer</span>
                    <div style="margin-top: 12px;">
                      <a href="https://github.com/PrashDevCode" style="color: #818cf8; text-decoration: none; font-size: 12px; font-family: monospace; margin-right: 16px;">GitHub</a>
                      <a href="https://www.linkedin.com/in/prashant-singh05/" style="color: #818cf8; text-decoration: none; font-size: 12px; font-family: monospace;">LinkedIn</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 18px 36px; background-color: #08080a; border-top: 1px solid #18181b; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #52525b; font-family: monospace;">
                Automated confirmation from Prashant Kr. Singh's engineering portfolio
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

