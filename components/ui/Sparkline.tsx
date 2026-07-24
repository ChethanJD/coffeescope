"use client";

import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";

interface SparklineProps {
  data: number[];
  color: string;
  height?: number;
}

/**
 * Chrome-free area sparkline — no axes, gridlines, or tooltip by design,
 * since it lives inside a compact market card as a trend glance, not a
 * full chart (that's what the Analytics section is for).
 */
export function Sparkline({ data, color, height = 56 }: SparklineProps) {
  const points = data.map((value, index) => ({ index, value }));
  const gradientId = `sparkline-${color.replace("#", "")}`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={points} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis domain={["dataMin - 2", "dataMax + 2"]} hide />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          isAnimationActive
          animationDuration={1200}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
