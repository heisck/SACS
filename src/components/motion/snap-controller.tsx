"use client";

import { useLenis } from "lenis/react";
import Snap from "lenis/snap";
import { useEffect } from "react";

/**
 * Section-by-section snapping for the page it's rendered on. Reads the live
 * Lenis instance from context and snaps to every `[data-snap]` block.
 * Uses "proximity" so tall content sections aren't trapped.
 */
export function SnapController() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const snap = new Snap(lenis, { type: "proximity", duration: 1 });
    const removers = Array.from(
      document.querySelectorAll<HTMLElement>("[data-snap]")
    ).map((el) => snap.addElement(el, { align: "start" }));
    return () => {
      removers.forEach((remove) => remove());
      snap.destroy();
    };
  }, [lenis]);

  return null;
}
