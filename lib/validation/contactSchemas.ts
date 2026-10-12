import { z } from "zod";

/**
 * `honeypot` is a hidden field real users never fill in (hidden via CSS,
 * never shown, never required). Bots that blindly fill every field in a
 * form trip it. A non-empty value here means silently drop the submission
 * without telling the bot it failed — see services/contact's use of this.
 */
export const contactMessageSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  message: z.string().trim().min(1, "Message is required").max(5000),
  honeypot: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const marketplaceMessageSchema = z.object({
  listingId: z.string().uuid(),
  body: z.string().trim().min(1, "Message is required").max(2000),
});

export type MarketplaceMessageInput = z.infer<typeof marketplaceMessageSchema>;
