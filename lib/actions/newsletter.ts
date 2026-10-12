"use server";

import { subscribeToNewsletter } from "@/services/contact";
import type { SubmitResult } from "@/services/contact";

export async function subscribeNewsletter(email: string, honeypot?: string): Promise<SubmitResult> {
  return subscribeToNewsletter({ email, honeypot });
}
