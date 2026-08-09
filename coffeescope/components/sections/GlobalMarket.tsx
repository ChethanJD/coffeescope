"use client";

import { OriginMap } from "@/components/market/OriginMap";

export function GlobalMarket() {
  return (
    <section id="global-market" className="relative bg-surface-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            Global Market
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Six origins, one live view
          </h2>
          <p className="mt-4 text-white/50">
            Filter Arabica and Robusta origins, then select any marker for
            local pricing, processing, altitude, and harvest status.
          </p>
        </div>

        <div className="mt-14"><OriginMap /></div>
      </div>
    </section>
  );
}
