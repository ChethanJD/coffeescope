"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { EXPORT_VOLUME } from "@/lib/data/mockAnalytics";
import { chartTooltipStyle, axisTickStyle } from "@/components/analytics/chartTheme";

const BAR_COLORS = ["#D6A55C", "#3A7D44", "#5C3B21", "#8A6A4A", "#6E8F6F"];

export function OriginVolumeChart() {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={EXPORT_VOLUME} margin={{ top: 10, right: 16, bottom: 0, left: -8 }}>
        <CartesianGrid stroke="white" strokeOpacity={0.06} vertical={false} />
        <XAxis dataKey="country" tick={axisTickStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} width={44} />
        <Tooltip
          contentStyle={chartTooltipStyle}
          labelStyle={{ color: "#fff" }}
          cursor={{ fill: "rgba(255,255,255,0.03)" }}
          formatter={(value: number) => [`${value.toLocaleString()} t`, "Exports"]}
        />
        <Bar dataKey="exportsTons" radius={[8, 8, 0, 0]} animationDuration={1200}>
          {EXPORT_VOLUME.map((entry, index) => (
            <Cell key={entry.country} fill={BAR_COLORS[index % BAR_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
