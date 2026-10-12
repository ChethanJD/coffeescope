"use client";

import { createClient } from "@/lib/supabase/client";
import type { LoginValues, SignupValues } from "@/lib/validation/authSchemas";

/**
 * Real Supabase auth, replacing lib/auth/mockAuth.ts.
 *
 * Kept as small wrapper functions with the same call shape as the mock
 * versions (accept the validated form values, throw on failure) so the
 * existing form components only need an import swap, not a rewrite.
 */

export async function login(values: LoginValues) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { user: data.user };
}

export async function signup(values: SignupValues) {
  const supabase = createClient();

  // full_name is passed as user metadata only — the profile row itself is
  // created server-side by the handle_new_user() trigger (supabase/migrations
  // /0002_profile_on_signup.sql), which always defaults role to 'user'.
  // The client never sends a role, so it can never grant itself one.
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: { full_name: values.name },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { user: data.user };
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function requestPasswordReset(email: string) {
  const supabase = createClient();
  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback?next=/reset-password`
      : undefined;

  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) {
    throw new Error(error.message);
  }
}

export async function updatePassword(newPassword: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    throw new Error(error.message);
  }
}
