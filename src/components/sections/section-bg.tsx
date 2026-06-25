import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

export type Tone = "paper" | "warm" | "cool" | "ink";

/**
 * Procedural, on-brand section background (gradient mesh). Used so no section is
 * ever flat/text-only. Swap for a real photo later by dropping an <Image> in the
 * same slot. Place as the first child of a `relative isolate` section.
 */
const toneStyle: Record<Tone, CSSProperties> = {
  paper: { background: "var(--color-paper)" },
  warm: {
    backgroundColor: "var(--color-paper)",
    backgroundImage:
      "radial-gradient(70% 90% at 12% 8%, color-mix(in oklab, var(--color-gold-soft) 38%, transparent), transparent 60%), radial-gradient(60% 70% at 92% 0%, color-mix(in oklab, var(--color-clay) 22%, transparent), transparent 60%)"
  },
  cool: {
    backgroundColor: "var(--color-surface)",
    backgroundImage:
      "radial-gradient(60% 80% at 88% 12%, color-mix(in oklab, var(--color-slate) 26%, transparent), transparent 62%), radial-gradient(50% 60% at 6% 90%, color-mix(in oklab, var(--color-gold-soft) 22%, transparent), transparent 60%)"
  },
  ink: {
    backgroundColor: "var(--color-ink)",
    backgroundImage:
      "radial-gradient(60% 80% at 18% 6%, color-mix(in oklab, var(--color-gold) 26%, transparent), transparent 60%), radial-gradient(50% 60% at 95% 95%, color-mix(in oklab, var(--color-clay) 22%, transparent), transparent 60%)"
  }
};

export function SectionBg({
  tone = "paper",
  className
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 -z-10", className)}
      style={toneStyle[tone]}
    />
  );
}
