import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { hasCompletedOnboarding } from "@/services/farms";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";

export const metadata: Metadata = {
  title: "Set Up Your Farm — CoffeeScope",
};

export default async function OnboardingPage() {
  await requireUser();

  // Already onboarded — no need to see this again.
  if (await hasCompletedOnboarding()) {
    redirect("/dashboard");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-void px-6 py-16 sm:py-20">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-coffee-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-coffee-gold/[0.06] blur-3xl" />

      <div className="relative mx-auto w-full max-w-xl">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee-gold">
          One last step
        </span>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Tell us about your farm
        </h1>
        <p className="mt-2 text-sm leading-6 text-white/50">
          This helps CoffeeScope show you the right prices, weather, and alerts. You can
          add more farms and edit this later from your dashboard.
        </p>

        <div className="glass mt-8 rounded-2xl p-6 sm:p-8">
          <OnboardingForm />
        </div>
      </div>
    </main>
  );
}
