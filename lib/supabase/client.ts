/**
 * Supabase client for use in Client Components.
 *
 * Uses only the public URL + anon key — safe to bundle into client-side
 * JavaScript. Never import the service-role key here.
 */
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase browser client is missing NEXT_PUBLIC_SUPABASE_URL or " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY. Copy .env.example to .env.local and fill them in."
    );
  }

  return createBrowserClient<Database>(url, anonKey);
}
