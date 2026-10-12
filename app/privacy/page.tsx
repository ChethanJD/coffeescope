import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Privacy Policy — CoffeeScope" };

export default function PrivacyPage() {
  return (
    <StaticPage eyebrow="Legal" title="Privacy Policy">
      <p className="text-white/40">Last updated: [DATE]</p>
      <p>
        This Privacy Policy explains how CoffeeScope ("we", "us", "our")
        collects, uses, and protects information when you use our website
        and platform (the "Service"). This document is a general-purpose
        draft prepared for an early-stage agri-tech product and has not
        been reviewed by a lawyer — it should be reviewed by qualified legal
        counsel before being relied on as a binding policy, and the
        placeholders below (company name, registered address, grievance
        contact) should be filled in with your actual details.
      </p>

      <h2>1. Information we collect</h2>
      <p>
        <strong>Account information:</strong> name, email address, and role
        (farmer, trader, admin, etc.) you provide when creating an account.
      </p>
      <p>
        <strong>Farm and preference data:</strong> farm name, location,
        size, and primary variety you choose to add; price/weather alert
        preferences; favorited markets and varieties.
      </p>
      <p>
        <strong>Marketplace data:</strong> listings you create (product
        name, description, price, quantity), and messages you send to or
        receive from other users through the marketplace.
      </p>
      <p>
        <strong>Images you upload:</strong> photos submitted to the disease
        detection tool. These are processed to generate a result and, for
        signed-in users, a record of the result (not necessarily the image
        itself) is saved to your detection history.
      </p>
      <p>
        <strong>Contact and newsletter submissions:</strong> name, email,
        and message content if you use the contact form; email address if
        you subscribe to the newsletter.
      </p>
      <p>
        <strong>Usage and technical data:</strong> log data, device/browser
        information, and analytics collected automatically to keep the
        Service secure and to understand how it's used.
      </p>

      <h2>2. How we use your information</h2>
      <p>
        We use the information above to: provide core features (accounts,
        farms, price and weather alerts, marketplace listings and
        messaging, disease detection history); secure the Service against
        abuse (for example, basic spam and rate-limit checks on public
        forms); communicate important account or service updates; and
        improve the Service over time.
      </p>
      <p>We do not sell your personal data to third parties.</p>

      <h2>3. Third-party services</h2>
      <p>
        Certain features rely on third-party providers acting on our
        behalf, which may process limited data as a result:
      </p>
      <p>
        <strong>Supabase</strong> (database, authentication, and file
        storage) hosts substantially all application data described above.{" "}
        <strong>Weather data</strong> is retrieved from a third-party
        weather API using the coordinates of the location you search for.{" "}
        <strong>News content</strong> is retrieved from a third-party news
        API; clicking an article takes you to the original publisher's
        site, which has its own privacy practices. Where AI-based features
        (such as disease detection or price forecasting) use a third-party
        model or API, the image or data you submit is sent to that provider
        to generate a result.
      </p>

      <h2>4. Cookies</h2>
      <p>
        We use a minimal set of cookies required to keep you signed in and
        to remember basic preferences. See our{" "}
        <a href="/cookies">Cookie Policy</a> for details.
      </p>

      <h2>5. Data retention</h2>
      <p>
        We retain account and application data for as long as your account
        is active. Contact form submissions and newsletter subscriptions
        are retained until you ask us to delete them or unsubscribe,
        respectively.
      </p>

      <h2>6. Your rights and choices</h2>
      <p>
        You can view and update most of your account, farm, and preference
        data directly from your Dashboard. To request deletion or an
        export of your personal data, or to unsubscribe from the
        newsletter, contact us using the details below. Depending on your
        location, you may have additional rights under applicable data
        protection law (for example, India's Digital Personal Data
        Protection Act, 2023, or the EU/UK GDPR where applicable) — we will
        honor requests to the extent required by law.
      </p>

      <h2>7. Security</h2>
      <p>
        We use industry-standard measures — including database-level access
        controls (Row Level Security) that restrict each user to their own
        private data — to protect information you provide. No method of
        transmission or storage is 100% secure, and we cannot guarantee
        absolute security.
      </p>

      <h2>8. Children's privacy</h2>
      <p>
        The Service is not directed at children and is not knowingly used
        to collect data from children under the age required by applicable
        law to consent to data processing without parental approval.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will
        be reflected by updating the "Last updated" date above.
      </p>

      <h2>10. Contact us</h2>
      <p>
        Questions about this policy or your data can be sent via our{" "}
        <a href="/contact">Contact page</a>, or to: [COMPANY LEGAL NAME], [REGISTERED
        ADDRESS], [GRIEVANCE OFFICER CONTACT EMAIL].
      </p>

      <p className="text-white/40">
        This page is a general-purpose draft and does not constitute legal
        advice. It has not been reviewed by legal counsel.
      </p>
    </StaticPage>
  );
}
