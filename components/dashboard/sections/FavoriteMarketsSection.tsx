"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Star } from "lucide-react";
import { FAVORITE_MARKETS } from "@/lib/data/mockDashboard";
import { cn } from "@/lib/utils";

export function FavoriteMarketsSection() {
  return (
    <div className="glass rounded-xl3 p-6 shadow-card">
      <h3 className="mb-5 font-heading text-lg font-semibold text-white">Favorite Markets</h3>
      <div className="flex flex-col divide-y divide-white/[0.06]">
        {FAVORITE_MARKETS.map((market, i) => {
          const isPositive = market.changePct >= 0;
          return (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="flex items-center justify-between py-4"
            >
              <span className="flex items-center gap-3">
                <Star className="h-4 w-4 fill-coffee-gold text-coffee-gold" />
                <span className="text-sm font-medium text-white">{market.variety}</span>
              </span>
              <span className="flex items-center gap-4">
                <span className="font-heading text-sm font-semibold text-white">
                  ₹{market.price.toFixed(2)}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1 text-xs font-semibold",
                    isPositive ? "text-coffee-leaf" : "text-red-400"
                  )}
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {Math.abs(market.changePct).toFixed(2)}%
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
