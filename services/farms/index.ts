import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Farm } from "@/types/models";
import { farmSchema, type FarmInput } from "@/lib/validation/farmSchemas";

function mapRow(row: {
  id: string;
  owner_id: string;
  name: string;
  country: string;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  area_hectares: number | null;
  primary_variety_id: string | null;
  created_at: string;
  updated_at: string;
}): Farm {
  return {
    id: row.id,
    ownerId: row.owner_id,
    name: row.name,
    country: row.country,
    region: row.region,
    latitude: row.latitude === null ? null : Number(row.latitude),
    longitude: row.longitude === null ? null : Number(row.longitude),
    areaHectares: row.area_hectares === null ? null : Number(row.area_hectares),
    primaryVarietyId: row.primary_variety_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export interface FarmsResult {
  farms: Farm[];
  source: "database" | "unavailable";
}

/** The signed-in user's own farms. */
export async function getMyFarms(): Promise<FarmsResult> {
  if (!isSupabaseConfigured()) {
    return { farms: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { farms: [], source: "unavailable" };

    const { data, error } = await supabase
      .from("farms")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: true });

    if (error || !data) return { farms: [], source: "unavailable" };

    return { farms: data.map(mapRow), source: "database" };
  } catch {
    return { farms: [], source: "unavailable" };
  }
}

/**
 * Whether the signed-in user has completed farm onboarding (has at least
 * one farm). Used to redirect new signups into /onboarding. Returns true
 * when Supabase isn't configured, so local demo mode isn't gated.
 */
export async function hasCompletedOnboarding(): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return true; // nothing to onboard if not signed in; requireUser handles that separately

    const { count, error } = await supabase
      .from("farms")
      .select("id", { count: "exact", head: true })
      .eq("owner_id", user.id);

    if (error) return true; // fail open — never block the dashboard on a transient error
    return (count ?? 0) > 0;
  } catch {
    return true;
  }
}

export type CreateFarmResult = { ok: true; farm: Farm } | { ok: false; error: string };

/** Creates a farm owned by the currently signed-in user. */
export async function createFarm(input: FarmInput): Promise<CreateFarmResult> {
  const parsed = farmSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid farm data" };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Farms are not available yet." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false, error: "You must be signed in to add a farm." };
    }

    const { data, error } = await supabase
      .from("farms")
      .insert({
        owner_id: user.id,
        name: parsed.data.name,
        country: parsed.data.country,
        region: parsed.data.region ?? null,
        latitude: parsed.data.latitude ?? null,
        longitude: parsed.data.longitude ?? null,
        area_hectares: parsed.data.areaHectares ?? null,
        primary_variety_id: parsed.data.primaryVarietyId ?? null,
      })
      .select("*")
      .single();

    if (error || !data) {
      return { ok: false, error: "Could not save farm. Please try again." };
    }

    return { ok: true, farm: mapRow(data) };
  } catch {
    return { ok: false, error: "Could not save farm. Please try again." };
  }
}

/**
 * Updates a farm owned by the currently signed-in user. Partial — only
 * fields present in `input` are changed. RLS restricts this to the farm's
 * own owner regardless of what's sent.
 */
export async function updateFarm(
  id: string,
  input: Partial<FarmInput>
): Promise<CreateFarmResult> {
  const parsed = farmSchema.partial().safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid farm data" };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Farms are not available yet." };
  }

  try {
    const supabase = await createClient();
    const updates: {
      name?: string;
      country?: string;
      region?: string | null;
      latitude?: number | null;
      longitude?: number | null;
      area_hectares?: number | null;
      primary_variety_id?: string | null;
    } = {};
    if (parsed.data.name !== undefined) updates.name = parsed.data.name;
    if (parsed.data.country !== undefined) updates.country = parsed.data.country;
    if (parsed.data.region !== undefined) updates.region = parsed.data.region ?? null;
    if (parsed.data.latitude !== undefined) updates.latitude = parsed.data.latitude ?? null;
    if (parsed.data.longitude !== undefined) updates.longitude = parsed.data.longitude ?? null;
    if (parsed.data.areaHectares !== undefined) {
      updates.area_hectares = parsed.data.areaHectares ?? null;
    }
    if (parsed.data.primaryVarietyId !== undefined) {
      updates.primary_variety_id = parsed.data.primaryVarietyId ?? null;
    }

    const { data, error } = await supabase
      .from("farms")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error || !data) {
      return { ok: false, error: "Could not update farm. Please try again." };
    }

    return { ok: true, farm: mapRow(data) };
  } catch {
    return { ok: false, error: "Could not update farm. Please try again." };
  }
}

/** Deletes a farm. RLS restricts this to the farm's own owner. */
export async function deleteFarm(id: string): Promise<{ ok: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Farms are not available yet." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("farms").delete().eq("id", id);
    if (error) {
      return { ok: false, error: "Could not delete farm. Please try again." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not delete farm. Please try again." };
  }
}
