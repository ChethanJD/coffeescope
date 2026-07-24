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
    return (
      <div>
        <label htmlFor={fieldId} className="mb-1.5 block text-xs font-medium text-white/60">
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          className={cn(
            "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 transition-colors focus:outline-none",
            error
              ? "border-red-500/50 focus:border-red-500"
              : "border-white/10 focus:border-coffee-gold",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
