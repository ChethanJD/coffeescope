import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Cookie Policy — CoffeeScope" };

export default function CookiesPage() {
  return (
    <StaticPage eyebrow="Legal" title="Cookie Policy">
      <p className="text-white/40">Last updated: July 2026</p>
      <p>
        We use essential cookies to keep you signed in and remember basic
        preferences (like notification settings). We don't use tracking
        cookies for third-party advertising.
      </p>
      <h2>Essential cookies</h2>
      <p>Required for authentication and core site functionality.</p>
      <h2>Preference cookies</h2>
      <p>
        Remember settings like your default weather location or dashboard
        tab.
      </p>
      <p className="text-white/40">
        This is placeholder legal text for demo purposes and is not a
        binding policy.
      </p>
    </StaticPage>
  );
}
