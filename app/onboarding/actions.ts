"use server";

import { createFarm } from "@/services/farms";
import { updateMyPreferences } from "@/services/users";
import { onboardingSchema } from "@/lib/validation/farmSchemas";

export async function completeOnboarding(
  input: unknown
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = onboardingSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const farmResult = await createFarm(parsed.data.farm);
  if (!farmResult.ok) {
    return { ok: false, error: farmResult.error };
  }

  // Preferences are best-effort — onboarding shouldn't fail just because
  // the preferences upsert hiccups; the farm itself is already saved.
  await updateMyPreferences({
    priceAlertEnabled: parsed.data.priceAlertEnabled,
    weatherAlertEnabled: parsed.data.weatherAlertEnabled,
  });

  return { ok: true };
}
