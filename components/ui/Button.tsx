import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-coffee-gold/30 disabled:cursor-not-allowed disabled:opacity-50",
        {
          "border-coffee-gold/20 bg-coffee-gradient text-white shadow-glow-gold hover:-translate-y-0.5 hover:brightness-110": variant === "primary",
          "border-white/10 bg-white/[0.06] text-white/80 hover:border-white/15 hover:bg-white/[0.1] hover:text-white": variant === "secondary",
          "border-transparent bg-transparent text-white/55 hover:bg-white/[0.06] hover:text-white": variant === "ghost",
          "border-red-400/20 bg-red-500/10 text-red-200 hover:bg-red-500/15": variant === "danger",
          "px-3.5 py-2 text-xs": size === "sm",
          "px-4 py-2.5 text-sm": size === "md",
          "px-5 py-3 text-sm": size === "lg",
        },
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
