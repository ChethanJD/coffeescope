"use client";

import { OriginMap } from "@/components/market/OriginMap";
import { Activity, ArrowUpRight, Globe2, ShieldCheck } from "lucide-react";

export function GlobalMarket() {
  return (
    <section id="global-market" className="relative overflow-hidden bg-surface-void px-4 py-20 sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-coffee-gold/[0.07] blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            Global Market
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Global coffee prices, one live view
          </h2>
          <p className="mt-4 text-white/50">
            Filter Arabica and Robusta origins, then select any marker for
            local pricing, processing, altitude, and harvest status.
          </p>
        </div>

        <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Origins tracked", value: "6", icon: Globe2 },
            { label: "Market coverage", value: "24/7", icon: Activity },
            { label: "Data status", value: "Healthy", icon: ShieldCheck },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass-subtle rounded-2xl px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">{label}</span>
                <Icon className="h-4 w-4 text-coffee-gold/80" />
              </div>
              <div className="mt-2 font-heading text-xl font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>
        <div className="glass mt-6 overflow-hidden rounded-2xl p-3 shadow-card sm:p-4"><OriginMap /></div>
        <div className="mt-4 flex items-center justify-between text-xs text-white/35">
          <span>Regional pricing and harvest signals</span>
          <span className="flex items-center gap-1 text-coffee-gold"><ArrowUpRight className="h-3 w-3" /> Select an origin for details</span>
        </div>
      </div>
    </section>
  );
}
