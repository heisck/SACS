import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label that sits above headings. */
export function Eyebrow({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-muted",
        className
      )}
    >
      <span className="h-px w-6 bg-gold" aria-hidden />
      {children}
    </span>
  );
}
