"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type MaskedLinesProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before the rise begins. */
  delay?: number;
};

/**
 * Menu-style entrance: the content rises out of an overflow mask with a
 * slight settle, the same move the staggered menu items make when the panel
 * opens. Fires when scrolled into view.
 */
export function MaskedLines({ children, className, delay = 0 }: MaskedLinesProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current?.firstElementChild;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(el, {
        yPercent: 120,
        rotate: 4,
        duration: 1,
        delay,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%" }
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div className="origin-bottom-left will-change-transform">{children}</div>
    </div>
  );
}
