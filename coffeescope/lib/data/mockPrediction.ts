function seeded(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export interface PredictionChartPoint {
  label: string;
  historical: number | null;
  forecast: number | null;
}

export type Recommendation = "Buy" | "Hold" | "Sell";

export interface PredictionHorizon {
  id: "tomorrow" | "week" | "month";
  label: string;
  predictedPrice: number;
  changePct: number;
  confidence: number;
  recommendation: Recommendation;
  reasoning: string;
  chartData: PredictionChartPoint[];
}

const rand = seeded(41);
const HISTORICAL_DAYS = 14;
const lastPrice = 580.4;

function buildHistorical(): PredictionChartPoint[] {
  return Array.from({ length: HISTORICAL_DAYS }, (_, i) => ({
    label: `D-${HISTORICAL_DAYS - i}`,
    historical: Number((lastPrice - 14 + i * 1.2 + Math.sin(i / 2) * 4 + rand() * 3).toFixed(2)),
    forecast: null,
  }));
}

function buildForecast(
  steps: number,
  labelFn: (i: number) => string,
  drift: number
): PredictionChartPoint[] {
  let value = lastPrice;
  return Array.from({ length: steps }, (_, i) => {
    value = value + drift + (rand() - 0.5) * 3;
    return { label: labelFn(i), historical: null, forecast: Number(value.toFixed(2)) };
  });
}

const historical = buildHistorical();
// Bridge point so the solid historical line connects visually into the
// dashed forecast line at the same x position.
const bridge: PredictionChartPoint = { label: "Today", historical: lastPrice, forecast: lastPrice };

export const PREDICTION_HORIZONS: PredictionHorizon[] = [
  {
    id: "tomorrow",
    label: "Tomorrow",
    predictedPrice: 588.6,
    changePct: 1.39,
    confidence: 87,
    recommendation: "Hold",
    reasoning:
      "Short-term momentum is mildly positive, but the move is within normal daily volatility — not enough signal to change position size yet.",
    chartData: [...historical, bridge, ...buildForecast(1, () => "Tomorrow", 4.3)],
  },
  {
    id: "week",
    label: "Next Week",
    predictedPrice: 607.9,
    changePct: 4.72,
    confidence: 74,
    recommendation: "Buy",
    reasoning:
      "Frost risk in Minas Gerais and tightening Vietnamese Robusta supply are converging — model weights this as a supply-side upward pressure signal.",
    chartData: [...historical, bridge, ...buildForecast(7, (i) => `Day ${i + 1}`, 2.1)],
  },
  {
    id: "month",
    label: "Next Month",
    predictedPrice: 554.6,
    changePct: -4.46,
    confidence: 58,
    recommendation: "Sell",
    reasoning:
      "Longer-horizon forecasts carry wider uncertainty bands. Seasonal harvest inflow from Brazil typically eases prices by this point — confidence is moderate, not high.",
    chartData: [...historical, bridge, ...buildForecast(4, (i) => `Week ${i + 1}`, -3.6)],
  },
];
