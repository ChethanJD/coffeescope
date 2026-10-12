import "server-only";

/**
 * Admin email notification abstraction. Uses Resend
 * (https://resend.com) when RESEND_API_KEY and CONTACT_NOTIFY_EMAIL are
 * both set (see .env.example). Swappable — nothing outside this file
 * knows which provider sends the email. If not configured, this silently
 * no-ops: the contact message is still saved to the database either way
 * (see services/contact), so nothing is lost — there's just no email
 * notification until a provider is wired up.
 */
export async function notifyAdminOfContactMessage(input: {
  name: string;
  email: string;
  message: string;
}): Promise<{ sent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !notifyEmail || !fromEmail) {
    return { sent: false };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: notifyEmail,
        reply_to: input.email,
        subject: `New CoffeeScope contact message from ${input.name}`,
        text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
      }),
    });

    return { sent: response.ok };
  } catch {
    return { sent: false };
  }
}
