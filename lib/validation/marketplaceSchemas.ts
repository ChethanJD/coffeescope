import { z } from "zod";

/**
 * Validates client-supplied marketplace listing input.
 *
 * seller_id is intentionally NOT part of this schema — it must always
 * come from the authenticated session (auth.uid()) server-side, never
 * from client input, so a user can never create a listing on another
 * seller's behalf. RLS enforces this too (see supabase/migrations/
 * 0003_row_level_security.sql), this is defense-in-depth at the API layer.
 */
export const createListingSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(200),
  description: z.string().trim().max(2000).optional(),
  priceInr: z.number().positive("Price must be greater than 0"),
  quantity: z.number().positive("Quantity must be greater than 0"),
  unit: z.string().trim().min(1).max(20).default("kg"),
  imageUrl: z.string().url().optional(),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;

export const updateListingStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["active", "inactive", "sold_out"]),
});

export type UpdateListingStatusInput = z.infer<typeof updateListingStatusSchema>;
