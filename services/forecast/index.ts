import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { PriceForecast } from "@/types/models";

/**
 * AI forecast architecture.
 *
 * This service only reads price_forecasts written by a future ML
 * forecasting pipeline (see the diagram in the project brief: historical
 * market + weather data -> forecasting service -> price_forecasts table).
 * It never computes or fabricates a prediction itself — with no forecasting
 * pipeline connected yet, callers get `source: "unavailable"`, and the UI's
 * existing lib/data/mockPrediction.ts remains clearly illustrative demo
 * content until a real model is wired up.
 */

export interface ForecastResult {
  forecasts: PriceForecast[];
  source: "database" | "unavailable";
}

function mapRow(row: {
  id: string;
  variety_id: string;
  market_location_id: string;
  forecast_date: string;
  predicted_price_per_kg_inr: number;
  predicted_price_per_quintal_inr: number;
  confidence: number | null;
  model_version: string;
}): PriceForecast {
  return {
    id: row.id,
    varietyId: row.variety_id,
    marketLocationId: row.market_location_id,
    forecastDate: row.forecast_date,
    predictedPricePerKgInr: Number(row.predicted_price_per_kg_inr),
    predictedPricePerQuintalInr: Number(row.predicted_price_per_quintal_inr),
    confidence: row.confidence === null ? null : Number(row.confidence),
    modelVersion: row.model_version,
  };
}

export interface SavedPredictionRow {
  id: string;
  note: string | null;
  savedAt: string;
  forecast: PriceForecast | null;
}

/**
 * The signed-in user's saved prediction history — real saved_predictions
 * rows joined to their price_forecasts. There is no automatic actual-vs-
 * predicted accuracy job yet, so this never computes or displays a
 * fabricated "accuracy" figure; it only shows what was actually predicted
 * and saved.
 */
export async function getMyPredictionHistory(): Promise<{
  rows: SavedPredictionRow[];
  source: "database" | "unavailable";
}> {
  if (!isSupabaseConfigured()) {
    return { rows: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { rows: [], source: "unavailable" };

    const { data, error } = await supabase
      .from("saved_predictions")
      .select("id, note, created_at, price_forecasts(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error || !data) return { rows: [], source: "unavailable" };

    const rows: SavedPredictionRow[] = data.map((row) => {
      const forecastRow = Array.isArray(row.price_forecasts)
        ? row.price_forecasts[0]
        : row.price_forecasts;
      return {
        id: row.id,
        note: row.note,
        savedAt: row.created_at,
        forecast: forecastRow
          ? {
              id: forecastRow.id,
              varietyId: forecastRow.variety_id,
              marketLocationId: forecastRow.market_location_id,
              forecastDate: forecastRow.forecast_date,
              predictedPricePerKgInr: Number(forecastRow.predicted_price_per_kg_inr),
              predictedPricePerQuintalInr: Number(forecastRow.predicted_price_per_quintal_inr),
              confidence:
                forecastRow.confidence === null ? null : Number(forecastRow.confidence),
              modelVersion: forecastRow.model_version,
            }
          : null,
      };
    });

    return { rows, source: "database" };
  } catch {
    return { rows: [], source: "unavailable" };
  }
}

export interface GetForecastsParams {
  varietyId: string;
  marketLocationId: string;
  /** Defaults to the latest model_version present for this pair when omitted. */
  modelVersion?: string;
}

/** Upcoming forecasts for a variety/location, most recent forecast_date first. */
export async function getForecasts(params: GetForecastsParams): Promise<ForecastResult> {
  if (!isSupabaseConfigured()) {
    return { forecasts: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("price_forecasts")
      .select("*")
      .eq("variety_id", params.varietyId)
      .eq("market_location_id", params.marketLocationId)
      .gte("forecast_date", new Date().toISOString().slice(0, 10))
      .order("forecast_date", { ascending: true });

    if (params.modelVersion) {
      query = query.eq("model_version", params.modelVersion);
    }

    const { data, error } = await query;

    if (error || !data) {
      return { forecasts: [], source: "unavailable" };
    }

    return { forecasts: data.map(mapRow), source: "database" };
  } catch {
    return { forecasts: [], source: "unavailable" };
  }
}
