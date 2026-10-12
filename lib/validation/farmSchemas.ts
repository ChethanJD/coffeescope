import { z } from "zod";

/**
 * owner_id is intentionally not part of this schema — always taken from
 * the authenticated session server-side, never client input (matches the
 * same pattern as marketplace listings and preferences).
 */
export const farmSchema = z.object({
  name: z.string().trim().min(2, "Farm name is required").max(200),
  country: z.string().trim().min(2, "Country is required").max(100),
  region: z.string().trim().max(200).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  areaHectares: z.number().positive("Farm size must be greater than 0").optional(),
  primaryVarietyId: z.string().uuid().optional(),
});

export type FarmInput = z.infer<typeof farmSchema>;

export const onboardingSchema = z.object({
  farm: farmSchema,
  priceAlertEnabled: z.boolean().default(false),
  weatherAlertEnabled: z.boolean().default(false),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
