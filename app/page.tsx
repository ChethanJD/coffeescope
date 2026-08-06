import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ScrollBackgroundSequence } from "@/components/scroll/ScrollBackgroundSequence";
import { LiveGraph } from "@/components/sections/LiveGraph";
import { AIForecastGraph } from "@/components/sections/AIForecastGraph";

export default function HomePage() {
  return (
    <main className="relative">
      <ScrollBackgroundSequence frameCount={120} framePath="/frames/" />
      <Navbar />
      <Hero />
      <LiveGraph />
      <AIForecastGraph />
      <Footer />
    </main>
  );
}
