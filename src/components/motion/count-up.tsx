"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  /** Display value like "4×", "70%", "92%" — the leading number animates,
   * any suffix is kept as-is. */
  value: string;
  className?: string;
  durationMs?: number;
};

/**
 * Animates the numeric part of a stat from 0 to its final value the first
 * time it scrolls into view. Reduced motion (or a non-numeric value) renders
 * the final text immediately.
 */
export function CountUp({ value, className, durationMs = 1200 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const decimals = String(target).includes(".") ? 1 : 0;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          el.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
          if (t < 1) raf = requestAnimationFrame(tick);
          else el.textContent = value;
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, suffix, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
