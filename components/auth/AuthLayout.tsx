import Link from "next/link";
import { Coffee } from "lucide-react";

export function AuthLayout({
  children,
  eyebrow,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <main className="relative grid min-h-screen grid-cols-1 overflow-hidden bg-surface-void lg:grid-cols-2">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-coffee-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-coffee-gold/[0.06] blur-3xl" />

      <div className="relative flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <Link
          href="/"
          className="mb-10 flex w-fit items-center gap-2 font-heading text-lg font-semibold text-white transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coffee-gradient shadow-glow-gold">
            <Coffee className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          CoffeeScope
        </Link>

        <div className="glass relative mx-auto w-full max-w-sm rounded-2xl p-6 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee-gold">
            {eyebrow}
          </span>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-white/50">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden border-l border-white/[0.06] bg-surface-card lg:block">
        <div className="absolute inset-0 bg-coffee-radial opacity-80" />
        <div className="absolute right-12 top-20 h-40 w-40 rounded-full border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl" />
        <div className="absolute bottom-24 left-16 h-56 w-56 rounded-full bg-coffee-gold/[0.07] blur-3xl" />

        <div className="relative flex h-full flex-col justify-end p-14">
          <blockquote className="glass-subtle max-w-md rounded-2xl p-7">
            <p className="font-heading text-2xl font-medium leading-snug text-white">
              "CoffeeScope caught the frost risk in Minas Gerais three days before our usual sources did."
            </p>
            <footer className="mt-4 text-sm text-white/50">
              — Head of Procurement, specialty coffee importer
            </footer>
          </blockquote>
        </div>
      </div>
    </main>
  );
}
