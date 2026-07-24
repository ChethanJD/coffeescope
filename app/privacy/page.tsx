import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Privacy Policy — CoffeeScope" };

export default function PrivacyPage() {
  return (
    <StaticPage eyebrow="Legal" title="Privacy Policy">
      <p className="text-white/40">Last updated: July 2026</p>
      <h2>What we collect</h2>
      <p>
        Account information (name, email), farm details you choose to save,
        and usage data to improve the product. We do not sell personal data
        to third parties.
      </p>
      <h2>How we use it</h2>
      <p>
        To provide the platform's core features — price alerts, weather
        notifications, and personalized predictions — and to communicate
        important account or service updates.
      </p>
      <h2>Your choices</h2>
      <p>
        You can update or delete your account data at any time from your
        Dashboard, and manage notification channels under Notifications
        settings.
      </p>
      <p className="text-white/40">
        This is placeholder legal text for demo purposes and is not a
        binding policy.
      </p>
    </StaticPage>
  );
}
