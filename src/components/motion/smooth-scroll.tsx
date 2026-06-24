"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * App-wide inertia scrolling. Disabled automatically for users who prefer
 * reduced motion so accessibility is never traded for polish.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}
