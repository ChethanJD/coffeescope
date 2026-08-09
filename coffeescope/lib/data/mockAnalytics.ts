// Deterministic pseudo-random generator so charts don't hydration-mismatch
// between server and client render (no Math.random on each call).
function seeded(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export interface PricePoint {
  date: string;
  arabica: number;
  robusta: number;
}

const rand1 = seeded(7);
export const PRICE_TREND: PricePoint[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  return {
    date: `${day < 10 ? "0" : ""}${day}`,
    arabica: Number((580 + Math.sin(i / 3) * 30 + rand1() * 15).toFixed(2)),
    robusta: Number((310 + Math.cos(i / 4) * 16 + rand1() * 10).toFixed(2)),
  };
});

export interface OriginVolume {
  country: string;
  exportsTons: number;
}

export const EXPORT_VOLUME: OriginVolume[] = [
  { country: "Brazil", exportsTons: 2400 },
  { country: "Vietnam", exportsTons: 1650 },
  { country: "Colombia", exportsTons: 610 },
  { country: "Ethiopia", exportsTons: 280 },
  { country: "India", exportsTons: 220 },
];

export interface MarketShare {
  country: string;
  sharePct: number;
  color: string;
}

export const MARKET_SHARE: MarketShare[] = [
  { country: "Brazil", sharePct: 38, color: "#D6A55C" },
  { country: "Vietnam", sharePct: 27, color: "#3A7D44" },
  { country: "Colombia", sharePct: 15, color: "#5C3B21" },
  { country: "Ethiopia", sharePct: 12, color: "#8A6A4A" },
  { country: "India", sharePct: 8, color: "#6E8F6F" },
];

export const HEATMAP_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
export const HEATMAP_VARIETIES = ["Arabica", "Robusta"] as const;

const rand2 = seeded(23);
export const VOLATILITY_HEATMAP: number[][] = HEATMAP_VARIETIES.map((_, v) =>
  HEATMAP_MONTHS.map((_, m) => {
    const base = v === 0 ? 4 : 2.5;
    return Number((base + Math.abs(Math.sin(m + v)) * 6 + rand2() * 3).toFixed(1));
  })
);
