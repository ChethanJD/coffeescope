/**
 * Supabase client for use in Server Components, Server Actions, and
 * Route Handlers. Reads/writes the user's session via cookies.
 *
 * Still uses only the public URL + anon key (RLS enforces access control).
 * For privileged operations that must bypass RLS, use lib/supabase/admin.ts
 * instead — and only from trusted server-only code.
 */
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

export async function createClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase server client is missing NEXT_PUBLIC_SUPABASE_URL or " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY. Copy .env.example to .env.local and fill them in."
    );
  }

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll can be called from a Server Component where cookies
          // can't be mutated. Safe to ignore if middleware refreshes
          // the session (see middleware.ts).
        }
      },
    },
  });
}
