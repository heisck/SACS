import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Long-form text wrapper for legal/editorial content. Tailwind's typography
 * plugin isn't installed, so we style the common elements explicitly.
 */
export function Prose({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl text-ink-soft",
        "[&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink",
        "[&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-ink",
        "[&_p]:mt-4 [&_p]:leading-relaxed",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
        "[&_a]:text-gold [&_a]:underline [&_a]:underline-offset-4",
        className
      )}
    >
      {children}
    </div>
  );
}
