"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PredictionChart } from "@/components/prediction/PredictionChart";
import { ConfidenceGauge } from "@/components/prediction/ConfidenceGauge";
import { RecommendationCard } from "@/components/prediction/RecommendationCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { PREDICTION_HORIZONS } from "@/lib/data/mockPrediction";
import { cn } from "@/lib/utils";

export function AIPrediction() {
  const [activeId, setActiveId] = useState(PREDICTION_HORIZONS[0].id);
  const horizon = PREDICTION_HORIZONS.find((h) => h.id === activeId)!;
  const isPositive = horizon.changePct >= 0;

  return (
    <section id="ai" className="relative bg-surface-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            AI Price Prediction
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Where the market is headed next
          </h2>
          <p className="mt-4 text-white/50">
            Forecasts blend historical price patterns with weather and trade
            signals across origin countries.
          </p>
        </div>

        {/* Horizon tabs */}
        <div className="mt-10 flex justify-center gap-2">
          {PREDICTION_HORIZONS.map((h) => {
            const isActive = h.id === activeId;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setActiveId(h.id)}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "text-white" : "text-white/50 hover:text-white/80"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="prediction-tab-pill"
                    className="glass absolute inset-0 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{h.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]"
          >
            {/* Chart panel */}
            <div className="glass rounded-xl3 p-6 shadow-card sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <span className="text-xs text-white/40">Predicted price — {horizon.label}</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <AnimatedCounter
                      value={horizon.predictedPrice}
                      prefix="₹"
                      className="font-heading text-4xl font-semibold text-white"
                    />
                    <span
                      className={cn(
                        "flex items-center gap-1 text-sm font-semibold",
                        isPositive ? "text-coffee-leaf" : "text-red-400"
                      )}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {Math.abs(horizon.changePct).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-coffee-gold" /> Historical
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-coffee-leaf" /> AI Forecast
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <PredictionChart data={horizon.chartData} />
              </div>
            </div>

            {/* Confidence + recommendation panel */}
            <div className="flex flex-col gap-6">
              <div className="glass flex flex-col items-center rounded-xl3 p-6 shadow-card">
                <ConfidenceGauge confidence={horizon.confidence} />
                <p className="mt-3 text-center text-xs text-white/40">
                  Based on 30-day price history, weather signals, and trade
                  flow data
                </p>
              </div>
              <RecommendationCard
                recommendation={horizon.recommendation}
                reasoning={horizon.reasoning}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
