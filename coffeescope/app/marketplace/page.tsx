import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Marketplace } from "@/components/sections/Marketplace";

export const metadata: Metadata = { title: "Marketplace — CoffeeScope" };

export default function MarketplacePage() {
  return (
    <PageShell>
      <Marketplace />
    </PageShell>
  );
}
