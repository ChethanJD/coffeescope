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
 * Live market quotes. In production this is replaced by a React Query
 * hook polling GET /api/market/live (FastAPI -> TimescaleDB), but every
 * consuming component only depends on the MarketQuote shape below.
 */
export const MOCK_QUOTES: MarketQuote[] = [
  {
    variety: "Arabica",
    price: 580.4,
    changeDaily: 1.82,
    changeWeekly: -0.64,
    currency: "INR/kg ₹",
    sparkline: generateSparkline(0.35),
  },
  {
    variety: "Robusta",
    price: 312.75,
    changeDaily: -0.94,
    changeWeekly: 2.31,
    currency: "INR/kg ₹",
    sparkline: generateSparkline(0.58),
  },
];
