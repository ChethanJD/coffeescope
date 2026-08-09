import type { PredictionChartPoint } from "@/lib/data/mockPrediction";

function seeded(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export type HomeForecastHorizonId = "today" | "tomorrow" | "week" | "month" | "sixmonth";

export interface HomeForecastHorizon {
  id: HomeForecastHorizonId;
  label: string;
  predictedPrice: number;
  changePct: number;
  chartData: PredictionChartPoint[];
}

const rand = seeded(67);
const lastPrice = 580.4;
const HISTORICAL_POINTS = 12;

function buildHistorical(labelFn: (i: number) => string): PredictionChartPoint[] {
  let value = lastPrice - 10;
  return Array.from({ length: HISTORICAL_POINTS }, (_, i) => {
    value = Number((value + (rand() - 0.4) * 3).toFixed(2));
    return { label: labelFn(i), historical: value, forecast: null };
  });
}

function buildForecast(steps: number, labelFn: (i: number) => string, drift: number): PredictionChartPoint[] {
  let value = lastPrice;
  return Array.from({ length: steps }, (_, i) => {
    value = Number((value + drift + (rand() - 0.5) * 2.5).toFixed(2));
    return { label: labelFn(i), historical: null, forecast: value };
  });
}

function bridgeAt(label: string): PredictionChartPoint {
  return { label, historical: lastPrice, forecast: lastPrice };
}

export const HOME_FORECAST_HORIZONS: HomeForecastHorizon[] = [
  {
    id: "today",
    label: "Today",
    predictedPrice: 583.9,
    changePct: 0.6,
    chartData: [
      ...buildHistorical((i) => `${i * 2}:00`),
      bridgeAt("Now"),
      ...buildForecast(4, (i) => `+${(i + 1) * 2}h`, 0.9),
    ],
  },
  {
    id: "tomorrow",
    label: "Tomorrow",
    predictedPrice: 588.6,
    changePct: 1.4,
    chartData: [
      ...buildHistorical((i) => `D-${HISTORICAL_POINTS - i}`),
      bridgeAt("Today"),
      ...buildForecast(1, () => "Tomorrow", 4.3),
    ],
  },
  {
    id: "week",
    label: "7 Day",
    predictedPrice: 607.9,
    changePct: 4.7,
    chartData: [
      ...buildHistorical((i) => `D-${HISTORICAL_POINTS - i}`),
      bridgeAt("Today"),
      ...buildForecast(7, (i) => `Day ${i + 1}`, 2.1),
    ],
  },
  {
    id: "month",
    label: "1 Month",
    predictedPrice: 554.6,
    changePct: -4.5,
    chartData: [
      ...buildHistorical((i) => `D-${HISTORICAL_POINTS - i}`),
      bridgeAt("Today"),
      ...buildForecast(4, (i) => `Week ${i + 1}`, -3.6),
    ],
  },
  {
    id: "sixmonth",
    label: "6 Month",
    predictedPrice: 621.3,
    changePct: 7.05,
    chartData: [
      ...buildHistorical((i) => `M-${HISTORICAL_POINTS - i}`),
      bridgeAt("Today"),
      ...buildForecast(6, (i) => `Month ${i + 1}`, 5.8),
    ],
  },
];
