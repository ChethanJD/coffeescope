"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CloudRain, Newspaper, DollarSign, Info } from "lucide-react";
import { NOTIFICATIONS, type DashboardNotification } from "@/lib/data/mockDashboard";
import { NotificationChannelsPanel } from "@/components/dashboard/sections/NotificationChannelsPanel";
import { cn } from "@/lib/utils";

const CHANNEL_ICON: Record<DashboardNotification["channel"], React.ElementType> = {
  Price: DollarSign,
  Weather: CloudRain,
  News: Newspaper,
  System: Info,
};

export function NotificationsSection() {
  const [items, setItems] = useState(NOTIFICATIONS);

  return (
    <div className="flex flex-col gap-6">
      <NotificationChannelsPanel />
      <div className="glass rounded-xl3 p-6 shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-white">
          <Bell className="h-4 w-4 text-coffee-gold" />
          Notifications
        </h3>
        <button
          type="button"
          onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
          className="text-xs font-medium text-white/40 hover:text-white/70"
        >
          Mark all read
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((n, i) => {
          const Icon = CHANNEL_ICON[n.channel];
          return (
            <motion.button
              key={n.id}
              type="button"
              onClick={() =>
                setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))
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
                <Icon className="h-4 w-4 text-coffee-gold" />
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
          );
        })}
      </div>
      </div>
    </div>
  );
}
