import type { MarketQuote } from "@/types";

/**
 * Deterministic mock sparkline generator so server and client render the
 * same values (avoids hydration mismatches from Math.random on each render).
 */
function generateSparkline(seed: number, points = 24): number[] {
  let value = 100;
  const series: number[] = [];

  for (let i = 0; i < points; i++) {
    const pseudoRandom = Math.sin(seed * (i + 1)) * 2.5;
    value = Math.max(60, value + pseudoRandom);
    series.push(Number(value.toFixed(2)));
  }

  return series;
}

/**
 * CoffeeScope market quotes.
 *
 * Canonical price unit:
 *   INR per kilogram (₹/kg)
 *
 * Quintal display is derived from the same value:
 *   ₹/quintal = ₹/kg × 100
 */
export const MOCK_QUOTES: MarketQuote[] = [
  {
    variety: "Arabica",
    price: 580.4,
    changeDaily: 1.82,
    changeWeekly: -0.64,
    currency: "INR",
    sparkline: generateSparkline(0.35),
  },
  {
    variety: "Robusta",
    price: 312.75,
    changeDaily: -0.94,
    changeWeekly: 2.31,
    currency: "INR",
    sparkline: generateSparkline(0.58),
  },
];
