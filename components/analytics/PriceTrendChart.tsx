"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PRICE_TREND } from "@/lib/data/mockAnalytics";
import { chartTooltipStyle, axisTickStyle } from "@/components/analytics/chartTheme";

export function PriceTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <LineChart data={PRICE_TREND} margin={{ top: 10, right: 16, bottom: 0, left: -8 }}>
        <CartesianGrid stroke="white" strokeOpacity={0.06} vertical={false} />
        <XAxis dataKey="date" tick={axisTickStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} width={44} />
        <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#fff" }} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#ffffff99" }} />
        <Line
          type="monotone"
          dataKey="arabica"
          name="Arabica ₹/kg"
          stroke="#D6A55C"
          strokeWidth={2.5}
          dot={false}
          animationDuration={1400}
        />
        <Line
          type="monotone"
          dataKey="robusta"
          name="Robusta ₹/kg"
          stroke="#3A7D44"
          strokeWidth={2.5}
          dot={false}
          animationDuration={1400}
          animationBegin={200}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
