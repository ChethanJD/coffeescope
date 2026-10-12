"use server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentProfile } from "@/lib/auth/session";
import { getMyFarms, createFarm, updateFarm, deleteFarm } from "@/services/farms";
import { getCoffeeVarieties } from "@/services/market";
import { farmSchema, type FarmInput } from "@/lib/validation/farmSchemas";
import { getMyAlertRules, createAlertRule, toggleAlertRule } from "@/services/alerts";
import type {
  CreateAlertRuleInput,
  ToggleAlertRuleInput,
} from "@/lib/validation/alertSchemas";
import { getMyNotifications, markNotificationRead } from "@/services/notifications";
import { getMyFavoriteMarkets, addFavoriteMarket, removeFavoriteMarket } from "@/services/favorites";
import type { Profile } from "@/types/models";

export async function getDashboardProfile(): Promise<Profile | null> {
  return getCurrentProfile();
}

export async function updateDashboardProfile(input: {
  fullName: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Profile editing is not available yet." };
  }

  const fullName = input.fullName.trim();
  if (fullName.length < 2) {
    return { ok: false, error: "Name must be at least 2 characters." };
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
      .update({ full_name: fullName })
      .eq("id", user.id);

    if (error) {
      return { ok: false, error: "Could not update profile. Please try again." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Could not update profile. Please try again." };
  }
}

export async function getDashboardFarms() {
  return getMyFarms();
}

export async function getDashboardVarieties() {
  return getCoffeeVarieties();
}

export async function addDashboardFarm(input: FarmInput) {
  const parsed = farmSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid farm data" };
  }
  return createFarm(parsed.data);
}

export async function editDashboardFarm(id: string, input: Partial<FarmInput>) {
  return updateFarm(id, input);
}

export async function deleteDashboardFarm(id: string) {
  return deleteFarm(id);
}

export async function getDashboardAlerts() {
  return getMyAlertRules();
}

export async function addDashboardAlert(input: CreateAlertRuleInput) {
  return createAlertRule(input);
}

export async function toggleDashboardAlert(input: ToggleAlertRuleInput) {
  return toggleAlertRule(input);
}

export async function getDashboardNotifications() {
  return getMyNotifications();
}

export async function markDashboardNotificationRead(id: string) {
  return markNotificationRead(id);
}

import { getMyPredictionHistory } from "@/services/forecast";

import { getMyDashboardStats } from "@/services/analytics";

export async function getDashboardStats() {
  return getMyDashboardStats();
}

export async function getDashboardPredictionHistory() {
  return getMyPredictionHistory();
}

export async function getDashboardFavoriteMarkets() {
  return getMyFavoriteMarkets();
}

export async function addDashboardFavoriteMarket(varietyId: string, marketLocationId?: string) {
  return addFavoriteMarket(varietyId, marketLocationId);
}

export async function removeDashboardFavoriteMarket(id: string) {
  return removeFavoriteMarket(id);
}
