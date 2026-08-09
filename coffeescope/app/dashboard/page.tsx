import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "Dashboard — CoffeeScope",
};

export default function DashboardPage() {
  return <DashboardShell />;
}
