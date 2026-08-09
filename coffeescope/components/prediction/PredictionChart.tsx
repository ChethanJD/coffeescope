"use client";

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { chartTooltipStyle, axisTickStyle } from "@/components/analytics/chartTheme";
import type { PredictionChartPoint } from "@/lib/data/mockPrediction";

export function PredictionChart({ data }: { data: PredictionChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <ComposedChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: -8 }}>
        <CartesianGrid stroke="white" strokeOpacity={0.06} vertical={false} />
        <XAxis dataKey="label" tick={axisTickStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} width={44} domain={["auto", "auto"]} />
        <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#fff" }} />
        <ReferenceLine x="Today" stroke="white" strokeOpacity={0.15} strokeDasharray="4 4" />
        <Line
          type="monotone"
          dataKey="historical"
          name="Historical"
          stroke="#D6A55C"
          strokeWidth={2.5}
          dot={false}
          connectNulls={false}
          animationDuration={1200}
        />
        <Line
          type="monotone"
          dataKey="forecast"
          name="AI Forecast"
          stroke="#3A7D44"
          strokeWidth={2.5}
          strokeDasharray="6 4"
          dot={false}
          connectNulls={false}
          animationDuration={1200}
          animationBegin={200}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
