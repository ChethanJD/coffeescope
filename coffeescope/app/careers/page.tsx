import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Careers — CoffeeScope" };

const OPEN_ROLES = [
  { title: "Frontend Engineer", team: "Product", location: "Remote" },
  { title: "ML Engineer — Price Prediction", team: "AI", location: "Remote" },
  { title: "Agronomist — Disease Detection", team: "Data", location: "Bengaluru, India" },
  { title: "Field Operations, Karnataka", team: "Growth", location: "Chikmagalur, India" },
];

export default function CareersPage() {
  return (
    <StaticPage eyebrow="Careers" title="Help build the platform coffee farmers deserve">
      <p>
        We're a small team working on real problems for coffee growers and
        traders. If you care about agriculture, climate data, or building
        genuinely useful software, we'd like to hear from you.
      </p>
      <h2>Open roles</h2>
      <div className="not-prose mt-2 flex flex-col gap-3">
        {OPEN_ROLES.map((role) => (
          <div
            key={role.title}
            className="glass flex flex-wrap items-center justify-between gap-2 rounded-xl2 px-5 py-4"
          >
            <div>
              <p className="text-sm font-semibold text-white">{role.title}</p>
              <p className="mt-0.5 text-xs text-white/40">{role.team}</p>
            </div>
            <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-white/50">
              {role.location}
            </span>
          </div>
        ))}
      </div>
      <p>
        Don't see a fit but think you should still talk to us? Reach out at{" "}
        <a href="mailto:careers@coffeescope.ai">careers@coffeescope.ai</a>.
      </p>
    </StaticPage>
  );
}
