export interface ProfitInputs {
  areaHectares: number;
  yieldKgPerHectare: number;
  costPerHectare: number;
  sellingPricePerKg: number;
}

export interface ProfitOutputs {
  totalYieldKg: number;
  totalRevenue: number;
  totalCost: number;
  profit: number;
  roiPct: number;
  breakEvenPricePerKg: number;
}

export function calculateProfit(inputs: ProfitInputs): ProfitOutputs {
  const totalYieldKg = inputs.areaHectares * inputs.yieldKgPerHectare;
  const totalRevenue = totalYieldKg * inputs.sellingPricePerKg;
  const totalCost = inputs.areaHectares * inputs.costPerHectare;
  const profit = totalRevenue - totalCost;
  const roiPct = totalCost > 0 ? (profit / totalCost) * 100 : 0;
  const breakEvenPricePerKg = totalYieldKg > 0 ? totalCost / totalYieldKg : 0;

  return { totalYieldKg, totalRevenue, totalCost, profit, roiPct, breakEvenPricePerKg };
}
