"use client";

import { useMemo, useState } from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useLiveSeries } from "@/hooks/useLiveSeries";
import { getHistoricalSeries, TIMEFRAME_OPTIONS, type Timeframe } from "@/lib/data/liveGraphHistory";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { chartTooltipStyle, axisTickStyle } from "@/components/analytics/chartTheme";
import { cn } from "@/lib/utils";

type VarietyFilter = "both" | "arabica" | "robusta";

export function LiveGraph() {
  // Always ticking in the background so "Today" is instantly live the
  // moment it's selected, without an extra data-fetch delay.
  const liveArabica = useLiveSeries(580.4, 11, 30, 2000);
  const liveRobusta = useLiveSeries(312.75, 29, 30, 2000);
  const [filter, setFilter] = useState<VarietyFilter>("both");
  const [timeframe, setTimeframe] = useState<Timeframe>("today");

  const isLive = timeframe === "today";

  const historicalData = useMemo(() => getHistoricalSeries(timeframe), [timeframe]);

  const chartData = useMemo(() => {
    if (isLive) {
      return liveArabica.series.map((point, i) => ({
        time: point.time,
        arabica: point.value,
        robusta: liveRobusta.series[i]?.value ?? null,
      }));
    }
    return historicalData.map((point) => ({
      time: point.label,
      arabica: point.arabica,
      robusta: point.robusta,
    }));
  }, [isLive, liveArabica.series, liveRobusta.series, historicalData]);

  const currentArabica = isLive
    ? liveArabica.current
    : historicalData[historicalData.length - 1]?.arabica ?? 0;
  const currentRobusta = isLive
    ? liveRobusta.current
    : historicalData[historicalData.length - 1]?.robusta ?? 0;

  const changeArabica = isLive
    ? liveArabica.changePct
    : ((historicalData[historicalData.length - 1]?.arabica - historicalData[0]?.arabica) /
        historicalData[0]?.arabica) *
      100;
  const changeRobusta = isLive
    ? liveRobusta.changePct
    : ((historicalData[historicalData.length - 1]?.robusta - historicalData[0]?.robusta) /
        historicalData[0]?.robusta) *
      100;

  return (
    <section id="market" className="relative bg-surface-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-coffee-leaf",
                isLive && "animate-pulse"
              )}
            />
            {isLive ? "Live Market" : "Market History"}
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Prices that move as fast as the market does
          </h2>
          <p className="mt-4 text-white/50">
            Streaming Arabica and Robusta benchmarks — switch timeframes to
            see the bigger picture.
          </p>
        </div>

        <div className="glass mt-12 rounded-xl3 p-6 shadow-card sm:p-8">
          {/* Header: live prices + variety filter */}
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex flex-wrap gap-8">
              <div>
                <span className="flex items-center gap-2 text-xs text-white/40">
                  <span className="h-2 w-2 rounded-full bg-coffee-gold" />
                  Arabica · INR/kg
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <AnimatedCounter
                    value={currentArabica}
                    prefix="₹"
                    className="font-heading text-3xl font-semibold text-white sm:text-4xl"
                  />
                  <span
                    className={cn(
                      "flex items-center gap-0.5 text-xs font-semibold",
                      changeArabica >= 0 ? "text-coffee-leaf" : "text-red-400"
                    )}
                  >
                    {changeArabica >= 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(changeArabica).toFixed(2)}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/35">
                  ₹{(currentArabica * 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })} / quintal
                </p>
              </div>

              <div>
                <span className="flex items-center gap-2 text-xs text-white/40">
                  <span className="h-2 w-2 rounded-full bg-coffee-leaf" />
                  Robusta · INR/kg
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <AnimatedCounter
                    value={currentRobusta}
                    prefix="₹"
                    className="font-heading text-3xl font-semibold text-white sm:text-4xl"
                  />
                  <span
                    className={cn(
                      "flex items-center gap-0.5 text-xs font-semibold",
                      changeRobusta >= 0 ? "text-coffee-leaf" : "text-red-400"
                    )}
                  >
                    {changeRobusta >= 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(changeRobusta).toFixed(2)}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/35">
                  ₹{(currentRobusta * 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })} / quintal
                </p>
              </div>
            </div>

            <div className="flex gap-1.5">
              {(["both", "arabica", "robusta"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setFilter(v)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors",
                    filter === v
                      ? "bg-white/[0.08] text-white"
                      : "text-white/40 hover:text-white/70"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Timeframe tabs */}
          <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-5">
            {TIMEFRAME_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTimeframe(opt.id)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  timeframe === opt.id
                    ? "bg-coffee-gradient text-white shadow-glow-gold"
                    : "bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white/80"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={340}>
              <ComposedChart data={chartData} margin={{ top: 10, right: 16, bottom: 0, left: -8 }}>
                <CartesianGrid stroke="white" strokeOpacity={0.06} vertical={false} />
                <XAxis dataKey="time" tick={axisTickStyle} axisLine={false} tickLine={false} minTickGap={40} />
                <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} width={44} domain={["auto", "auto"]} />
                <Tooltip contentStyle={chartTooltipStyle} labelStyle={{ color: "#fff" }} />
                {(filter === "both" || filter === "arabica") && (
                  <Line
                    type="monotone"
                    dataKey="arabica"
                    name="Arabica ₹/kg"
                    stroke="#D6A55C"
                    strokeWidth={2.5}
                    dot={false}
                    isAnimationActive={!isLive}
                  />
                )}
                {(filter === "both" || filter === "robusta") && (
                  <Line
                    type="monotone"
                    dataKey="robusta"
                    name="Robusta ₹/kg"
                    stroke="#3A7D44"
                    strokeWidth={2.5}
                    dot={false}
                    isAnimationActive={!isLive}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
