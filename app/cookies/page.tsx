import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Cookie Policy — CoffeeScope" };

export default function CookiesPage() {
  return (
    <StaticPage eyebrow="Legal" title="Cookie Policy">
      <p className="text-white/40">Last updated: [DATE]</p>
      <p>
        This Cookie Policy explains how CoffeeScope uses cookies and
        similar technologies. This is a general-purpose draft and should be
        reviewed by qualified legal counsel before being relied on as a
        binding policy.
      </p>

      <h2>1. What cookies we use</h2>
      <p>
        <strong>Strictly necessary (authentication):</strong> Supabase
        issues session cookies when you sign in, which keep you logged in
        as you move between pages. These are required for the Service to
        function and cannot be disabled while remaining signed in.
      </p>
      <p>
        <strong>Preferences:</strong> minimal cookies or local storage used
        to remember basic UI preferences.
      </p>
      <p>
        We do not currently use third-party advertising or cross-site
        tracking cookies.
      </p>

      <h2>2. Analytics</h2>
      <p>
        If and when analytics are added to measure usage of the Service,
        this section will be updated to describe what's collected and any
        opt-out available. As of this writing, no third-party analytics
        cookie is documented here beyond what's described above.
      </p>

      <h2>3. Managing cookies</h2>
      <p>
        Most browsers let you block or delete cookies through their
        settings. Blocking the authentication cookie will prevent you from
        staying signed in to the Service.
      </p>

      <h2>4. Changes to this policy</h2>
      <p>
        We may update this policy as the Service changes. Material changes
        will be reflected by updating the "Last updated" date above.
      </p>

      <h2>5. Contact us</h2>
      <p>
        Questions about this policy can be sent via our{" "}
        <a href="/contact">Contact page</a>.
      </p>

      <p className="text-white/40">
        This page is a general-purpose draft and does not constitute legal
        advice. It has not been reviewed by legal counsel.
      </p>
    </StaticPage>
  );
}
