"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Star, X, Plus } from "lucide-react";
import { FAVORITE_MARKETS } from "@/lib/data/mockDashboard";
import {
  getDashboardFavoriteMarkets,
  addDashboardFavoriteMarket,
  removeDashboardFavoriteMarket,
  getDashboardVarieties,
} from "@/app/dashboard/actions";
import { cn } from "@/lib/utils";
import type { FavoriteMarket, CoffeeVariety } from "@/types/models";

export function FavoriteMarketsSection() {
  const [favorites, setFavorites] = useState<FavoriteMarket[] | null>(null);
  const [source, setSource] = useState<"database" | "unavailable">("unavailable");
  const [varieties, setVarieties] = useState<CoffeeVariety[]>([]);
  const [selectedVariety, setSelectedVariety] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const refresh = useCallback(() => {
    getDashboardFavoriteMarkets().then((result) => {
      setFavorites(result.favorites);
      setSource(result.source);
    });
  }, []);

  useEffect(() => {
    refresh();
    getDashboardVarieties().then(({ varieties }) => setVarieties(varieties));
  }, [refresh]);

  const isReal = source === "database";
  const loading = favorites === null;

  function varietyName(id: string) {
    return varieties.find((v) => v.id === id)?.name ?? "Unknown variety";
  }

  async function handleAdd() {
    if (!selectedVariety) return;
    setIsAdding(true);
    await addDashboardFavoriteMarket(selectedVariety);
    setIsAdding(false);
    setSelectedVariety("");
    refresh();
  }

  async function handleRemove(id: string) {
    setFavorites((prev) => prev?.filter((f) => f.id !== id) ?? prev);
    await removeDashboardFavoriteMarket(id);
  }

  return (
    <div className="glass rounded-xl3 p-6 shadow-card">
      <h3 className="mb-5 font-heading text-lg font-semibold text-white">Favorite Markets</h3>

      {loading && <p className="text-sm text-white/40">Loading favorites...</p>}

      {!loading && isReal && (
        <>
          <div className="mb-4 flex gap-2">
            <select
              value={selectedVariety}
              onChange={(e) => setSelectedVariety(e.target.value)}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:border-coffee-gold focus:outline-none"
            >
              <option value="" className="bg-surface-void">
                Choose a variety to follow
              </option>
              {varieties.map((v) => (
                <option key={v.id} value={v.id} className="bg-surface-void">
                  {v.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!selectedVariety || isAdding}
              className="flex items-center gap-1.5 rounded-xl bg-coffee-gradient px-4 py-2.5 text-xs font-semibold text-white shadow-glow-gold disabled:opacity-60"
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
          </div>

          {favorites!.length === 0 ? (
            <p className="rounded-xl bg-white/[0.03] px-4 py-6 text-center text-sm text-white/50">
              No favorite markets yet — add one above to track it here.
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-white/[0.06]">
              {favorites!.map((fav, i) => (
                <motion.div
                  key={fav.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex items-center justify-between py-4"
                >
                  <span className="flex items-center gap-3">
                    <Star className="h-4 w-4 fill-coffee-gold text-coffee-gold" />
                    <span className="text-sm font-medium text-white">
                      {varietyName(fav.varietyId)}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemove(fav.id)}
                    aria-label="Remove favorite"
                    className="rounded-full p-1.5 text-white/30 hover:bg-white/[0.06] hover:text-white/70"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {!loading && !isReal && (
        <>
          <p className="-mt-1 mb-4 w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
            Showing demo data — connect Supabase and sign in to track real favorites
          </p>
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
        </>
      )}
    </div>
  );
}
