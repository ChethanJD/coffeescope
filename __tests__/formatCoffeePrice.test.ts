import { describe, it, expect } from "vitest";
import { formatINRPerKg, formatINRPerQuintal, formatCoffeePrice } from "@/lib/formatCoffeePrice";

describe("formatINRPerKg", () => {
  it("formats a whole-rupee price with the /kg suffix", () => {
    expect(formatINRPerKg(580)).toBe("₹580/kg");
  });

  it("formats a decimal price without losing precision", () => {
    expect(formatINRPerKg(312.75)).toBe("₹312.75/kg");
  });

  it("formats zero correctly", () => {
    expect(formatINRPerKg(0)).toBe("₹0/kg");
  });
});

describe("formatINRPerQuintal", () => {
  it("is always exactly 100x the per-kg price — a quintal is 100kg, never a separate figure", () => {
    expect(formatINRPerQuintal(580)).toBe("₹58,000/quintal");
  });

  it("scales a decimal per-kg price correctly", () => {
    expect(formatINRPerQuintal(312.75)).toBe("₹31,275/quintal");
  });
});

describe("formatCoffeePrice", () => {
  it("returns both units derived from the same canonical per-kg value", () => {
    const result = formatCoffeePrice(500);
    expect(result.perKg).toBe("₹500/kg");
    expect(result.perQuintal).toBe("₹50,000/quintal");
  });
});
