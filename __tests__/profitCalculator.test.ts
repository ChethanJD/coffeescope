import { describe, it, expect } from "vitest";
import { calculateProfit } from "@/lib/calculators/profitCalculator";

describe("calculateProfit", () => {
  it("computes yield, revenue, cost, profit, and ROI for a profitable farm", () => {
    const result = calculateProfit({
      areaHectares: 2,
      yieldKgPerHectare: 1000,
      costPerHectare: 50000,
      sellingPricePerKg: 300,
    });

    expect(result.totalYieldKg).toBe(2000);
    expect(result.totalRevenue).toBe(600000);
    expect(result.totalCost).toBe(100000);
    expect(result.profit).toBe(500000);
    expect(result.roiPct).toBe(500);
  });

  it("returns a negative profit when costs exceed revenue", () => {
    const result = calculateProfit({
      areaHectares: 1,
      yieldKgPerHectare: 200,
      costPerHectare: 100000,
      sellingPricePerKg: 100,
    });

    expect(result.profit).toBeLessThan(0);
    expect(result.roiPct).toBeLessThan(0);
  });

  it("does not divide by zero when cost is zero", () => {
    const result = calculateProfit({
      areaHectares: 1,
      yieldKgPerHectare: 500,
      costPerHectare: 0,
      sellingPricePerKg: 200,
    });

    expect(result.totalCost).toBe(0);
    expect(result.roiPct).toBe(0);
    expect(Number.isFinite(result.roiPct)).toBe(true);
  });

  it("does not divide by zero when yield is zero", () => {
    const result = calculateProfit({
      areaHectares: 1,
      yieldKgPerHectare: 0,
      costPerHectare: 50000,
      sellingPricePerKg: 200,
    });

    expect(result.totalYieldKg).toBe(0);
    expect(result.breakEvenPricePerKg).toBe(0);
    expect(Number.isFinite(result.breakEvenPricePerKg)).toBe(true);
  });

  it("computes a break-even price that would yield exactly zero profit", () => {
    const inputs = {
      areaHectares: 3,
      yieldKgPerHectare: 800,
      costPerHectare: 40000,
      sellingPricePerKg: 0,
    };
    const { breakEvenPricePerKg } = calculateProfit(inputs);
    const atBreakEven = calculateProfit({ ...inputs, sellingPricePerKg: breakEvenPricePerKg });

    expect(atBreakEven.profit).toBeCloseTo(0, 6);
  });
});
