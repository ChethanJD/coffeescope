import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Notification } from "@/types/models";

function mapRow(row: {
  id: string;
  user_id: string;
  alert_rule_id: string | null;
  title: string;
  body: string | null;
  is_read: boolean;
  created_at: string;
}): Notification {
  return {
    id: row.id,
    userId: row.user_id,
    alertRuleId: row.alert_rule_id,
    title: row.title,
    body: row.body,
    isRead: row.is_read,
    createdAt: row.created_at,
  };
}

export interface NotificationsResult {
  notifications: Notification[];
  source: "database" | "unavailable";
}

/**
 * The signed-in user's notifications. Notifications are only ever written
 * server-side (a job evaluating alert_rules against fresh data) — there is
 * no client "create notification" function, matching the RLS policy which
 * has no client insert path.
 */
export async function getMyNotifications(limit = 20): Promise<NotificationsResult> {
  if (!isSupabaseConfigured()) {
    return { notifications: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { notifications: [], source: "unavailable" };

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) return { notifications: [], source: "unavailable" };

    return { notifications: data.map(mapRow), source: "database" };
  } catch {
    return { notifications: [], source: "unavailable" };
  }
}

/** Marks a notification as read. RLS restricts this to the notification's own owner. */
export async function markNotificationRead(id: string): Promise<{ ok: boolean }> {
  if (!isSupabaseConfigured()) return { ok: false };

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);
    return { ok: !error };
  } catch {
    return { ok: false };
  }
}
