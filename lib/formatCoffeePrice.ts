/**
 * CoffeeScope price formatting
 *
 * Canonical market price unit:
 *   INR per kilogram (₹/kg)
 *
 * A metric quintal is exactly 100 kg:
 *   ₹/quintal = ₹/kg × 100
 */

const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatINRPerKg(priceInrKg: number): string {
  return `${INR_FORMATTER.format(priceInrKg)}/kg`;
}

export function formatINRPerQuintal(priceInrKg: number): string {
  return `${INR_FORMATTER.format(priceInrKg * 100)}/quintal`;
}

export function formatCoffeePrice(priceInrKg: number): {
  perKg: string;
  perQuintal: string;
} {
  return {
    perKg: formatINRPerKg(priceInrKg),
    perQuintal: formatINRPerQuintal(priceInrKg),
  };
}
