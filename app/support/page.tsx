import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Support — CoffeeScope" };

const FAQS = [
  {
    q: "How accurate are the AI price predictions?",
    a: "Confidence scores are shown alongside every forecast — shorter horizons (Tomorrow) tend to be more reliable than longer ones (1 Month, 6 Month), which carry wider uncertainty.",
  },
  {
    q: "Is the disease detection tool a substitute for an agronomist?",
    a: "No — treat it as a first-pass screening tool. For high-value decisions, always confirm with a local agricultural extension officer.",
  },
  {
    q: "Which regions does the platform cover?",
    a: "Weather and market data currently focus on Karnataka (Kodagu, Hassan, Chikmagalur), Kerala, and major global origins (Brazil, Vietnam, Colombia, Ethiopia).",
  },
  {
    q: "Can I list my farm's coffee for sale?",
    a: "Yes — use the \"List Your Coffee\" option on the Marketplace page to reach buyers directly.",
  },
];

export default function SupportPage() {
  return (
    <StaticPage eyebrow="Support" title="Frequently asked questions">
      <div className="not-prose flex flex-col gap-3">
        {FAQS.map((faq) => (
          <div key={faq.q} className="glass rounded-xl2 px-5 py-4">
            <p className="text-sm font-semibold text-white">{faq.q}</p>
            <p className="mt-1.5 text-sm text-white/50">{faq.a}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-white/40">
        Still stuck? Reach out via the <a href="/contact">Contact</a> page.
      </p>
    </StaticPage>
  );
}
