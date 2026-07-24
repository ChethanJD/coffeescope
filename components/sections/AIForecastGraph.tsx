"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { PredictionChart } from "@/components/prediction/PredictionChart";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { HOME_FORECAST_HORIZONS } from "@/lib/data/mockHomeForecast";
import { cn } from "@/lib/utils";

export function AIForecastGraph() {
  const [activeId, setActiveId] = useState(HOME_FORECAST_HORIZONS[0].id);
  const horizon = HOME_FORECAST_HORIZONS.find((h) => h.id === activeId)!;
  const isPositive = horizon.changePct >= 0;

  return (
    <section className="relative bg-surface-void px-6 pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="glass rounded-xl3 p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-coffee-gold">
                <Sparkles className="h-3.5 w-3.5" />
                AI Forecast
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <AnimatedCounter
                  value={horizon.predictedPrice}
                  prefix="₹"
                  className="font-heading text-3xl font-semibold text-white sm:text-4xl"
                />
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-semibold",
                    isPositive ? "text-coffee-leaf" : "text-red-400"
                  )}
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {Math.abs(horizon.changePct).toFixed(2)}%
                </span>
                <span className="text-xs text-white/40">predicted — {horizon.label}</span>
              </div>
              <p className="mt-1 text-xs text-white/35">
                ₹{(horizon.predictedPrice * 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })} / quintal
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {HOME_FORECAST_HORIZONS.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setActiveId(h.id)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                    h.id === activeId ? "text-white" : "text-white/45 hover:text-white/75"
                  )}
                >
                  {h.id === activeId && (
                    <motion.span
                      layoutId="home-forecast-pill"
                      className="glass absolute inset-0 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{h.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-coffee-gold" /> Historical
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-coffee-leaf" /> AI Forecast
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2"
            >
              <PredictionChart data={horizon.chartData} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
