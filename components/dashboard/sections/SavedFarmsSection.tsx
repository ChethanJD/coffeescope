"use client";

import { motion } from "framer-motion";
import { MapPin, Plus } from "lucide-react";
import { SAVED_FARMS, type SavedFarm } from "@/lib/data/mockDashboard";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<SavedFarm["status"], string> = {
  Healthy: "bg-coffee-leaf/15 text-coffee-leaf",
  Watch: "bg-coffee-gold/15 text-coffee-gold",
  "At Risk": "bg-red-500/15 text-red-400",
};

export function SavedFarmsSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-white">Saved Farms</h3>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-coffee-gradient px-4 py-2 text-xs font-semibold text-white shadow-glow-gold"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Farm
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SAVED_FARMS.map((farm, i) => (
          <motion.div
            key={farm.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass rounded-xl3 p-5 shadow-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-heading text-base font-semibold text-white">{farm.name}</h4>
                <span className="mt-1 flex items-center gap-1 text-xs text-white/40">
                  <MapPin className="h-3 w-3" />
                  {farm.location}
                </span>
              </div>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                  STATUS_STYLES[farm.status]
                )}
              >
                {farm.status}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
              <div>
                <p className="text-sm font-semibold text-white">{farm.areaHectares}</p>
                <p className="text-[10px] text-white/40">Hectares</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{farm.variety}</p>
                <p className="text-[10px] text-white/40">Variety</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{farm.lastHarvestYield}</p>
                <p className="text-[10px] text-white/40">Last Yield</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
