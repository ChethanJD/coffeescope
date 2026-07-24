"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  HEATMAP_MONTHS,
  HEATMAP_VARIETIES,
  VOLATILITY_HEATMAP,
} from "@/lib/data/mockAnalytics";

const MAX_VALUE = Math.max(...VOLATILITY_HEATMAP.flat());

function cellColor(value: number) {
  const intensity = value / MAX_VALUE; // 0..1
  // Interpolate from near-transparent gold to full accent-green,
  // matching the CoffeeScope palette instead of a generic red/blue scale.
  const alpha = 0.12 + intensity * 0.75;
  return intensity > 0.55
    ? `rgba(58, 125, 68, ${alpha})` // accent green for high volatility
    : `rgba(214, 165, 92, ${alpha})`; // gold for low/moderate
}

export function VolatilityHeatmap() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px]">
        <div
          className="grid gap-1.5"
          style={{ gridTemplateColumns: `70px repeat(${HEATMAP_MONTHS.length}, 1fr)` }}
        >
          <div />
          {HEATMAP_MONTHS.map((m) => (
            <div key={m} className="pb-2 text-center text-[11px] text-white/40">
              {m}
            </div>
          ))}

          {HEATMAP_VARIETIES.map((variety, vIndex) => {
            const row = VOLATILITY_HEATMAP[vIndex] ?? [];
            return (
            <Fragment key={variety}>
              <div
                className="flex items-center text-sm font-medium text-white/60"
              >
                {variety}
              </div>
              {row.map((value, mIndex) => (
                <motion.div
                  key={`${variety}-${mIndex}`}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: (vIndex * HEATMAP_MONTHS.length + mIndex) * 0.02,
                  }}
                  className="group relative flex aspect-square items-center justify-center rounded-md text-[11px] font-medium text-white/70"
                  style={{ backgroundColor: cellColor(value) }}
                  title={`${variety} · ${HEATMAP_MONTHS[mIndex]}: ${value}% volatility`}
                >
                  {value}
                </motion.div>
              ))}
            </Fragment>
            );
          })}
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-white/40">
          <span>Lower volatility</span>
          <span className="h-2 w-24 rounded-full bg-gradient-to-r from-coffee-gold/20 via-coffee-gold to-coffee-leaf" />
          <span>Higher volatility</span>
        </div>
      </div>
    </div>
  );
}
