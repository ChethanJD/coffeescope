"use client";

import { motion } from "framer-motion";
import { CONDITION_META } from "@/lib/weatherIcons";
import type { LocationWeather } from "@/lib/data/mockWeather";

export function ForecastStrip({ location }: { location: LocationWeather }) {
  return (
    <div className="glass rounded-xl3 p-5 shadow-card sm:p-6">
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
        5-Day Forecast
      </h4>
      <div className="grid grid-cols-5 gap-2">
        {location.forecast.map((day, i) => {
          const meta = CONDITION_META[day.condition];
          const Icon = meta.icon;
          return (
            <motion.div
              key={`${location.id}-${day.day}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center gap-2 rounded-2xl px-1 py-3 text-center"
            >
              <span className="text-xs font-medium text-white/50">{day.day}</span>
              <Icon className="h-5 w-5" style={{ color: meta.color }} />
              <span className="text-sm font-semibold text-white">{day.high}°</span>
              <span className="text-xs text-white/35">{day.low}°</span>
              <span className="text-[10px] text-coffee-gold">{day.rainChance}%</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
