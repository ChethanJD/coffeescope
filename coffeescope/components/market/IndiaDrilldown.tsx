"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, MapPin, Sprout, IndianRupee, CloudSun, Sparkles } from "lucide-react";
import { INDIA_STATES, type StateData, type DistrictData } from "@/lib/data/mockIndiaRegions";

type Level = "states" | "districts" | "detail";

export function IndiaDrilldown() {
  const [level, setLevel] = useState<Level>("states");
  const [activeState, setActiveState] = useState<StateData | null>(null);
  const [activeDistrict, setActiveDistrict] = useState<DistrictData | null>(null);

  function selectState(state: StateData) {
    setActiveState(state);
    setLevel("districts");
  }

  function selectDistrict(district: DistrictData) {
    setActiveDistrict(district);
    setLevel("detail");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass mt-6 rounded-xl3 p-6 shadow-card sm:p-7"
    >
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-1.5 text-sm">
        <button
          type="button"
          onClick={() => {
            setLevel("states");
            setActiveState(null);
            setActiveDistrict(null);
          }}
          className={level === "states" ? "font-semibold text-white" : "text-white/40 hover:text-white/70"}
        >
          India
        </button>
        {activeState && (
          <>
            <ChevronRight className="h-3.5 w-3.5 text-white/25" />
            <button
              type="button"
              onClick={() => {
                setLevel("districts");
                setActiveDistrict(null);
              }}
              className={level === "districts" ? "font-semibold text-white" : "text-white/40 hover:text-white/70"}
            >
              {activeState.name}
            </button>
          </>
        )}
        {activeDistrict && (
          <>
            <ChevronRight className="h-3.5 w-3.5 text-white/25" />
            <span className="font-semibold text-white">{activeDistrict.name}</span>
          </>
        )}
      </div>

      <AnimatePresence mode="wait">
        {level === "states" && (
          <motion.div
            key="states"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {INDIA_STATES.map((state) => (
              <button
                key={state.id}
                type="button"
                onClick={() => selectState(state)}
                className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-4 text-left transition-colors hover:bg-white/[0.06]"
              >
                <span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    <MapPin className="h-3.5 w-3.5 text-coffee-gold" />
                    {state.name}
                  </span>
                  <span className="mt-1 block text-xs text-white/40">
                    {state.districts.length} coffee districts
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 text-white/30" />
              </button>
            ))}
          </motion.div>
        )}

        {level === "districts" && activeState && (
          <motion.div
            key="districts"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {activeState.districts.map((district) => (
              <button
                key={district.id}
                type="button"
                onClick={() => selectDistrict(district)}
                className="flex flex-col items-start gap-2 rounded-xl bg-white/[0.03] px-4 py-4 text-left transition-colors hover:bg-white/[0.06]"
              >
                <span className="text-sm font-semibold text-white">{district.name}</span>
                <span className="text-xs text-white/40">{district.coffeeType}</span>
                <span className="flex items-center gap-1 text-xs font-medium text-coffee-gold">
                  <IndianRupee className="h-3 w-3" />
                  {district.priceInrKg}/kg
                </span>
              </button>
            ))}
          </motion.div>
        )}

        {level === "detail" && activeDistrict && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-5 flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3.5">
              <span className="flex items-center gap-2.5 text-sm text-white/50">
                <Sprout className="h-4 w-4 text-coffee-gold" />
                Production
              </span>
              <span className="text-sm font-semibold text-white">
                {(activeDistrict.productionTons / 1000).toFixed(0)}k t
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3.5">
              <span className="flex items-center gap-2.5 text-sm text-white/50">
                <IndianRupee className="h-4 w-4 text-coffee-gold" />
                Price
              </span>
              <span className="text-sm font-semibold text-white">
                ₹{activeDistrict.priceInrKg}/kg · ₹{(activeDistrict.priceInrKg * 100).toLocaleString("en-IN")}/quintal
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3.5">
              <span className="flex items-center gap-2.5 text-sm text-white/50">
                <CloudSun className="h-4 w-4 text-coffee-gold" />
                Weather
              </span>
              <span className="text-sm font-semibold text-white">
                {activeDistrict.weather.tempC}°C · {activeDistrict.weather.condition}
              </span>
            </div>
            <div className="mt-2 rounded-xl border border-coffee-leaf/20 bg-coffee-leaf/[0.06] p-4">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-coffee-leaf">
                <Sparkles className="h-3.5 w-3.5" />
                Harvest Outlook
              </span>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {activeDistrict.harvestPrediction}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
