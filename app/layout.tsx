import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollEffects } from "@/components/layout/ScrollEffects";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coffeescope.ai"),
  title: "CoffeeScope — Know the Market Before the Market Knows It",
  description:
    "AI-powered coffee market intelligence: real-time prices, weather intelligence, disease detection, and predictive analytics for farmers, exporters, traders, and buyers.",
  keywords: ["coffee prices", "coffee market", "coffee analytics", "Arabica", "Robusta", "coffee forecasting"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "CoffeeScope",
    description:
      "AI Powered Coffee Market Intelligence Platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-surface-void font-body antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-coffee-gradient focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">Skip to main content</a>
        <ThemeProvider>
          <ScrollEffects />
          {children}
        </ThemeProvider>
        <AssistantWidget />
      </body>
    </html>
  );
}
