"use client";

import { motion } from "framer-motion";
import { TrendingUp, Minus, TrendingDown, Sparkles } from "lucide-react";
import type { Recommendation } from "@/lib/data/mockPrediction";
import { cn } from "@/lib/utils";

const RECOMMENDATION_META: Record<
  Recommendation,
  { icon: typeof TrendingUp; color: string; bg: string; border: string }
> = {
  Buy: { icon: TrendingUp, color: "#3A7D44", bg: "bg-coffee-leaf/[0.08]", border: "border-coffee-leaf/25" },
  Hold: { icon: Minus, color: "#D6A55C", bg: "bg-coffee-gold/[0.08]", border: "border-coffee-gold/25" },
  Sell: { icon: TrendingDown, color: "#C24444", bg: "bg-red-500/[0.08]", border: "border-red-500/25" },
};

export function RecommendationCard({
  recommendation,
  reasoning,
}: {
  recommendation: Recommendation;
  reasoning: string;
}) {
  const meta = RECOMMENDATION_META[recommendation];
  const Icon = meta.icon;

  return (
    <motion.div
      key={recommendation}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn("rounded-xl3 border p-6", meta.bg, meta.border)}
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: `${meta.color}22` }}
        >
          <Icon className="h-5 w-5" style={{ color: meta.color }} />
        </span>
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-white/40">
            AI Recommendation
          </span>
          <h4 className="font-heading text-xl font-bold" style={{ color: meta.color }}>
            {recommendation}
          </h4>
        </div>
      </div>
      <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-white/70">
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/30" />
        {reasoning}
      </p>
    </motion.div>
  );
}
