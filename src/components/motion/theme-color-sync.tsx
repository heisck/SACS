"use client";

import { useEffect } from "react";

/**
 * Keeps <meta name="theme-color"> in sync with the section currently at the
 * top of the viewport, so the phone status bar / browser chrome matches the
 * page — ink over the dark hero, paper over light sections. Samples the
 * topmost opaque background the same way the adaptive menu does.
 */
export function ThemeColorSync() {
  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }

    const pick = () => {
      const els = document.elementsFromPoint(window.innerWidth / 2, 1);
      for (const el of els) {
        const e = el as HTMLElement;
        if (e === document.body || e === document.documentElement) continue;
        const bg = getComputedStyle(e).backgroundColor;
        const m = bg.match(
          /rgba?\(\s*([\d.]+)\s*[ ,]\s*([\d.]+)\s*[ ,]\s*([\d.]+)\s*(?:,[\s]*([\d.]+)\s*)?\)/i
        );
        if (!m) continue;
        const a = m[4] === undefined ? 1 : Number(m[4]);
        if (a < 0.5) continue;
        meta!.content = `rgb(${m[1]}, ${m[2]}, ${m[3]})`;
        return;
      }
      meta!.content = "#0a0a0a"; // photo/video with no solid bg — assume dark
    };

    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        pick();
      });
    };

    pick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
