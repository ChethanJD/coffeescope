export type Timeframe = "today" | "yesterday" | "7d" | "1m" | "1y" | "3y" | "5y" | "10y";

export interface HistoryPoint {
  label: string;
  arabica: number;
  robusta: number;
}

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildSeries(
  points: number,
  labelFn: (i: number) => string,
  arabicaBase: number,
  robustaBase: number,
  seed: number,
  volatility: number
): HistoryPoint[] {
  const rand = seededRand(seed);
  let arabica = arabicaBase;
  let robusta = robustaBase;
  return Array.from({ length: points }, (_, i) => {
    arabica = Number((arabica + (rand() - 0.5) * arabicaBase * volatility).toFixed(2));
    robusta = Number((robusta + (rand() - 0.5) * robustaBase * volatility).toFixed(2));
    return { label: labelFn(i), arabica, robusta };
  });
}

const HOURS = ["12AM", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12PM", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CURRENT_YEAR = 2026;

export function getHistoricalSeries(timeframe: Timeframe): HistoryPoint[] {
  const arabicaBase = 580.4;
  const robustaBase = 312.75;

  switch (timeframe) {
    case "yesterday":
      return buildSeries(24, (i) => HOURS[i] ?? `${i}:00`, arabicaBase, robustaBase, 3, 0.008);
    case "7d":
      return buildSeries(7, (i) => DAYS_OF_WEEK[i] ?? `Day ${i + 1}`, arabicaBase, robustaBase, 7, 0.02);
    case "1m":
      return buildSeries(30, (i) => `${i + 1}`, arabicaBase, robustaBase, 13, 0.018);
    case "1y":
      return buildSeries(12, (i) => MONTHS[i] ?? `Month ${i + 1}`, arabicaBase, robustaBase, 21, 0.05);
    case "3y":
      return buildSeries(3, (i) => `${CURRENT_YEAR - 2 + i}`, arabicaBase * 0.85, robustaBase * 0.85, 31, 0.16);
    case "5y":
      return buildSeries(5, (i) => `${CURRENT_YEAR - 4 + i}`, arabicaBase * 0.65, robustaBase * 0.65, 41, 0.2);
    case "10y":
      return buildSeries(10, (i) => `${CURRENT_YEAR - 9 + i}`, arabicaBase * 0.4, robustaBase * 0.4, 53, 0.25);
    default:
      return buildSeries(30, (i) => `${i}`, arabicaBase, robustaBase, 1, 0.01);
  }
}

export const TIMEFRAME_OPTIONS: { id: Timeframe; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "7d", label: "7 Day" },
  { id: "1m", label: "1 Month" },
  { id: "1y", label: "1 Year" },
  { id: "3y", label: "3 Year" },
  { id: "5y", label: "5 Year" },
  { id: "10y", label: "10 Year" },
];
