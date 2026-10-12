import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  contactMessageSchema,
  newsletterSchema,
  type ContactMessageInput,
  type NewsletterInput,
} from "@/lib/validation/contactSchemas";
import { notifyAdminOfContactMessage } from "@/services/contact/emailProvider";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * Stores a contact form submission. Anyone can call this (RLS allows
 * anonymous insert; see supabase/migrations/0006_engagement_tables.sql) —
 * nothing is emailed yet, an admin (or a future email-forwarding job)
 * reads these from the database.
 */
export async function submitContactMessage(input: ContactMessageInput): Promise<SubmitResult> {
  const parsed = contactMessageSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid message" };
  }

  // Honeypot tripped — a real visitor never fills this in. Pretend success
  // so the bot doesn't learn anything, but don't actually write anything.
  if (parsed.data.honeypot) {
    return { ok: true };
  }

  const humanVerified = await verifyTurnstileToken(parsed.data.turnstileToken);
  if (!humanVerified) {
    return { ok: false, error: "Verification failed. Please try again." };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "This form isn't connected yet." };
  }

  try {
    const supabase = await createClient();

    // Simple abuse guard: block a second submission from the same email
    // within 60 seconds. No new table/column needed — just checks the
    // same rows this form already writes.
    const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString();
    const { count } = await supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("email", parsed.data.email)
      .gte("created_at", oneMinuteAgo);

    if (count && count > 0) {
      return { ok: false, error: "Please wait a moment before sending another message." };
    }

    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    });

    if (error) {
      return { ok: false, error: "Could not send your message. Please try again." };
    }

    // Best-effort — the message is already safely stored above regardless
    // of whether an email provider is configured or this call succeeds.
    notifyAdminOfContactMessage(parsed.data).catch(() => {});

    return { ok: true };
  } catch {
    return { ok: false, error: "Could not send your message. Please try again." };
  }
}

/** Stores a newsletter signup. Silently succeeds on a duplicate email. */
export async function subscribeToNewsletter(input: NewsletterInput): Promise<SubmitResult> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid email" };
  }

  if (parsed.data.honeypot) {
    return { ok: true };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Newsletter signup isn't connected yet." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.email });

    // Unique-violation on a repeat email is a success from the user's
    // perspective — they're already subscribed.
    if (error && error.code !== "23505") {
      return { ok: false, error: "Could not subscribe. Please try again." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Could not subscribe. Please try again." };
  }
}
