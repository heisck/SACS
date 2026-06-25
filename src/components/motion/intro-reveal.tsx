"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef, useState } from "react";

/**
 * Page-load curtain: a brand-colored overlay split into four quadrants with the
 * SACS wordmark, then each quadrant retracts into its corner one by one with
 * increasing speed to reveal the hero. Removes itself when finished.
 */
export function IntroReveal() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDone(true);
        return;
      }

      const tl = gsap.timeline({ onComplete: () => setDone(true) });
      tl.from(".intro-word", {
        autoAlpha: 0,
        scale: 0.92,
        duration: 0.6,
        ease: "power3.out"
      })
        .to(".intro-word", { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, "+=0.55")
        .to(
          ".intro-panel-tl",
          { scale: 0, duration: 0.7, ease: "power3.inOut" },
          "<0.05"
        )
        .to(
          ".intro-panel-tr",
          { scale: 0, duration: 0.55, ease: "power3.inOut" },
          "<0.18"
        )
        .to(
          ".intro-panel-bl",
          { scale: 0, duration: 0.42, ease: "power3.inOut" },
          "<0.16"
        )
        .to(
          ".intro-panel-br",
          { scale: 0, duration: 0.32, ease: "power3.inOut" },
          "<0.14"
        );
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]" aria-hidden>
      <div className="intro-panel-tl absolute left-0 top-0 h-1/2 w-1/2 origin-top-left bg-ink" />
      <div className="intro-panel-tr absolute right-0 top-0 h-1/2 w-1/2 origin-top-right bg-ink" />
      <div className="intro-panel-bl absolute bottom-0 left-0 h-1/2 w-1/2 origin-bottom-left bg-ink" />
      <div className="intro-panel-br absolute bottom-0 right-0 h-1/2 w-1/2 origin-bottom-right bg-ink" />
      <span className="intro-word absolute inset-0 flex items-center justify-center font-display text-7xl font-bold tracking-tight text-paper md:text-9xl">
        SACS
      </span>
    </div>
  );
}
