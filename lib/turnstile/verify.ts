import "server-only";

/**
 * Cloudflare Turnstile verification. Active only when both
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY (client) and TURNSTILE_SECRET_KEY
 * (server) are set (see .env.example) — get both free at
 * https://dash.cloudflare.com/?to=/:account/turnstile.
 *
 * When not configured, verification is skipped entirely (returns true)
 * and the form falls back to the honeypot + rate-limit checks already in
 * place — never blocks real submissions just because Turnstile isn't
 * set up yet.
 */
export async function verifyTurnstileToken(token: string | undefined): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: secretKey, response: token }),
      }
    );
    const data = await response.json();
    return data?.success === true;
  } catch {
    // Provider unreachable — fail closed on a real submission attempt
    // would block legitimate users during a Cloudflare outage; fail open
    // instead, same as "not configured".
    return true;
  }
}
