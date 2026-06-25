import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionBg, type Tone } from "@/components/sections/section-bg";

type PanelProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

/**
 * Full-screen homepage panel: exactly one viewport tall on md+ (so it snaps
 * section-by-section), at-least-full-height and scrollable on small screens.
 * Zeros the vertical padding of any nested `Section` so content centers.
 */
export function Panel({ children, tone, className }: PanelProps) {
  return (
    <section
      data-snap
      className={cn(
        "relative isolate flex min-h-dvh w-full items-center overflow-hidden py-20 md:h-dvh md:py-0",
        className
      )}
    >
      {tone ? <SectionBg tone={tone} /> : null}
      <div className="relative z-10 w-full [&_section]:py-0!">{children}</div>
    </section>
  );
}
