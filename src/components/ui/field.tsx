import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  id: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
  className?: string;
  optional?: boolean;
};

/** Label + control + error wrapper for react-hook-form fields. */
export function Field({ id, label, error, children, className, optional }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optional ? (
          <span className="ml-1 font-normal text-muted-foreground">(optional)</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
