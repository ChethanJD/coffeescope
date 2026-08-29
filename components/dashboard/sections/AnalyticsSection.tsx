"use client";

import { motion } from "framer-motion";
import { PriceTrendChart } from "@/components/analytics/PriceTrendChart";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const QUICK_STATS = [
  { label: "Portfolio Value", value: 4004750, prefix: "₹", decimals: 0 },
  { label: "Avg. Prediction Accuracy", value: 94.7, suffix: "%", decimals: 1 },
  { label: "Active Alerts", value: 3, decimals: 0 },
];

export function DashboardAnalyticsSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {QUICK_STATS.map((stat, i) => (
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
            <div className="mt-2 flex items-center justify-between"><p className="text-xs text-white/40">{stat.label}</p><span className="h-1.5 w-1.5 rounded-full bg-coffee-leaf" /></div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl p-4 shadow-card sm:p-6">
        <h3 className="mb-4 font-heading text-lg font-semibold text-white">
          Your Watchlist Trend
        </h3>
        <PriceTrendChart />
      </div>
    </div>
  );
}
