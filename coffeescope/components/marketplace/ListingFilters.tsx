"use client";

import { cn } from "@/lib/utils";

export type SortOption = "newest" | "price-asc" | "price-desc" | "quantity-desc";

const VARIETIES = ["All", "Arabica", "Robusta", "Heirloom Arabica", "Washed Arabica"];

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "newest", label: "Newest Harvest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "quantity-desc", label: "Quantity Available" },
];

export function ListingFilters({
  activeVariety,
  onVarietyChange,
  sort,
  onSortChange,
}: {
  activeVariety: string;
  onVarietyChange: (v: string) => void;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {VARIETIES.map((variety) => (
          <button
            key={variety}
            type="button"
            onClick={() => onVarietyChange(variety)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-medium transition-colors",
              activeVariety === variety
                ? "bg-coffee-gradient text-white shadow-glow-gold"
                : "bg-white/[0.05] text-white/50 hover:bg-white/[0.08]"
            )}
          >
            {variety}
          </button>
        ))}
      </div>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="glass rounded-full px-4 py-2 text-xs font-medium text-white/80 focus:outline-none"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id} className="bg-surface-card text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
