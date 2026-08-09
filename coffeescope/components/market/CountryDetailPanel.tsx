"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sprout, ArrowUpFromLine, ArrowDownToLine, CloudSun, Sparkles, IndianRupee } from "lucide-react";
import type { CountryMarketData } from "@/lib/data/mockCountries";

function StatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
      <span className="flex items-center gap-2 text-sm text-white/50">
        <Icon className="h-4 w-4 text-coffee-gold" />
        {label}
      </span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

function formatTons(tons: number) {
  return `${(tons / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}k t`;
}

export function CountryDetailPanel({ country }: { country: CountryMarketData | null }) {
  return (
    <AnimatePresence mode="wait">
      {country ? (
        <motion.div
          key={country.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass flex h-full flex-col rounded-xl3 p-6 shadow-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-white">
                {country.name}
              </h3>
              <p className="mt-1 text-sm text-white/45">{country.coffeeType}</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-coffee-gold/15 px-3 py-1.5 text-sm font-semibold text-coffee-gold">
              <IndianRupee className="h-3.5 w-3.5" />
              {country.priceInrKg}/kg
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <StatRow
              icon={Sprout}
              label="Production"
              value={formatTons(country.productionTons)}
            />
            <StatRow
              icon={ArrowUpFromLine}
              label="Exports"
              value={formatTons(country.exportsTons)}
            />
            <StatRow
              icon={ArrowDownToLine}
              label="Imports"
              value={formatTons(country.importsTons)}
            />
            <StatRow
              icon={CloudSun}
              label="Weather"
              value={`${country.weather.tempC}°C · ${country.weather.condition}`}
            />
          </div>

          <div className="mt-5 rounded-xl border border-coffee-leaf/20 bg-coffee-leaf/[0.06] p-4">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-coffee-leaf">
              <Sparkles className="h-3.5 w-3.5" />
              Harvest Prediction
            </span>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {country.harvestPrediction}
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="glass flex h-full min-h-[300px] flex-col items-center justify-center rounded-xl3 p-8 text-center"
        >
          <p className="font-heading text-lg font-semibold text-white/80">
            Select an origin
          </p>
          <p className="mt-2 max-w-xs text-sm text-white/40">
            Click a marker on the globe to see production, trade flow, and
            harvest outlook for that country.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
