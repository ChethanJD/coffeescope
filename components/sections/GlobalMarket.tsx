"use client";

import { useState } from "react";
import { GlobalMap } from "@/components/market/GlobalMap";
import { CountryDetailPanel } from "@/components/market/CountryDetailPanel";
import { IndiaDrilldown } from "@/components/market/IndiaDrilldown";
import type { CountryMarketData } from "@/lib/data/mockCountries";

export function GlobalMarket() {
  const [selected, setSelected] = useState<CountryMarketData | null>(null);

  return (
    <section id="global-market" className="relative bg-surface-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            Global Market
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Five origins, one live view
          </h2>
          <p className="mt-4 text-white/50">
            Click a marker to see production, trade flow, weather, and
            harvest outlook for each origin country.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <GlobalMap onSelectCountry={setSelected} selectedId={selected?.id ?? null} />
          <div className="min-h-[300px] lg:min-h-[520px]">
            <CountryDetailPanel country={selected} />
          </div>
        </div>

        {selected?.id === "IN" && <IndiaDrilldown />}
      </div>
    </section>
  );
}
