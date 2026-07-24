import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Documentation — CoffeeScope" };

const SECTIONS = [
  { title: "Getting Started", desc: "Create an account and connect your first farm." },
  { title: "Live Market Data", desc: "How pricing, timeframes, and quintal conversion work." },
  { title: "AI Prediction", desc: "Understanding confidence scores and forecast horizons." },
  { title: "Disease Detection", desc: "Best practices for photographing leaves and cherries." },
  { title: "Alerts & Notifications", desc: "Setting up price, weather, and disease alerts." },
];

export default function DocsPage() {
  return (
    <StaticPage eyebrow="Documentation" title="Guides for getting the most out of CoffeeScope">
      <div className="not-prose flex flex-col gap-3">
        {SECTIONS.map((s) => (
          <div key={s.title} className="glass rounded-xl2 px-5 py-4">
            <p className="text-sm font-semibold text-white">{s.title}</p>
            <p className="mt-1 text-xs text-white/45">{s.desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-white/40">
        Full documentation is under active development. Have a question in
        the meantime? Visit <a href="/support">Support</a>.
      </p>
    </StaticPage>
  );
}
