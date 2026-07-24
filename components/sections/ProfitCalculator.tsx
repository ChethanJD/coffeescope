"use client";

import { useMemo, useState } from "react";
import { Map, Wheat, Wallet, Tag, TrendingUp, IndianRupee, Scale, Percent } from "lucide-react";
import { SliderInput } from "@/components/calculator/SliderInput";
import { OutputCard } from "@/components/calculator/OutputCard";
import { calculateProfit } from "@/lib/calculators/profitCalculator";

export function ProfitCalculator() {
  const [areaHectares, setAreaHectares] = useState(5);
  const [yieldKgPerHectare, setYieldKgPerHectare] = useState(1200);
  const [costPerHectare, setCostPerHectare] = useState(150000);
  const [sellingPricePerKg, setSellingPricePerKg] = useState(350);

  const outputs = useMemo(
    () =>
      calculateProfit({
        areaHectares,
        yieldKgPerHectare,
        costPerHectare,
        sellingPricePerKg,
      }),
    [areaHectares, yieldKgPerHectare, costPerHectare, sellingPricePerKg]
  );

  const isProfitable = outputs.profit >= 0;

  return (
    <section id="profit-calculator" className="relative bg-surface-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            Profit Calculator
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Know your numbers before the season starts
          </h2>
          <p className="mt-4 text-white/50">
            Adjust your farm's area, yield, cost, and selling price to see
            revenue, profit, break-even, and ROI update instantly.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Inputs */}
          <div className="glass flex flex-col gap-7 rounded-xl3 p-6 shadow-card sm:p-7">
            <SliderInput
              label="Farm Area"
              value={areaHectares}
              onChange={setAreaHectares}
              min={0.5}
              max={200}
              step={0.5}
              unit="ha"
              icon={Map}
            />
            <SliderInput
              label="Yield"
              value={yieldKgPerHectare}
              onChange={setYieldKgPerHectare}
              min={200}
              max={4000}
              step={50}
              unit="kg/ha"
              icon={Wheat}
            />
            <SliderInput
              label="Production Cost"
              value={costPerHectare}
              onChange={setCostPerHectare}
              min={20000}
              max={500000}
              step={5000}
              unit="₹/ha"
              icon={Wallet}
            />
            <SliderInput
              label="Selling Price"
              value={sellingPricePerKg}
              onChange={setSellingPricePerKg}
              min={50}
              max={1200}
              step={10}
              unit="₹/kg"
              icon={Tag}
            />
          </div>

          {/* Outputs */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <OutputCard
                label="Expected Revenue"
                value={outputs.totalRevenue}
                prefix="₹"
                icon={IndianRupee}
              />
              <OutputCard
                label="Profit"
                value={outputs.profit}
                prefix="₹"
                icon={TrendingUp}
                tone={isProfitable ? "positive" : "negative"}
              />
              <OutputCard
                label="Break-Even Price"
                value={outputs.breakEvenPricePerKg}
                prefix="₹"
                suffix="/kg"
                decimals={0}
                icon={Scale}
              />
              <OutputCard
                label="ROI"
                value={outputs.roiPct}
                suffix="%"
                decimals={1}
                icon={Percent}
                tone={outputs.roiPct >= 0 ? "positive" : "negative"}
              />
            </div>

            <div className="glass rounded-xl3 p-5 text-sm text-white/50">
              <p>
                At {areaHectares} ha producing {yieldKgPerHectare.toLocaleString()} kg/ha, you'll
                harvest a total of{" "}
                <span className="font-semibold text-white">
                  {outputs.totalYieldKg.toLocaleString()} kg
                </span>
                . You need to sell above{" "}
                <span className="font-semibold text-coffee-gold">
                  ₹{outputs.breakEvenPricePerKg.toFixed(0)}/kg
                </span>{" "}
                to cover your costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
