"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-surface-void">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-32 text-center sm:pt-24">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-coffee-gold"
        >
          Live · 47 origins tracked in real time
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Know the market
          <br />
          <span className="text-gradient-gold">before the market knows it.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-xl text-balance font-body text-lg text-white/60 sm:text-xl"
        >
          AI-powered coffee market intelligence — real-time prices, weather
          signals, and predictive analytics for farmers, exporters, traders,
          and buyers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#market"
            className="group inline-flex items-center gap-2 rounded-full bg-coffee-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Explore Market
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#demo"
            className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:text-white"
          >
            <PlayCircle className="h-4 w-4" />
            Watch Demo
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-9 w-5.5 rounded-full border border-white/20 p-1">
          <div className="h-1.5 w-1.5 rounded-full bg-coffee-gold" />
        </div>
      </motion.div>
    </section>
  );
}
