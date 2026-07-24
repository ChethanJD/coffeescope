import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { AIPrediction } from "@/components/sections/AIPrediction";

export const metadata: Metadata = { title: "AI Prediction — CoffeeScope" };

export default function AIPage() {
  return (
    <PageShell>
      <AIPrediction />
    </PageShell>
  );
}
