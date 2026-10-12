import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LiveGraph } from "@/components/sections/LiveGraph";
import { AIForecastGraph } from "@/components/sections/AIForecastGraph";
import { MarketStatusBar } from "@/components/sections/MarketStatusBar";

export default function HomePage() {
  return (
    <main id="main-content" className="relative">
      <Navbar />
      <Hero />
      <MarketStatusBar />
      <LiveGraph />
      <AIForecastGraph />
      <Footer />
    </main>
  );
}
