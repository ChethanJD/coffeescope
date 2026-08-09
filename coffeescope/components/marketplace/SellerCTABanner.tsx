"use client";

import { motion } from "framer-motion";
import { Sprout, ArrowRight } from "lucide-react";

export function SellerCTABanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass relative flex flex-col items-center gap-4 overflow-hidden rounded-xl3 p-8 text-center sm:flex-row sm:justify-between sm:text-left"
    >
      <div className="absolute inset-0 bg-coffee-radial opacity-60" />
      <div className="relative flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coffee-gold/15">
          <Sprout className="h-6 w-6 text-coffee-gold" />
        </span>
        <div>
          <h3 className="font-heading text-lg font-semibold text-white">
            Growing coffee? List your lot directly.
          </h3>
          <p className="mt-1 text-sm text-white/50">
            Skip the middleman markup — set your own price and reach exporters and roasters directly.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="relative flex shrink-0 items-center gap-2 rounded-full bg-coffee-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.03]"
      >
        List Your Coffee
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
