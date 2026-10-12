import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export interface DashboardStats {
  farmsCount: number;
  activeAlertsCount: number;
  myListingsCount: number;
  savedPredictionsCount: number;
}

/**
 * Real, countable stats for the signed-in user — deliberately NOT a
 * "portfolio value" or "prediction accuracy" figure, since nothing in the
 * schema supports computing those honestly yet (no holdings/quantities
 * owned, no actual-vs-predicted comparison job). Only counts of the
 * user's own real rows.
 */
export async function getMyDashboardStats(): Promise<{
  stats: DashboardStats | null;
  source: "database" | "unavailable";
}> {
  if (!isSupabaseConfigured()) {
    return { stats: null, source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { stats: null, source: "unavailable" };

    const [farms, alerts, listings, predictions] = await Promise.all([
      supabase.from("farms").select("id", { count: "exact", head: true }).eq("owner_id", user.id),
      supabase
        .from("alert_rules")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_active", true),
      supabase
        .from("marketplace_products")
        .select("id", { count: "exact", head: true })
        .eq("seller_id", user.id),
      supabase
        .from("saved_predictions")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
    ]);

    return {
      stats: {
        farmsCount: farms.count ?? 0,
        activeAlertsCount: alerts.count ?? 0,
        myListingsCount: listings.count ?? 0,
        savedPredictionsCount: predictions.count ?? 0,
      },
      source: "database",
    };
  } catch {
    return { stats: null, source: "unavailable" };
  }
}
