"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Search } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { ProfileSection } from "@/components/dashboard/sections/ProfileSection";
import { SavedFarmsSection } from "@/components/dashboard/sections/SavedFarmsSection";
import { FavoriteMarketsSection } from "@/components/dashboard/sections/FavoriteMarketsSection";
import { NotificationsSection } from "@/components/dashboard/sections/NotificationsSection";
import { PredictionsSection } from "@/components/dashboard/sections/PredictionsSection";
import { AlertsSection } from "@/components/dashboard/sections/AlertsSection";
import { DashboardAnalyticsSection } from "@/components/dashboard/sections/AnalyticsSection";
import { DASHBOARD_USER, NOTIFICATIONS } from "@/lib/data/mockDashboard";

export type DashboardTabId =
  | "profile"
  | "farms"
  | "markets"
  | "notifications"
  | "predictions"
  | "alerts"
  | "analytics";

const TAB_LABELS: Record<DashboardTabId, string> = {
  profile: "Profile",
  farms: "Saved Farms",
  markets: "Favorite Markets",
  notifications: "Notifications",
  predictions: "Predictions",
  alerts: "Alerts",
  analytics: "Analytics",
};

export function DashboardShell() {
  const [active, setActive] = useState<DashboardTabId>("profile");
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-surface-void px-6 pb-24 pt-8">
      <div className="mx-auto max-w-7xl">
        {/* Topbar */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs text-white/40">Dashboard</p>
            <h1 className="font-heading text-2xl font-semibold text-white">
              Welcome back, {DASHBOARD_USER.name.split(" ")[0]}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass hidden items-center gap-2 rounded-full px-4 py-2.5 sm:flex">
              <Search className="h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search..."
                className="w-40 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setActive("notifications")}
              className="glass relative flex h-11 w-11 items-center justify-center rounded-full"
            >
              <Bell className="h-4 w-4 text-white/70" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-coffee-gold text-[9px] font-bold text-black">
                  {unreadCount}
                </span>
              )}
            </button>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-coffee-gradient font-heading text-sm font-semibold text-white">
              {DASHBOARD_USER.initials}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          <DashboardSidebar active={active} onSelect={setActive} />

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="mb-5 font-heading text-lg font-semibold text-white lg:hidden">
                  {TAB_LABELS[active]}
                </h2>
                {active === "profile" && <ProfileSection />}
                {active === "farms" && <SavedFarmsSection />}
                {active === "markets" && <FavoriteMarketsSection />}
                {active === "notifications" && <NotificationsSection />}
                {active === "predictions" && <PredictionsSection />}
                {active === "alerts" && <AlertsSection />}
                {active === "analytics" && <DashboardAnalyticsSection />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
