import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Status — CoffeeScope" };

type SystemState = "operational" | "demo" | "unavailable" | "partial";

const STATE_META: Record<SystemState, { label: string; color: string }> = {
  operational: { label: "Operational", color: "bg-coffee-leaf text-coffee-leaf" },
  demo: { label: "Demo mode", color: "bg-coffee-gold text-coffee-gold" },
  partial: { label: "Partially configured", color: "bg-coffee-gold text-coffee-gold" },
  unavailable: { label: "Not configured", color: "bg-white/30 text-white/50" },
};

export default function StatusPage() {
  const dbConfigured = isSupabaseConfigured();
  const weatherConfigured = Boolean(process.env.OPENWEATHER_API_KEY);
  const newsConfigured = Boolean(process.env.NEWS_API_KEY);

  const systems: { name: string; state: SystemState; note: string }[] = [
    {
      name: "Accounts & Database",
      state: dbConfigured ? "operational" : "unavailable",
      note: dbConfigured
        ? "Supabase is configured — auth, farms, marketplace, alerts, etc. use real data."
        : "Supabase environment variables are not set. The app falls back to sample data.",
    },
    {
      name: "Marketplace",
      state: dbConfigured ? "operational" : "demo",
      note: dbConfigured
        ? "Live listings and messaging, backed by the database."
        : "Showing sample listings — connect Supabase to see real ones.",
    },
    {
      name: "Weather",
      state: weatherConfigured ? "operational" : "demo",
      note: weatherConfigured
        ? "Live current conditions from OpenWeatherMap."
        : "OPENWEATHER_API_KEY is not set — showing demo conditions. Forecast strip and AI recommendation are demo regardless.",
    },
    {
      name: "News",
      state: newsConfigured ? "operational" : "demo",
      note: newsConfigured
        ? "Live articles from NewsAPI."
        : "NEWS_API_KEY is not set — showing sample articles.",
    },
    {
      name: "AI Price Prediction",
      state: "unavailable",
      note: "No forecasting model/API is connected yet. The app never fabricates a prediction — this stays \"not configured\" until a real pipeline is wired up.",
    },
    {
      name: "Disease Detection",
      state: "demo",
      note: "Runs a placeholder analyzer (not real image analysis) so the UI/flow can be tested. Clearly labeled as demo in the product.",
    },
    {
      name: "Notifications",
      state: dbConfigured ? "partial" : "unavailable",
      note: dbConfigured
        ? "Storage and read/unread state are live. There is no automated job yet that generates notifications from alert rules."
        : "Requires Supabase to be configured.",
    },
  ];

  return (
    <StaticPage eyebrow="Status" title="System status">
      <p className="text-white/50">
        This reflects the actual configuration of this deployment, checked
        at page load — not a live incident-monitoring feed. "Operational"
        means the integration is wired to a real provider; "Demo mode"
        means the feature works but is showing sample data; "Not
        configured" means no provider/credentials are set up yet.
      </p>
      <div className="not-prose mt-2 flex flex-col gap-2">
        {systems.map((s) => {
          const meta = STATE_META[s.state];
          return (
            <div key={s.name} className="glass flex flex-col gap-1.5 rounded-xl2 px-5 py-3.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">{s.name}</span>
                <span className={`flex items-center gap-1.5 text-xs font-medium ${meta.color}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${meta.color.split(" ")[0]}`} />
                  {meta.label}
                </span>
              </div>
              <p className="text-xs text-white/40">{s.note}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-xs text-white/30">
        There is no uptime/incident-history tracking implemented yet — this
        page reports current configuration only.
      </p>
    </StaticPage>
  );
}
