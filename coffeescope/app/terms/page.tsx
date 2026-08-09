import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Terms of Service — CoffeeScope" };

export default function TermsPage() {
  return (
    <StaticPage eyebrow="Legal" title="Terms of Service">
      <p className="text-white/40">Last updated: July 2026</p>
      <h2>Using CoffeeScope</h2>
      <p>
        By creating an account, you agree to use the platform for lawful
        purposes related to coffee market research, farm management, and
        trade. Market prices and AI predictions are provided for
        informational purposes and are not financial advice.
      </p>
      <h2>Marketplace listings</h2>
      <p>
        CoffeeScope facilitates introductions between buyers and sellers but
        is not a party to any transaction, contract, or delivery arranged
        through the platform.
      </p>
      <h2>Disease detection disclaimer</h2>
      <p>
        AI disease diagnoses are a screening aid, not a substitute for
        professional agronomic advice. Always confirm treatment decisions
        with a qualified expert.
      </p>
      <p className="text-white/40">
        This is placeholder legal text for demo purposes and is not a
        binding agreement.
      </p>
    </StaticPage>
  );
}
