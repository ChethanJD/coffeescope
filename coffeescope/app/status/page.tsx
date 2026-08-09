import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Status — CoffeeScope" };

const SYSTEMS = [
  { name: "Live Market Data", status: "Operational" },
  { name: "Weather Intelligence", status: "Operational" },
  { name: "AI Prediction Engine", status: "Operational" },
  { name: "Disease Detection", status: "Operational" },
  { name: "Notifications", status: "Operational" },
];

export default function StatusPage() {
  return (
    <StaticPage eyebrow="Status" title="System status">
      <div className="not-prose flex flex-col gap-2">
        {SYSTEMS.map((s) => (
          <div
            key={s.name}
            className="glass flex items-center justify-between rounded-xl2 px-5 py-3.5"
          >
            <span className="text-sm text-white/80">{s.name}</span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-coffee-leaf">
              <span className="h-1.5 w-1.5 rounded-full bg-coffee-leaf" />
              {s.status}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-white/30">
        This status page shows illustrative data for this demo build, not a
        live incident feed.
      </p>
    </StaticPage>
  );
}
