"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PriceTrendChart } from "@/components/analytics/PriceTrendChart";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { getDashboardStats } from "@/app/dashboard/actions";
import type { DashboardStats } from "@/services/analytics";

interface QuickStat {
  label: string;
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
}

const DEMO_STATS: QuickStat[] = [
  { label: "Portfolio Value", value: 4004750, prefix: "₹", decimals: 0 },
  { label: "Avg. Prediction Accuracy", value: 94.7, suffix: "%", decimals: 1 },
  { label: "Active Alerts", value: 3, decimals: 0 },
];

export function DashboardAnalyticsSection() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [source, setSource] = useState<"database" | "unavailable">("unavailable");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getDashboardStats().then((result) => {
      setStats(result.stats);
      setSource(result.source);
      setLoaded(true);
    });
  }, []);

  const isReal = source === "database";

  const realStats: QuickStat[] = stats
    ? [
        { label: "Farms Tracked", value: stats.farmsCount, decimals: 0 },
        { label: "Active Alerts", value: stats.activeAlertsCount, decimals: 0 },
        { label: "Marketplace Listings", value: stats.myListingsCount, decimals: 0 },
        { label: "Saved Predictions", value: stats.savedPredictionsCount, decimals: 0 },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6">
      {loaded && !isReal && (
        <p className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
          Showing demo data — connect Supabase and sign in for your real activity
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {(isReal ? realStats : DEMO_STATS).map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass group rounded-2xl p-5 shadow-card transition-transform duration-300 hover:-translate-y-0.5"
          >
            <AnimatedCounter
              value={stat.value}
              decimals={stat.decimals}
              prefix={stat.prefix ?? ""}
              suffix={stat.suffix ?? ""}
              className="font-heading text-2xl font-semibold text-white"
            />
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-white/40">{stat.label}</p>
              <span className="h-1.5 w-1.5 rounded-full bg-coffee-leaf" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl p-4 shadow-card sm:p-6">
        <h3 className="mb-4 font-heading text-lg font-semibold text-white">
          Illustrative Price Trend
        </h3>
        <PriceTrendChart />
        <p className="mt-3 text-xs text-white/30">
          Demo chart — not wired to live price history yet. See the Market page for real prices.
        </p>
      </div>
    </div>
  );
}
