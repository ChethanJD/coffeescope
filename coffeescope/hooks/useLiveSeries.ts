"use client";

import { useEffect, useRef, useState } from "react";

export interface LivePoint {
  time: string;
  value: number;
}

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function formatClock(date: Date) {
  return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

/**
 * Maintains a fixed-length "live" price series that ticks forward every
 * `intervalMs`. Seeded so the initial render is identical on server and
 * client (avoiding hydration mismatches); the ticking itself only starts
 * after mount via useEffect, so it never runs during SSR.
 */
export function useLiveSeries(basePrice: number, seed: number, windowSize = 30, intervalMs = 2000) {
  const randRef = useRef(seededRand(seed));
  const [series, setSeries] = useState<LivePoint[]>(() => {
    let value = basePrice;
    const now = new Date(2026, 0, 1, 9, 0, 0); // fixed anchor time for deterministic SSR output
    return Array.from({ length: windowSize }, (_, i) => {
      value = Number((value + (randRef.current() - 0.5) * (basePrice * 0.01)).toFixed(2));
      const t = new Date(now.getTime() + i * intervalMs);
      return { time: formatClock(t), value };
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSeries((prev) => {
        const last = prev[prev.length - 1] ?? { time: "", value: basePrice };
        const nextValue = Number(
          (last.value + (Math.random() - 0.5) * (basePrice * 0.012)).toFixed(2)
        );
        const nextPoint: LivePoint = { time: formatClock(new Date()), value: nextValue };
        return [...prev.slice(1), nextPoint];
      });
    }, intervalMs);
    return () => clearInterval(interval);
  }, [basePrice, intervalMs]);

  const current = series[series.length - 1]?.value ?? basePrice;
  const first = series[0]?.value ?? basePrice;
  const changePct = first !== 0 ? ((current - first) / first) * 100 : 0;

  return { series, current, changePct };
}
