import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  children,
  className,
}: {
  status: "positive" | "negative" | "neutral" | "live";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
        status === "positive" && "border-coffee-leaf/20 bg-coffee-leaf/10 text-coffee-leaf",
        status === "negative" && "border-red-400/20 bg-red-400/10 text-red-300",
        status === "neutral" && "border-white/10 bg-white/[0.05] text-white/55",
        status === "live" && "border-coffee-gold/20 bg-coffee-gold/10 text-coffee-gold",
        className
      )}
    >
      {status === "live" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}
