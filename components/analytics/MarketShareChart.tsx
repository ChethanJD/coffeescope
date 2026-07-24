"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MARKET_SHARE } from "@/lib/data/mockAnalytics";
import { chartTooltipStyle } from "@/components/analytics/chartTheme";

export function MarketShareChart() {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <PieChart>
        <Pie
          data={MARKET_SHARE}
          dataKey="sharePct"
          nameKey="country"
          innerRadius={70}
          outerRadius={120}
          paddingAngle={3}
          animationDuration={1200}
        >
          {MARKET_SHARE.map((entry) => (
            <Cell key={entry.country} fill={entry.color} stroke="none" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={chartTooltipStyle}
          formatter={(value: number, name: string) => [`${value}%`, name]}
        />
        <Legend
          verticalAlign="middle"
          align="right"
          layout="vertical"
          wrapperStyle={{ fontSize: 12, color: "#ffffff99" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
