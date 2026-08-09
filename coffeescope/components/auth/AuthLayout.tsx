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
    <main className="grid min-h-screen grid-cols-1 bg-surface-void lg:grid-cols-2">
      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <Link href="/" className="mb-10 flex items-center gap-2 font-heading text-lg font-semibold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-coffee-gradient shadow-glow-gold">
            <Coffee className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          CoffeeScope
        </Link>

        <div className="mx-auto w-full max-w-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            {eyebrow}
          </span>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-2 text-sm text-white/50">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>
      </div>

      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-surface-card lg:block">
        <div className="absolute inset-0 bg-coffee-radial" />
        <svg
          viewBox="0 0 600 900"
          className="absolute inset-0 h-full w-full opacity-30"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="auth-pulse" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D6A55C" stopOpacity="0" />
              <stop offset="50%" stopColor="#D6A55C" />
              <stop offset="100%" stopColor="#3A7D44" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M40,700 C140,650 160,500 240,520 C300,535 280,600 340,580 C410,555 390,420 460,430 C520,438 540,600 560,620"
            stroke="url(#auth-pulse)"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>

        <div className="relative flex h-full flex-col justify-end p-14">
          <blockquote className="max-w-md">
            <p className="font-heading text-2xl font-medium leading-snug text-white">
              "CoffeeScope caught the frost risk in Minas Gerais three days
              before our usual sources did."
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
