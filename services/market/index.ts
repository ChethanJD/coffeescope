import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { MOCK_QUOTES } from "@/lib/data/mockMarket";
import type { MarketQuote } from "@/types";
import type { MarketLocation, MarketPrice, CoffeeVariety } from "@/types/models";

export interface LatestPricesResult {
  quotes: MarketQuote[];
  /** "database" = real Supabase data. "demo" = mock fallback (no DB configured, or DB empty/unreachable). */
  source: "database" | "demo";
}

/**
 * Latest price per coffee variety, formatted for the existing MarketCard UI.
 * Falls back to demo data instead of throwing, so the UI never crashes
 * when Supabase isn't configured yet.
 */
export async function getLatestPrices(): Promise<LatestPricesResult> {
  if (!isSupabaseConfigured()) {
    return { quotes: MOCK_QUOTES, source: "demo" };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("market_prices")
      .select(
        "price_per_kg_inr, change_daily_percent, change_weekly_percent, recorded_at, coffee_varieties(name)"
      )
      .order("recorded_at", { ascending: false })
      .limit(50);

    if (error || !data || data.length === 0) {
      return { quotes: MOCK_QUOTES, source: "demo" };
    }

    // Keep only the most recent row per variety name.
    const latestByVariety = new Map<string, (typeof data)[number]>();
    for (const row of data) {
      const varietyName = (row as { coffee_varieties?: { name?: string } | null })
        .coffee_varieties?.name;
      if (varietyName && !latestByVariety.has(varietyName)) {
        latestByVariety.set(varietyName, row);
      }
    }

    if (latestByVariety.size === 0) {
      return { quotes: MOCK_QUOTES, source: "demo" };
    }

    const quotes: MarketQuote[] = Array.from(latestByVariety.entries()).map(
      ([varietyName, row]) => ({
        variety: varietyName as MarketQuote["variety"],
        price: Number(row.price_per_kg_inr),
        changeDaily: Number(row.change_daily_percent ?? 0),
        changeWeekly: Number(row.change_weekly_percent ?? 0),
        currency: "INR",
        // Sparkline needs a real historical series — see getHistoricalPrices.
        // Until charts are wired to it, keep the array empty rather than
        // inventing points.
        sparkline: [],
      })
    );

    return { quotes, source: "database" };
  } catch {
    // Network/config failure — never break the page for this.
    return { quotes: MOCK_QUOTES, source: "demo" };
  }
}

export interface HistoricalPricesParams {
  varietyId: string;
  marketLocationId: string;
  range: "7d" | "30d" | "90d" | "1y";
}

const RANGE_TO_DAYS: Record<HistoricalPricesParams["range"], number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
  "1y": 365,
};

/**
 * Historical price series for charts. Returns an empty array (not mock
 * data) when unavailable — historical accuracy matters more here than
 * always having something to plot, and charts already have empty states.
 */
export async function getHistoricalPrices(
  params: HistoricalPricesParams
): Promise<{ prices: MarketPrice[]; source: "database" | "unavailable" }> {
  if (!isSupabaseConfigured()) {
    return { prices: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const since = new Date();
    since.setDate(since.getDate() - RANGE_TO_DAYS[params.range]);

    const { data, error } = await supabase
      .from("market_prices")
      .select("*")
      .eq("variety_id", params.varietyId)
      .eq("market_location_id", params.marketLocationId)
      .gte("recorded_at", since.toISOString())
      .order("recorded_at", { ascending: true });

    if (error || !data) {
      return { prices: [], source: "unavailable" };
    }

    const prices: MarketPrice[] = data.map((row) => ({
      id: row.id,
      varietyId: row.variety_id,
      marketLocationId: row.market_location_id,
      pricePerKgInr: Number(row.price_per_kg_inr),
      pricePerQuintalInr: Number(row.price_per_quintal_inr),
      changeDailyPercent: row.change_daily_percent === null ? null : Number(row.change_daily_percent),
      changeWeeklyPercent:
        row.change_weekly_percent === null ? null : Number(row.change_weekly_percent),
      recordedAt: row.recorded_at,
    }));

    return { prices, source: "database" };
  } catch {
    return { prices: [], source: "unavailable" };
  }
}

/** All known market locations. Empty array (not mock) when unavailable. */
export async function getMarketLocations(): Promise<{
  locations: MarketLocation[];
  source: "database" | "unavailable";
}> {
  if (!isSupabaseConfigured()) {
    return { locations: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("market_locations").select("*");

    if (error || !data) {
      return { locations: [], source: "unavailable" };
    }

    const locations: MarketLocation[] = data.map((row) => ({
      id: row.id,
      marketName: row.market_name,
      city: row.city,
      state: row.state,
      country: row.country,
      latitude: row.latitude,
      longitude: row.longitude,
    }));

    return { locations, source: "database" };
  } catch {
    return { locations: [], source: "unavailable" };
  }
}

/** All coffee varieties (Arabica, Robusta, etc.) — used to populate dropdowns. */
export async function getCoffeeVarieties(): Promise<{
  varieties: CoffeeVariety[];
  source: "database" | "unavailable";
}> {
  if (!isSupabaseConfigured()) {
    return { varieties: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("coffee_varieties").select("*").order("name");

    if (error || !data) {
      return { varieties: [], source: "unavailable" };
    }

    const varieties: CoffeeVariety[] = data.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      origin: row.origin,
    }));

    return { varieties, source: "database" };
  } catch {
    return { varieties: [], source: "unavailable" };
  }
}
