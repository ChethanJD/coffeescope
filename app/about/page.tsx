import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "About — CoffeeScope" };

export default function AboutPage() {
  return (
    <StaticPage eyebrow="About Us" title="Built for the people who grow coffee">
      <p>
        CoffeeScope started with a simple observation: the people closest to
        the crop — farmers and planters — often have the least access to the
        market intelligence that traders and exporters take for granted.
        We're building the tools to close that gap.
      </p>
      <p>
        Our platform combines live market pricing, weather intelligence, AI
        price prediction, and crop disease detection into one place, with a
        deliberate focus on serving coffee planters first — from a single
        hectare in Kodagu to a cooperative spanning multiple districts.
      </p>
      <h2>What we're building toward</h2>
      <p>
        Real-time data from exchanges and origin countries, predictive
        analytics grounded in weather and trade signals, and field tools
        like disease detection that work from a phone camera in a coffee
        plot with patchy signal — not just a trading desk.
      </p>
    </StaticPage>
  );
}
