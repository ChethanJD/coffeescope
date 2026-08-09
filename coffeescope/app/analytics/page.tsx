import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Analytics } from "@/components/sections/Analytics";

export const metadata: Metadata = { title: "Analytics — CoffeeScope" };

export default function AnalyticsPage() {
  return (
    <PageShell>
      <Analytics />
    </PageShell>
  );
}
