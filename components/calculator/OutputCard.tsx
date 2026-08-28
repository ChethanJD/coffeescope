"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

interface OutputCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon: React.ElementType;
  tone?: "default" | "positive" | "negative";
}

export function OutputCard({
  label, value, prefix = "", suffix = "", decimals = 0, icon: Icon, tone = "default",
}: OutputCardProps) {
  const toneColor =
    tone === "positive" ? "text-coffee-leaf" : tone === "negative" ? "text-red-300" : "text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="glass group relative overflow-hidden rounded-xl2 p-5 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70" />
      <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/45">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-coffee-gold/15 bg-coffee-gold/10">
          <Icon className="h-3.5 w-3.5 text-coffee-gold" />
        </span>
        {label}
      </span>
      <AnimatedCounter
        value={value}
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        className={cn("mt-3 block font-heading text-2xl font-semibold tabular-nums sm:text-3xl", toneColor)}
      />
    </motion.div>
  );
}
