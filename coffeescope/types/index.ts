export interface NavItem {
  label: string;
  href: string;
}

export interface MarketQuote {
  variety: "Arabica" | "Robusta";
  price: number;
  changeDaily: number;
  changeWeekly: number;
  currency: string;
  sparkline: number[];
}
