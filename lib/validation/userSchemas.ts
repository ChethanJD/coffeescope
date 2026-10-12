import { z } from "zod";

export const updatePreferencesSchema = z.object({
  preferredMarket: z.string().uuid().nullable().optional(),
  preferredVariety: z.string().uuid().nullable().optional(),
  priceAlertEnabled: z.boolean().optional(),
  weatherAlertEnabled: z.boolean().optional(),
});

export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
