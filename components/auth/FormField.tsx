"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const fieldId = id ?? props.name;
    const errorId = error && fieldId ? `${fieldId}-error` : undefined;

    return (
      <div className="space-y-1.5">
        <label htmlFor={fieldId} className="block text-xs font-medium tracking-wide text-white/65">
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={cn(
            "w-full rounded-xl border bg-white/[0.045] px-4 py-3 text-sm text-white shadow-inner transition-all duration-200",
            "placeholder:text-white/25 hover:border-white/15 hover:bg-white/[0.055]",
            "focus:border-coffee-gold/70 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-coffee-gold/10",
            error ? "border-red-400/60 focus:border-red-400" : "border-white/10",
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-300">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
