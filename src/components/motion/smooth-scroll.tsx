"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

// The collapsing mobile URL bar fires resize events on scroll; without this,
// ScrollTrigger refreshes mid-gesture and animations visibly jump.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * App-wide inertia scrolling, integrated the documented way: GSAP's ticker
 * drives Lenis (single rAF for the whole page) with lag smoothing off, and
 * Lenis feeds every scroll to ScrollTrigger. Touch input stays native —
 * Lenis only smooths wheel — so phones keep OS-driven scrolling.
 * Disabled entirely for users who prefer reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, []);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return <>{children}</>;

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{ lerp: 0.1, smoothWheel: true, autoRaf: false }}
    >
      {children}
    </ReactLenis>
  );
}
