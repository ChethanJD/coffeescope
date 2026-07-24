"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, BarChart3, PieChart as PieIcon, Grid3x3 } from "lucide-react";
import { PriceTrendChart } from "@/components/analytics/PriceTrendChart";
import { OriginVolumeChart } from "@/components/analytics/OriginVolumeChart";
import { MarketShareChart } from "@/components/analytics/MarketShareChart";
import { VolatilityHeatmap } from "@/components/analytics/VolatilityHeatmap";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "trend", label: "Price Trend", icon: TrendingUp, description: "30-day Arabica vs Robusta" },
  { id: "volume", label: "Export Volume", icon: BarChart3, description: "Tons exported by origin" },
  { id: "share", label: "Market Share", icon: PieIcon, description: "Global production share" },
  { id: "volatility", label: "Volatility", icon: Grid3x3, description: "Monthly price volatility" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Analytics() {
  const [active, setActive] = useState<TabId>("trend");
  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <section id="analytics" className="relative bg-surface-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            Market Analytics
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Every angle on the market, one dashboard
          </h2>
          <p className="mt-4 text-white/50">
            Switch between trend, volume, share, and volatility views built
            on the same underlying market data.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-white/50 hover:text-white/80"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="analytics-tab-pill"
                    className="glass absolute inset-0 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Chart card */}
        <div className="glass mt-8 rounded-xl3 p-6 shadow-card sm:p-8">
          <div className="mb-6 flex items-baseline justify-between">
            <h3 className="font-heading text-lg font-semibold text-white">
              {activeTab.label}
            </h3>
            <span className="text-xs text-white/40">{activeTab.description}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {active === "trend" && <PriceTrendChart />}
              {active === "volume" && <OriginVolumeChart />}
              {active === "share" && <MarketShareChart />}
              {active === "volatility" && <VolatilityHeatmap />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
