import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Blog — CoffeeScope" };

export default function BlogPage() {
  return (
    <StaticPage eyebrow="Blog" title="Notes from the CoffeeScope team">
      <p>
        We're just getting started publishing here — expect deep dives on
        market trends, how our prediction models work, and field reports
        from coffee-growing regions we work with.
      </p>
      <p className="text-white/40">
        Check back soon, or read the latest{" "}
        <a href="/news">market news</a> in the meantime.
      </p>
    </StaticPage>
  );
}
