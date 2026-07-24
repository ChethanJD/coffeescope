import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { News } from "@/components/sections/News";

export const metadata: Metadata = { title: "News — CoffeeScope" };

export default function NewsPage() {
  return (
    <PageShell>
      <News />
    </PageShell>
  );
}
