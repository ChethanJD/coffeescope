import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Profile } from "@/types/models";

/** The signed-in user's auth identity, or null if not signed in / not configured. */
export async function getCurrentUser() {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

/** The signed-in user's profile row (role, name, etc.), or null. */
export async function getCurrentProfile(): Promise<Profile | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      fullName: data.full_name,
      email: data.email,
      role: data.role,
      avatarUrl: data.avatar_url,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch {
    return null;
  }
}

/**
 * Redirects to /login when Supabase is configured and the visitor isn't
 * signed in. When Supabase isn't configured (local dev without a database),
 * this no-ops so the page continues to render on demo data — consistent
 * with the rest of the app's fallback pattern.
 */
export async function requireUser(redirectTo = "/login") {
  if (!isSupabaseConfigured()) return null;

  const user = await getCurrentUser();
  if (!user) {
    redirect(redirectTo);
  }
  return user;
}
