import { PageShell } from "@/components/layout/PageShell";

export function StaticPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 pb-24">
        <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
          {eyebrow}
        </span>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        <div className="prose prose-invert mt-8 flex flex-col gap-5 text-sm leading-relaxed text-white/60 sm:text-base [&_h2]:mt-6 [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_a]:text-coffee-gold [&_a]:no-underline hover:[&_a]:underline">
          {children}
        </div>
      </div>
    </PageShell>
  );
}
