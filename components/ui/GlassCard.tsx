import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  subtle = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { subtle?: boolean }) {
  return (
    <div
      className={cn(
        subtle ? "glass-subtle" : "glass",
        "relative overflow-hidden rounded-2xl",
        "transition-transform duration-300 hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {children}
    </div>
  );
}
