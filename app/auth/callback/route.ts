import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Explicit allowlist of internal destinations the OAuth/email-link callback
 * is permitted to redirect to. Anything else — an external URL, a
 * protocol-relative URL (//evil.com), a javascript: URL, or any path not
 * on this list — falls back to /dashboard. This is a whitelist, not a
 * denylist: unrecognized input is rejected by default rather than pattern-
 * matched against a blocklist of "bad" schemes.
 */
const ALLOWED_REDIRECT_PATHS = new Set(["/dashboard", "/reset-password", "/onboarding", "/login"]);

function safeRedirectPath(value: string | null): string {
  if (!value) return "/dashboard";
  // Must be a same-origin, absolute path — reject protocol-relative
  // ("//host"), absolute URLs ("https://host", "javascript:"), and
  // anything that doesn't start with a single leading slash.
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("://")) {
    return "/dashboard";
  }
  const path = value.split("?")[0]!.split("#")[0]!;
  return ALLOWED_REDIRECT_PATHS.has(path) ? value : "/dashboard";
}

/**
 * Supabase OAuth (Google/GitHub) and email-link callbacks land here with a
 * `?code=...` param. Exchanging it for a session must happen server-side
 * so the session cookie can be set on the response.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeRedirectPath(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
