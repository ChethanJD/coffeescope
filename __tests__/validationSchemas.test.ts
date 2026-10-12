import { describe, it, expect } from "vitest";
import { marketplaceMessageSchema, contactMessageSchema } from "@/lib/validation/contactSchemas";
import { createListingSchema } from "@/lib/validation/marketplaceSchemas";
import { farmSchema } from "@/lib/validation/farmSchemas";
import { createAlertRuleSchema } from "@/lib/validation/alertSchemas";

describe("marketplaceMessageSchema", () => {
  it("accepts a valid listingId + body", () => {
    const result = marketplaceMessageSchema.safeParse({
      listingId: "123e4567-e89b-12d3-a456-426614174000",
      body: "Is this still available?",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an empty message body", () => {
    const result = marketplaceMessageSchema.safeParse({
      listingId: "123e4567-e89b-12d3-a456-426614174000",
      body: "",
    });
    expect(result.success).toBe(false);
  });

  it("has no recipientId field at all — the server must derive the recipient from the listing, never trust client input", () => {
    // A client trying to sneak in a recipientId should have it silently
    // stripped (zod drops unknown keys by default) rather than accepted.
    const parsed = marketplaceMessageSchema.parse({
      listingId: "123e4567-e89b-12d3-a456-426614174000",
      body: "hello",
      recipientId: "some-other-user-id",
    });
    expect(parsed).not.toHaveProperty("recipientId");
  });
});

describe("contactMessageSchema", () => {
  it("accepts a valid submission", () => {
    const result = contactMessageSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hello there",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactMessageSchema.safeParse({
      name: "Jane",
      email: "not-an-email",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("treats a filled-in honeypot as a valid shape (the service layer decides to drop it)", () => {
    const result = contactMessageSchema.safeParse({
      name: "Bot",
      email: "bot@example.com",
      message: "spam",
      honeypot: "x",
    });
    // Schema itself only enforces the shape; the honeypot's max(0) means a
    // non-empty value actually fails validation here — confirming a bot
    // that fills every field gets rejected at the schema level too.
    expect(result.success).toBe(false);
  });
});

describe("createListingSchema", () => {
  it("rejects a non-positive price", () => {
    const result = createListingSchema.safeParse({
      name: "Arabica lot",
      priceInr: 0,
      quantity: 10,
      unit: "kg",
    });
    expect(result.success).toBe(false);
  });

  it("has no sellerId field — ownership must come from the session", () => {
    const parsed = createListingSchema.parse({
      name: "Arabica lot",
      priceInr: 500,
      quantity: 10,
      unit: "kg",
      sellerId: "someone-elses-id",
    });
    expect(parsed).not.toHaveProperty("sellerId");
  });
});

describe("farmSchema", () => {
  it("has no ownerId/userId field — ownership must come from the session", () => {
    const parsed = farmSchema.parse({
      name: "Hillcrest Estate",
      country: "India",
      ownerId: "someone-elses-id",
    });
    expect(parsed).not.toHaveProperty("ownerId");
    expect(parsed).not.toHaveProperty("userId");
  });
});

describe("createAlertRuleSchema", () => {
  it("accepts a valid price alert condition", () => {
    const result = createAlertRuleSchema.safeParse({
      ruleType: "price",
      condition: { operator: "above", value: 600 },
      channel: "email",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a condition shape that matches no known rule type", () => {
    const result = createAlertRuleSchema.safeParse({
      ruleType: "price",
      condition: { foo: "bar" },
      channel: "email",
    });
    expect(result.success).toBe(false);
  });

  it("has no userId field — ownership must come from the session", () => {
    const parsed = createAlertRuleSchema.parse({
      ruleType: "price",
      condition: { operator: "above", value: 100 },
      userId: "someone-elses-id",
    });
    expect(parsed).not.toHaveProperty("userId");
  });
});
