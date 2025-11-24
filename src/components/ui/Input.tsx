import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

function getInputId(id: string | undefined, label: string | undefined): string | undefined {
  return id ?? label?.toLowerCase().replace(/\s+/g, "-");
}

function getAriaDescribedBy(
  inputId: string | undefined,
  hasError: boolean,
  hint: string | undefined
): string | undefined {
  if (hasError) {
    return `${inputId ?? ""}-error`;
  }
  if (hint !== undefined) {
    return `${inputId ?? ""}-hint`;
  }
  return undefined;
}

function getInputClassName(hasError: boolean, className: string | undefined): string {
  return twMerge(
    clsx(
      "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      hasError ? "border-destructive focus-visible:ring-destructive" : "border-input",
      className
    )
  );
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, hint, className, id, ...props }, ref): ReactNode => {
    const inputId = getInputId(id, label);
    const hasError = error !== undefined && error.length > 0;

    return (
      <div className="space-y-2">
        {label !== undefined && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={getInputClassName(hasError, className)}
          aria-invalid={hasError}
          aria-describedby={getAriaDescribedBy(inputId, hasError, hint)}
          {...props}
        />
        {hasError && (
          <p id={`${inputId ?? ""}-error`} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        {!hasError && hint !== undefined && (
          <p id={`${inputId ?? ""}-hint`} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export type { IInputProps };
