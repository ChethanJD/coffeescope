import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { AlertRule } from "@/types/models";
import {
  createAlertRuleSchema,
  toggleAlertRuleSchema,
  type CreateAlertRuleInput,
  type ToggleAlertRuleInput,
} from "@/lib/validation/alertSchemas";

function mapRow(row: {
  id: string;
  user_id: string;
  rule_type: AlertRule["ruleType"];
  variety_id: string | null;
  market_location_id: string | null;
  condition: Record<string, unknown>;
  channel: AlertRule["channel"];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}): AlertRule {
  return {
    id: row.id,
    userId: row.user_id,
    ruleType: row.rule_type,
    varietyId: row.variety_id,
    marketLocationId: row.market_location_id,
    condition: row.condition,
    channel: row.channel,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export interface AlertRulesResult {
  rules: AlertRule[];
  source: "database" | "unavailable";
}

/** The signed-in user's own alert rules. */
export async function getMyAlertRules(): Promise<AlertRulesResult> {
  if (!isSupabaseConfigured()) {
    return { rules: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { rules: [], source: "unavailable" };

    const { data, error } = await supabase
      .from("alert_rules")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error || !data) return { rules: [], source: "unavailable" };

    return { rules: data.map(mapRow), source: "database" };
  } catch {
    return { rules: [], source: "unavailable" };
  }
}

export type AlertRuleResult = { ok: true; rule: AlertRule } | { ok: false; error: string };

/** Creates an alert rule owned by the currently signed-in user. */
export async function createAlertRule(input: CreateAlertRuleInput): Promise<AlertRuleResult> {
  const parsed = createAlertRuleSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid alert rule" };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Alerts are not available yet." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false, error: "You must be signed in to create an alert." };
    }

    const { data, error } = await supabase
      .from("alert_rules")
      .insert({
        user_id: user.id,
        rule_type: parsed.data.ruleType,
        variety_id: parsed.data.varietyId ?? null,
        market_location_id: parsed.data.marketLocationId ?? null,
        condition: parsed.data.condition,
        channel: parsed.data.channel,
      })
      .select("*")
      .single();

    if (error || !data) {
      return { ok: false, error: "Could not create alert. Please try again." };
    }

    return { ok: true, rule: mapRow(data) };
  } catch {
    return { ok: false, error: "Could not create alert. Please try again." };
  }
}

/** Toggles an alert rule on/off. RLS restricts this to the rule's own owner. */
export async function toggleAlertRule(input: ToggleAlertRuleInput): Promise<AlertRuleResult> {
  const parsed = toggleAlertRuleSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid request" };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Alerts are not available yet." };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("alert_rules")
      .update({ is_active: parsed.data.isActive })
      .eq("id", parsed.data.id)
      .select("*")
      .single();

    if (error || !data) {
      return { ok: false, error: "Could not update alert." };
    }

    return { ok: true, rule: mapRow(data) };
  } catch {
    return { ok: false, error: "Could not update alert." };
  }
}
