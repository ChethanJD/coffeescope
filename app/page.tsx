import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LiveGraph } from "@/components/sections/LiveGraph";
import { AIForecastGraph } from "@/components/sections/AIForecastGraph";

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <LiveGraph />
      <AIForecastGraph />
      <Footer />
    </main>
  );
}
