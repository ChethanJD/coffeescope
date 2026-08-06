import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollBackgroundSequence } from "@/components/scroll/ScrollBackgroundSequence";

export const metadata: Metadata = { title: "Scroll Background Demo — CoffeeScope" };

export default function ScrollDemoPage() {
  return (
    <main className="relative">
      <ScrollBackgroundSequence frameCount={120} framePath="/frames/" />
      <Navbar />

      <div className="flex min-h-screen items-center justify-center bg-surface-void px-6 text-center">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            Scroll Background Demo
          </span>
          <h1 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Scroll down — the background reacts, content doesn't pin
          </h1>
          <p className="mt-4 text-white/50">
            The coffee cherry-to-powder sequence is fixed behind this whole
            page and advances a frame at a time as you scroll from top to
            bottom of the entire document — nothing pins or hijacks scroll.
          </p>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center bg-surface-void px-6 text-center text-white/40">
        Keep scrolling — this is just normal page content.
      </div>

      <div className="flex min-h-screen items-center justify-center bg-surface-void px-6 text-center text-white/40">
        The background should be near the end of the sequence by now.
      </div>

      <Footer />
    </main>
  );
}
