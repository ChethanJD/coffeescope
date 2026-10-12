import { z } from "zod";

/**
 * user_id is never part of these schemas — always taken from the
 * authenticated session server-side (matches the pattern used for farms,
 * marketplace listings, and preferences).
 */
export const priceConditionSchema = z.object({
  operator: z.enum(["above", "below"]),
  value: z.number().positive(),
});

export const weatherConditionSchema = z.object({
  metric: z.enum(["rain_probability", "temperature", "humidity"]),
  operator: z.enum(["above", "below"]),
  value: z.number(),
});

export const diseaseConditionSchema = z
  .object({
    minConfidence: z.number().min(0).max(100).optional(),
  })
  .strict();

const alertRuleBaseFields = z.object({
  varietyId: z.string().uuid().optional(),
  marketLocationId: z.string().uuid().optional(),
  channel: z.enum(["email", "sms", "whatsapp", "push"]).default("email"),
});

/**
 * Discriminated on ruleType so the condition shape is tied to the rule
 * type it's actually for — a "price" rule must have a price condition,
 * etc. A plain z.union([...]) here previously let ANY ruleType pair with
 * ANY of the three condition shapes (in particular, disease's condition
 * was all-optional fields, so literally any object — including garbage —
 * satisfied it regardless of ruleType).
 */
export const createAlertRuleSchema = z.discriminatedUnion("ruleType", [
  alertRuleBaseFields.extend({ ruleType: z.literal("price"), condition: priceConditionSchema }),
  alertRuleBaseFields.extend({
    ruleType: z.literal("weather"),
    condition: weatherConditionSchema,
  }),
  alertRuleBaseFields.extend({
    ruleType: z.literal("disease"),
    condition: diseaseConditionSchema,
  }),
]);

export type CreateAlertRuleInput = z.infer<typeof createAlertRuleSchema>;

export const toggleAlertRuleSchema = z.object({
  id: z.string().uuid(),
  isActive: z.boolean(),
});

export type ToggleAlertRuleInput = z.infer<typeof toggleAlertRuleSchema>;
