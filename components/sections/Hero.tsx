"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  PlayCircle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

function MarketPulse() {
  return (
    <svg
      viewBox="0 0 900 320"
      fill="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] w-full opacity-35"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroPulse" x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#C98A45" stopOpacity="0" />
          <stop offset="0.22" stopColor="#E0A85C" stopOpacity="0.55" />
          <stop offset="0.58" stopColor="#E0A85C" stopOpacity="0.9" />
          <stop offset="1" stopColor="#C98A45" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E0A85C" stopOpacity="0.10" />
          <stop offset="1" stopColor="#E0A85C" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 246 C92 236 108 210 176 218 C246 226 274 164 338 180 C410 198 420 112 488 136 C550 158 568 192 626 154 C692 112 730 142 790 98 C832 68 860 78 900 54 L900 320 L0 320 Z"
        fill="url(#heroArea)"
      />
      <motion.path
        d="M0 246 C92 236 108 210 176 218 C246 226 274 164 338 180 C410 198 420 112 488 136 C550 158 568 192 626 154 C692 112 730 142 790 98 C832 68 860 78 900 54"
        stroke="url(#heroPulse)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      />
    </svg>
  );
}

const quotes = [
  { name: "Arabica", price: "₹58,040", change: "+1.82%", up: true },
  { name: "Robusta", price: "₹31,275", change: "−0.94%", up: false },
  { name: "ICE C", price: "¢318.20", change: "+0.61%", up: true },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-surface-void pt-24 sm:pt-28 lg:pt-20">
      <div className="absolute inset-0 -z-20 bg-coffee-radial" />
      <div className="absolute left-[8%] top-16 -z-10 h-64 w-64 rounded-full bg-coffee-gold/10 blur-3xl" />
      <div className="absolute right-[4%] top-32 -z-10 h-80 w-80 rounded-full bg-coffee-amber/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-surface-void to-transparent" />

      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10 lg:pb-20 lg:pt-8">
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-coffee-gold/20 bg-white/[0.045] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-coffee-gold backdrop-blur-xl"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coffee-leaf" />
            Market intelligence · 47 origins tracked
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mx-auto max-w-4xl font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:mx-0 lg:text-[4.65rem]"
          >
            Coffee market intelligence,
            <span className="block text-gradient-gold">built for decisions.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-white/60 sm:text-lg lg:mx-0"
          >
            Track global coffee prices, market movements, weather signals, and AI-assisted forecasts in one focused workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <a
              href="#market"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-coffee-gradient px-6 text-sm font-semibold text-white shadow-glow-gold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            >
              Explore market
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#demo"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-6 text-sm font-semibold text-white/85 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <PlayCircle className="h-4 w-4" />
              Watch demo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="mx-auto mt-9 grid max-w-xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.035] px-2 py-3 text-left backdrop-blur-xl lg:mx-0"
          >
            {[
              ["47", "Origins tracked"],
              ["24/7", "Market monitoring"],
              ["AI", "Forecast signals"],
            ].map(([value, label]) => (
              <div key={label} className="px-3 sm:px-5">
                <p className="font-heading text-lg font-semibold text-white sm:text-xl">{value}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/35 sm:text-[11px]">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-xl lg:mx-0"
        >
          <div className="glass relative overflow-hidden rounded-3xl p-4 shadow-card sm:p-5">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                  <BarChart3 className="h-3.5 w-3.5 text-coffee-gold" />
                  Live market
                </div>
                <p className="mt-1 text-xs text-white/30">Benchmark prices · updated now</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-coffee-leaf/20 bg-coffee-leaf/10 px-2.5 py-1 text-[10px] font-semibold text-coffee-leaf">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-coffee-leaf" /> Open
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              <MarketPulse />
              <div className="relative divide-y divide-white/[0.08]">
                {quotes.map((quote) => (
                  <div key={quote.name} className="flex items-center justify-between px-4 py-4 transition-colors hover:bg-white/[0.035] sm:px-5">
                    <div>
                      <p className="font-heading font-semibold text-white">{quote.name}</p>
                      <p className="mt-1 text-[11px] text-white/35">Benchmark spot</p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-xl font-semibold tracking-tight text-white">{quote.price}</p>
                      <p className={`mt-1 flex items-center justify-end gap-1 text-xs font-semibold ${quote.up ? "text-coffee-leaf" : "text-red-400"}`}>
                        {quote.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {quote.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">Market index</p>
                <p className="mt-1 font-heading text-xl font-semibold text-white">184.6</p>
                <p className="mt-1 text-xs font-semibold text-coffee-leaf">+1.7% today</p>
              </div>
              <a href="#market" className="group flex items-center justify-between rounded-2xl border border-coffee-gold/15 bg-coffee-gold/[0.07] p-3.5 transition-all hover:border-coffee-gold/25 hover:bg-coffee-gold/[0.10]">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-coffee-gold/70">Full dashboard</p>
                  <p className="mt-1 text-sm font-semibold text-white">Explore markets</p>
                </div>
                <ChevronRight className="h-4 w-4 text-coffee-gold transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
