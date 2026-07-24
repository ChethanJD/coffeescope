"use client";

import { motion } from "framer-motion";
import { Droplets, Wind, CloudRain, Thermometer } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CONDITION_META } from "@/lib/weatherIcons";
import type { LocationWeather } from "@/lib/data/mockWeather";

function StatChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/[0.03] px-4 py-4">
      <Icon className="h-4 w-4 text-coffee-gold" />
      <span className="text-sm font-semibold text-white">{value}</span>
      <span className="text-[11px] text-white/40">{label}</span>
    </div>
  );
}

export function CurrentWeatherCard({ location }: { location: LocationWeather }) {
  const meta = CONDITION_META[location.current.condition];
  const Icon = meta.icon;

  return (
    <motion.div
      key={location.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-xl3 p-7 shadow-card sm:p-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-heading text-xl font-semibold text-white">
            {location.name}
          </h3>
          <p className="text-sm text-white/40">{location.region}</p>
        </div>
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: `${meta.color}1F` }}
        >
          <Icon className="h-7 w-7" style={{ color: meta.color }} />
        </span>
      </div>

      <div className="mt-6 flex items-end gap-3">
        <AnimatedCounter
          value={location.current.tempC}
          decimals={0}
          suffix="°C"
          className="font-heading text-6xl font-semibold text-white"
        />
        <span className="mb-2 text-sm text-white/40">
          {meta.label} · feels like {location.current.feelsLikeC}°C
        </span>
      </div>

      <div className="mt-7 grid grid-cols-4 gap-2.5">
        <StatChip icon={Droplets} label="Humidity" value={`${location.current.humidity}%`} />
        <StatChip icon={Wind} label="Wind" value={`${location.current.windKmh} km/h`} />
        <StatChip icon={CloudRain} label="Rain" value={`${location.current.rainMm} mm`} />
        <StatChip icon={Thermometer} label="Feels like" value={`${location.current.feelsLikeC}°`} />
      </div>
    </motion.div>
  );
}
