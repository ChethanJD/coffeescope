/**
 * SERVER-ONLY Supabase admin client using the service-role key.
 *
 * This bypasses Row Level Security entirely. Never import this file from
 * a Client Component, never send its results directly to the browser
 * without filtering, and never log or expose SUPABASE_SERVICE_ROLE_KEY.
 *
 * Valid uses: trusted server-side jobs (e.g. syncing a new user's profile
 * after signup, admin-only API routes that re-check the caller's role
 * server-side first, cron/ingestion jobs writing market/weather data).
 *
 * The "server-only" import below makes any accidental client-side import
 * fail the build instead of silently shipping the service-role key.
 */
import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

let cachedAdminClient: ReturnType<typeof createSupabaseClient<Database>> | null = null;

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase admin client is missing NEXT_PUBLIC_SUPABASE_URL or " +
        "SUPABASE_SERVICE_ROLE_KEY. This client must only run on the server."
    );
  }

  if (!cachedAdminClient) {
    cachedAdminClient = createSupabaseClient<Database>(url, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  return cachedAdminClient;
}
