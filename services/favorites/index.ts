import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { FavoriteMarket } from "@/types/models";

function mapRow(row: {
  id: string;
  user_id: string;
  variety_id: string;
  market_location_id: string | null;
  created_at: string;
}): FavoriteMarket {
  return {
    id: row.id,
    userId: row.user_id,
    varietyId: row.variety_id,
    marketLocationId: row.market_location_id,
    createdAt: row.created_at,
  };
}

export interface FavoriteMarketsResult {
  favorites: FavoriteMarket[];
  source: "database" | "unavailable";
}

/** The signed-in user's favorited variety/location pairs. */
export async function getMyFavoriteMarkets(): Promise<FavoriteMarketsResult> {
  if (!isSupabaseConfigured()) {
    return { favorites: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { favorites: [], source: "unavailable" };

    const { data, error } = await supabase
      .from("favorite_markets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error || !data) return { favorites: [], source: "unavailable" };

    return { favorites: data.map(mapRow), source: "database" };
  } catch {
    return { favorites: [], source: "unavailable" };
  }
}

export type FavoriteMarketResult =
  | { ok: true; favorite: FavoriteMarket }
  | { ok: false; error: string };

/** Adds a variety (optionally scoped to a location) to the signed-in user's favorites. */
export async function addFavoriteMarket(
  varietyId: string,
  marketLocationId?: string
): Promise<FavoriteMarketResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Favorites are not available yet." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false, error: "You must be signed in to save a favorite market." };
    }

    const { data, error } = await supabase
      .from("favorite_markets")
      .insert({
        user_id: user.id,
        variety_id: varietyId,
        market_location_id: marketLocationId ?? null,
      })
      .select("*")
      .single();

    if (error || !data) {
      return { ok: false, error: "Could not save favorite. Please try again." };
    }

    return { ok: true, favorite: mapRow(data) };
  } catch {
    return { ok: false, error: "Could not save favorite. Please try again." };
  }
}

/** Removes a favorite. RLS restricts this to the row's own owner. */
export async function removeFavoriteMarket(id: string): Promise<{ ok: boolean }> {
  if (!isSupabaseConfigured()) return { ok: false };

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("favorite_markets").delete().eq("id", id);
    return { ok: !error };
  } catch {
    return { ok: false };
  }
}
