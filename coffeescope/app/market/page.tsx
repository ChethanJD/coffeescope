import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { GlobalMarket } from "@/components/sections/GlobalMarket";

export const metadata: Metadata = { title: "Market — CoffeeScope" };

export default function MarketPage() {
  return (
    <PageShell>
      <GlobalMarket />
    </PageShell>
  );
}
