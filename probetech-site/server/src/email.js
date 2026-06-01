import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

// Where the notification lands (your inbox) and the verified sender.
const TO = process.env.NOTIFY_TO || "hello@yourdomain.com";
const FROM = process.env.NOTIFY_FROM || "Portfolio <onboarding@resend.dev>";

export async function sendNotification({ name, email, type, message }) {
  if (!resend) {
    console.warn("⚠️  RESEND_API_KEY missing — skipping email, submission still stored.");
    return { sent: false, reason: "no_api_key" };
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      reply_to: email, // so you can reply straight to the visitor
      subject: `New enquiry — ${type} — from ${name}`,
      text:
        `New contact form submission:\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Project type: ${type}\n\n` +
        `Message:\n${message}\n`,
    });
    return { sent: true };
  } catch (err) {
    console.error("Email send failed:", err.message);
    return { sent: false, reason: err.message };
  }
}
