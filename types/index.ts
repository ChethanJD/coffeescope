export interface NavItem {
  label: string;
  href: string;
}

export interface MarketQuote {
  variety: "Arabica" | "Robusta";

  /**
   * Canonical market price in Indian Rupees per kilogram.
   * Quintal price is always derived as price * 100.
   */
  price: number;

  changeDaily: number;
  changeWeekly: number;

  /**
   * Kept for compatibility with existing components.
   * Expected value: "INR".
   */
  currency: "INR" | string;

  sparkline: number[];
}
