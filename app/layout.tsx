import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";

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
  title: "CoffeeScope — Know the Market Before the Market Knows It",
  description:
    "AI-powered coffee market intelligence: real-time prices, weather intelligence, disease detection, and predictive analytics for farmers, exporters, traders, and buyers.",
  metadataBase: new URL("https://coffeescope.ai"),
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
        {children}
        <AssistantWidget />
      </body>
    </html>
  );
}
