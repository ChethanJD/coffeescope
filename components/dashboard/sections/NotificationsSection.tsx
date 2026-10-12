"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Info } from "lucide-react";
import { NOTIFICATIONS } from "@/lib/data/mockDashboard";
import { NotificationChannelsPanel } from "@/components/dashboard/sections/NotificationChannelsPanel";
import {
  getDashboardNotifications,
  markDashboardNotificationRead,
} from "@/app/dashboard/actions";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types/models";

export function NotificationsSection() {
  const [notifications, setNotifications] = useState<Notification[] | null>(null);
  const [source, setSource] = useState<"database" | "unavailable">("unavailable");
  const [demoItems, setDemoItems] = useState(NOTIFICATIONS);

  const refresh = useCallback(() => {
    getDashboardNotifications().then((result) => {
      setNotifications(result.notifications);
      setSource(result.source);
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isReal = source === "database";
  const loading = notifications === null;

  async function markRealRead(id: string) {
    setNotifications((prev) => prev?.map((n) => (n.id === id ? { ...n, isRead: true } : n)) ?? prev);
    await markDashboardNotificationRead(id);
  }

  return (
    <div className="flex flex-col gap-6">
      <NotificationChannelsPanel />
      <div className="glass rounded-xl3 p-6 shadow-card">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-white">
            <Bell className="h-4 w-4 text-coffee-gold" />
            Notifications
          </h3>
          {!isReal && (
            <button
              type="button"
              onClick={() => setDemoItems((prev) => prev.map((n) => ({ ...n, read: true })))}
              className="text-xs font-medium text-white/40 hover:text-white/70"
            >
              Mark all read
            </button>
          )}
        </div>

        {loading && <p className="text-sm text-white/40">Loading notifications...</p>}

        {!loading && isReal && notifications!.length === 0 && (
          <p className="rounded-xl bg-white/[0.03] px-4 py-6 text-center text-sm text-white/50">
            No notifications yet. They&apos;ll show up here when one of your alert rules fires.
          </p>
        )}

        {!loading && isReal && notifications!.length > 0 && (
          <div className="flex flex-col gap-2">
            {notifications!.map((n, i) => (
              <motion.button
                key={n.id}
                type="button"
                onClick={() => markRealRead(n.id)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={cn(
                  "flex items-start gap-3 rounded-xl px-4 py-3.5 text-left transition-colors",
                  n.isRead ? "bg-white/[0.02]" : "bg-coffee-gold/[0.06] hover:bg-coffee-gold/[0.09]"
                )}
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.05]">
                  <Info className="h-4 w-4 text-coffee-gold" />
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{n.title}</span>
                    {!n.isRead && <span className="h-1.5 w-1.5 rounded-full bg-coffee-gold" />}
                  </span>
                  {n.body && <p className="mt-0.5 text-xs text-white/50">{n.body}</p>}
                </span>
                <span className="shrink-0 text-[11px] text-white/30">
                  {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </motion.button>
            ))}
          </div>
        )}

        {!loading && !isReal && (
          <>
            <p className="-mt-1 mb-4 w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
              Showing demo data — connect Supabase and sign in for real notifications
            </p>
            <div className="flex flex-col gap-2">
              {demoItems.map((n, i) => (
                <motion.button
                  key={n.id}
                  type="button"
                  onClick={() =>
                    setDemoItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))
                  }
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={cn(
                    "flex items-start gap-3 rounded-xl px-4 py-3.5 text-left transition-colors",
                    n.read ? "bg-white/[0.02]" : "bg-coffee-gold/[0.06] hover:bg-coffee-gold/[0.09]"
                  )}
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.05]">
                    <Info className="h-4 w-4 text-coffee-gold" />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{n.title}</span>
                      {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-coffee-gold" />}
                    </span>
                    <p className="mt-0.5 text-xs text-white/50">{n.message}</p>
                  </span>
                  <span className="shrink-0 text-[11px] text-white/30">{n.time}</span>
                </motion.button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
