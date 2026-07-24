import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { DiseaseDetection } from "@/components/sections/DiseaseDetection";

export const metadata: Metadata = { title: "Disease Detection — CoffeeScope" };

export default function DiseaseDetectionPage() {
  return (
    <PageShell>
      <DiseaseDetection />
    </PageShell>
  );
}
