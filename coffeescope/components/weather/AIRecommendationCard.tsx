"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { LocationWeather } from "@/lib/data/mockWeather";

export function AIRecommendationCard({ location }: { location: LocationWeather }) {
  return (
    <motion.div
      key={location.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl3 border border-coffee-leaf/20 bg-coffee-leaf/[0.06] p-6"
    >
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-coffee-leaf">
        <Sparkles className="h-3.5 w-3.5" />
        AI Recommendation
      </span>
      <p className="mt-3 text-sm leading-relaxed text-white/80">
        {location.aiRecommendation}
      </p>
    </motion.div>
  );
}
