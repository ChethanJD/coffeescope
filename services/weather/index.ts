import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { WeatherRecord } from "@/types/models";

/**
 * Weather data architecture.
 *
 * Unlike market prices, weather has no safe "demo" fallback here: a
 * fabricated temperature/rainfall reading presented as current conditions
 * would be misinformation, not a harmless placeholder. When the database
 * (or a future external provider feeding it) has no data, callers get
 * `source: "unavailable"` and should render a clear empty state — never
 * invented numbers. The existing UI continues to run on lib/data/mockWeather.ts
 * until this is wired up on the frontend; that mock data is clearly
 * illustrative content, not something this service produces.
 */

export interface WeatherResult {
  records: WeatherRecord[];
  source: "database" | "unavailable";
}

function mapRow(row: {
  id: string;
  market_location_id: string;
  temperature: number | null;
  humidity: number | null;
  rainfall: number | null;
  wind_speed: number | null;
  recorded_at: string;
}): WeatherRecord {
  return {
    id: row.id,
    marketLocationId: row.market_location_id,
    temperature: row.temperature === null ? null : Number(row.temperature),
    humidity: row.humidity === null ? null : Number(row.humidity),
    rainfall: row.rainfall === null ? null : Number(row.rainfall),
    windSpeed: row.wind_speed === null ? null : Number(row.wind_speed),
    recordedAt: row.recorded_at,
  };
}

/** Most recent weather reading for a location. */
export async function getLatestWeather(marketLocationId: string): Promise<{
  record: WeatherRecord | null;
  source: "database" | "unavailable";
}> {
  if (!isSupabaseConfigured()) {
    return { record: null, source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("weather_records")
      .select("*")
      .eq("market_location_id", marketLocationId)
      .order("recorded_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return { record: null, source: "unavailable" };
    }

    return { record: mapRow(data), source: "database" };
  } catch {
    return { record: null, source: "unavailable" };
  }
}

/** Weather history for a location over the last N days (for trend charts). */
export async function getWeatherHistory(
  marketLocationId: string,
  days = 7
): Promise<WeatherResult> {
  if (!isSupabaseConfigured()) {
    return { records: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const since = new Date();
    since.setDate(since.getDate() - days);

    const { data, error } = await supabase
      .from("weather_records")
      .select("*")
      .eq("market_location_id", marketLocationId)
      .gte("recorded_at", since.toISOString())
      .order("recorded_at", { ascending: true });

    if (error || !data) {
      return { records: [], source: "unavailable" };
    }

    return { records: data.map(mapRow), source: "database" };
  } catch {
    return { records: [], source: "unavailable" };
  }
}
