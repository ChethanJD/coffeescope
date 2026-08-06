"use client";

import { useMemo, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WEATHER_LOCATIONS, type LocationWeather } from "@/lib/data/mockWeather";

export function LocationSearch({
  onSelect,
}: {
  onSelect: (location: LocationWeather) => void;
}) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return WEATHER_LOCATIONS;
    const q = query.toLowerCase();
    return WEATHER_LOCATIONS.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.region.toLowerCase().includes(q) ||
        loc.state?.toLowerCase().includes(q) ||
        loc.district?.toLowerCase().includes(q) ||
        loc.pincode?.includes(q)
    );
  }, [query]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="glass flex items-center gap-3 rounded-full px-4 py-3">
        <Search className="h-4 w-4 shrink-0 text-white/40" />
        <input
          type="text"
          value={query}
          placeholder="Search a growing region..."
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 120)}
          className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
        />
      </div>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass absolute z-20 mt-2 w-full overflow-hidden rounded-2xl shadow-card"
          >
            {results.length === 0 ? (
              <p className="px-4 py-3 text-sm text-white/40">No regions found.</p>
            ) : (
              results.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onMouseDown={() => {
                    onSelect(loc);
                    setQuery("");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white/80 transition-colors hover:bg-white/5"
                >
                  <MapPin className="h-3.5 w-3.5 text-coffee-gold" />
                  <span className="font-medium text-white">{loc.name}</span>
                  <span className="text-white/40">{loc.region}</span>
                  {loc.pincode && <span className="ml-auto text-xs text-white/30">{loc.pincode}</span>}
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
