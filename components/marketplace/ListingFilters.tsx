"use client";

import { cn } from "@/lib/utils";

export type SortOption = "newest" | "price-asc" | "price-desc" | "quantity-desc";

const VARIETIES = ["All", "Arabica", "Robusta", "Heirloom Arabica", "Washed Arabica"];
const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "newest", label: "Newest Harvest" }, { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" }, { id: "quantity-desc", label: "Quantity Available" },
];

export function ListingFilters({ activeVariety, onVarietyChange, sort, onSortChange }: {
  activeVariety: string; onVarietyChange: (v: string) => void; sort: SortOption; onSortChange: (s: SortOption) => void;
}) {
  return (
    <div className="glass-subtle flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-1.5">
        {VARIETIES.map((variety) => (
          <button key={variety} type="button" onClick={() => onVarietyChange(variety)}
            aria-pressed={activeVariety === variety}
            className={cn(
              "rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-coffee-gold/30",
              activeVariety === variety
                ? "border-coffee-gold/25 bg-coffee-gradient text-white shadow-glow-gold"
                : "border-transparent bg-white/[0.04] text-white/50 hover:border-white/10 hover:bg-white/[0.07] hover:text-white/75"
            )}>
            {variety}
          </button>
        ))}
      </div>

      <label className="relative shrink-0">
        <span className="sr-only">Sort listings</span>
        <select value={sort} onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="glass w-full appearance-none rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 pr-9 text-xs font-medium text-white/80 outline-none transition focus:border-coffee-gold/50 focus:ring-2 focus:ring-coffee-gold/10 sm:w-auto">
          {SORT_OPTIONS.map((opt) => <option key={opt.id} value={opt.id} className="bg-surface-card text-white">{opt.label}</option>)}
        </select>
      </label>
    </div>
  );
}
