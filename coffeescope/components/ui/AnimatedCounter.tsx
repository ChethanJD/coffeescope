"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 2,
  className,
}: AnimatedCounterProps) {
  const { ref, display } = useCountUp(value, { decimals });

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}
      <span ref={ref}>{display}</span>
      {suffix}
    </span>
  );
}
