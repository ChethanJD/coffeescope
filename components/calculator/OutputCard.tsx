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
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  icon: Icon,
  tone = "default",
}: OutputCardProps) {
  const toneColor =
    tone === "positive" ? "text-coffee-leaf" : tone === "negative" ? "text-red-400" : "text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="glass rounded-xl2 p-5"
    >
      <span className="flex items-center gap-2 text-xs font-medium text-white/40">
        <Icon className="h-3.5 w-3.5 text-coffee-gold" />
        {label}
      </span>
      <AnimatedCounter
        value={value}
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        className={cn("mt-2 block font-heading text-2xl font-semibold sm:text-3xl", toneColor)}
      />
    </motion.div>
  );
}
