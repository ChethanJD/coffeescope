"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

/**
 * Signature element: a single continuous line that reads simultaneously as
 * a commodity price chart (the platform's core promise) and the split
 * contour of a coffee bean (the platform's subject). It draws itself in
 * on load, then idles with a slow ambient float — one orchestrated
 * moment rather than scattered effects.
 */
function MarketPulseBean() {
  return (
    <svg
      viewBox="0 0 900 500"
      fill="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="pulseStroke" x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5C3B21" stopOpacity="0" />
          <stop offset="20%" stopColor="#D6A55C" />
          <stop offset="55%" stopColor="#3A7D44" />
          <stop offset="100%" stopColor="#D6A55C" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="beanGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D6A55C" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#D6A55C" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="450" cy="250" r="240" fill="url(#beanGlow)" />

      {/* The bean's center crease, drawn like a price chart */}
      <motion.path
        d="M60,300 C160,300 180,180 260,210 C320,232 300,290 360,260 C420,230 400,150 470,160 C540,170 520,260 590,240 C650,224 630,140 700,150 C760,158 780,230 840,210"
        stroke="url(#pulseStroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />

      {/* Faint upper/lower bean-husk arcs for context, fade in after the line lands */}
      <motion.path
        d="M60,300 C220,120 620,110 840,210"
        stroke="#D6A55C"
        strokeOpacity="0.12"
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.6 }}
      />
      <motion.path
        d="M60,300 C220,420 620,430 840,210"
        stroke="#5C3B21"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.7 }}
      />
    </svg>
  );
}

const BEAN_POSITIONS = [
  { top: "18%", left: "8%", size: 22, delay: 0, duration: 7 },
  { top: "62%", left: "12%", size: 14, delay: 1.2, duration: 8 },
  { top: "28%", left: "88%", size: 18, delay: 0.6, duration: 6.5 },
  { top: "70%", left: "82%", size: 26, delay: 1.8, duration: 7.5 },
  { top: "12%", left: "48%", size: 12, delay: 0.9, duration: 6 },
];

function FloatingBeans() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {BEAN_POSITIONS.map((bean, i) => (
        <motion.div
          key={i}
          className="absolute rounded-[45%] bg-coffee-bean/70 shadow-lg"
          style={{
            top: bean.top,
            left: bean.left,
            width: bean.size,
            height: bean.size * 1.3,
          }}
          animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
          transition={{
            duration: bean.duration,
            delay: bean.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 rounded-full bg-black/40" />
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-surface-void">
      {/* Ambient gradient field */}
      <div className="absolute inset-0 bg-coffee-radial" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-void" />

      <MarketPulseBean />
      <FloatingBeans />

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
