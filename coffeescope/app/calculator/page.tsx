import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ProfitCalculator } from "@/components/sections/ProfitCalculator";

export const metadata: Metadata = { title: "Profit Calculator — CoffeeScope" };

export default function CalculatorPage() {
  return (
    <PageShell>
      <ProfitCalculator />
    </PageShell>
  );
}
