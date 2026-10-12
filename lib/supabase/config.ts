/**
 * Whether Supabase is configured in the current environment.
 *
 * Used by services (lib/services/*) to decide between real database
 * queries and the safe mock-data fallback, so the app never crashes
 * during local development without a database configured.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
