"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  /** Pixels to travel up into place. */
  y?: number;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
};

/** Fade-and-rise on scroll into view. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  stagger = false
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        autoAlpha: 0,
        y,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: { trigger: el, start: "top 85%" }
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
