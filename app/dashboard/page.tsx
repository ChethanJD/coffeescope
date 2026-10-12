import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireUser } from "@/lib/auth/session";
import { hasCompletedOnboarding } from "@/services/farms";

export const metadata: Metadata = {
  title: "Dashboard — CoffeeScope",
};

export default async function DashboardPage() {
  // No-ops (renders on demo data) when Supabase isn't configured yet;
  // redirects to /login once auth is wired up and the visitor isn't signed in.
  await requireUser();

  if (!(await hasCompletedOnboarding())) {
    redirect("/onboarding");
  }

  return <DashboardShell />;
}
