import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { UserPreferences } from "@/types/models";
import {
  updatePreferencesSchema,
  type UpdatePreferencesInput,
} from "@/lib/validation/userSchemas";

export { getCurrentUser, getCurrentProfile, requireUser } from "@/lib/auth/session";

export type UpdateProfileResult =
  | { ok: true }
  | { ok: false; error: string };

/** Updates the signed-in user's own display name. Nothing else on profiles is user-editable. */
export async function updateMyProfile(fullName: string): Promise<UpdateProfileResult> {
  const trimmed = fullName.trim();
  if (trimmed.length < 1 || trimmed.length > 200) {
    return { ok: false, error: "Name must be between 1 and 200 characters" };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Profile editing is not available yet." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false, error: "You must be signed in to edit your profile." };
    }

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: trimmed })
      .eq("id", user.id);

    if (error) {
      return { ok: false, error: "Could not update profile." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Could not update profile." };
  }
}

/** The signed-in user's preferences row, or null if unset/unavailable. */
export async function getMyPreferences(): Promise<UserPreferences | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !data) return null;

    return {
      id: data.id,
      userId: data.user_id,
      preferredMarket: data.preferred_market,
      preferredVariety: data.preferred_variety,
      priceAlertEnabled: data.price_alert_enabled,
      weatherAlertEnabled: data.weather_alert_enabled,
    };
  } catch {
    return null;
  }
}

export type UpdatePreferencesResult =
  | { ok: true; preferences: UserPreferences }
  | { ok: false; error: string };

/** Upserts the signed-in user's preferences. user_id always comes from the session. */
export async function updateMyPreferences(
  input: UpdatePreferencesInput
): Promise<UpdatePreferencesResult> {
  const parsed = updatePreferencesSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid preferences" };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Preferences are not available yet." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false, error: "You must be signed in to update preferences." };
    }

    const { data, error } = await supabase
      .from("user_preferences")
      .upsert(
        {
          user_id: user.id,
          preferred_market: parsed.data.preferredMarket ?? null,
          preferred_variety: parsed.data.preferredVariety ?? null,
          price_alert_enabled: parsed.data.priceAlertEnabled ?? false,
          weather_alert_enabled: parsed.data.weatherAlertEnabled ?? false,
        },
        { onConflict: "user_id" }
      )
      .select("*")
      .single();

    if (error || !data) {
      return { ok: false, error: "Could not update preferences." };
    }

    return {
      ok: true,
      preferences: {
        id: data.id,
        userId: data.user_id,
        preferredMarket: data.preferred_market,
        preferredVariety: data.preferred_variety,
        priceAlertEnabled: data.price_alert_enabled,
        weatherAlertEnabled: data.weather_alert_enabled,
      },
    };
  } catch {
    return { ok: false, error: "Could not update preferences." };
  }
}
