"use server";

import { submitContactMessage } from "@/services/contact";
import type { SubmitResult } from "@/services/contact";

export async function sendContactMessage(input: {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
  turnstileToken?: string;
}): Promise<SubmitResult> {
  return submitContactMessage(input);
}
