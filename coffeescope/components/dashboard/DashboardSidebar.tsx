"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Sprout,
  Star,
  Bell,
  Sparkles,
  AlertTriangle,
  BarChart3,
  Coffee,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardTabId } from "@/components/dashboard/DashboardShell";

const NAV_ITEMS: { id: DashboardTabId; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "farms", label: "Saved Farms", icon: Sprout },
  { id: "markets", label: "Favorite Markets", icon: Star },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "predictions", label: "Predictions", icon: Sparkles },
  { id: "alerts", label: "Alerts", icon: AlertTriangle },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

export function DashboardSidebar({
  active,
  onSelect,
}: {
  active: DashboardTabId;
  onSelect: (id: DashboardTabId) => void;
}) {
  return (
    <aside className="glass flex h-fit flex-col gap-1 rounded-xl3 p-3 lg:sticky lg:top-24">
      <Link
        href="/"
        className="mb-2 flex items-center gap-2 rounded-xl px-3 py-3 font-heading text-sm font-semibold text-white"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coffee-gradient">
          <Coffee className="h-4 w-4 text-white" strokeWidth={2.5} />
        </span>
        CoffeeScope
      </Link>

      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive ? "text-white" : "text-white/50 hover:text-white/80"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="dashboard-nav-pill"
                className="absolute inset-0 rounded-xl bg-white/[0.06]"
                transition={{ type: "spring", stiffness: 350, damping: 32 }}
              />
            )}
            <Icon className="relative z-10 h-4 w-4" />
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}

      <Link
        href="/"
        className="mt-3 flex items-center gap-2 rounded-xl border-t border-white/10 px-3 pt-4 text-xs font-medium text-white/40 hover:text-white/70"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to site
      </Link>
    </aside>
  );
}
