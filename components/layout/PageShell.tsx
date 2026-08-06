import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollBackgroundSequence } from "@/components/scroll/ScrollBackgroundSequence";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <ScrollBackgroundSequence frameCount={120} framePath="/frames/" />
      <Navbar />
      <div className="pt-24">{children}</div>
      <Footer />
    </main>
  );
}
