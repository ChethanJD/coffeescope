import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Weather } from "@/components/sections/Weather";

export const metadata: Metadata = { title: "Weather — CoffeeScope" };

export default function WeatherPage() {
  return (
    <PageShell>
      <Weather />
    </PageShell>
  );
}
