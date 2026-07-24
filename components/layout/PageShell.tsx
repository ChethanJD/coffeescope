import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <Navbar />
      <div className="pt-24">{children}</div>
      <Footer />
    </main>
  );
}
