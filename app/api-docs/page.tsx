import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "API — CoffeeScope" };

export default function ApiDocsPage() {
  return (
    <StaticPage eyebrow="Developers" title="CoffeeScope API">
      <p>
        A REST API for live coffee prices, weather data, and AI predictions
        is planned, backed by FastAPI and JWT authentication. It's not
        public yet.
      </p>
      <h2>Planned endpoints</h2>
      <div className="not-prose flex flex-col gap-2">
        {[
          "GET /api/market/live",
          "GET /api/market/history?timeframe=7d",
          "GET /api/weather/:locationId",
          "POST /api/disease/analyze",
          "GET /api/predictions/:horizon",
        ].map((endpoint) => (
          <code
            key={endpoint}
            className="rounded-lg bg-white/[0.04] px-4 py-2.5 text-xs text-coffee-gold"
          >
            {endpoint}
          </code>
        ))}
      </div>
      <p className="mt-4">
        Want early access when the API opens up? Email{" "}
        <a href="mailto:api@coffeescope.ai">api@coffeescope.ai</a>.
      </p>
    </StaticPage>
  );
}
