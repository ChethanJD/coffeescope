"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function ConfidenceGauge({ confidence }: { confidence: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - confidence / 100);

  const color = confidence >= 75 ? "#3A7D44" : confidence >= 55 ? "#D6A55C" : "#C24444";

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg viewBox="0 0 130 130" className="h-full w-full -rotate-90">
        <circle
          cx="65"
          cy="65"
          r={radius}
          fill="none"
          stroke="white"
          strokeOpacity="0.08"
          strokeWidth="10"
        />
        <motion.circle
          cx="65"
          cy="65"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <AnimatedCounter
          value={confidence}
          decimals={0}
          suffix="%"
          className="font-heading text-2xl font-semibold text-white"
        />
        <span className="text-[10px] uppercase tracking-wide text-white/40">Confidence</span>
      </div>
    </div>
  );
}
