"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef, useState } from "react";

const words = ["Study", "Abroad", "Consultancy", "Services"];

/**
 * Page-load curtain: the four SACS initials land first, then each initial
 * spells out its full word letter by letter in succession — Study, Abroad,
 * Consultancy, Services — before the quadrants retract to reveal the hero.
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

      // 1 — the acronym: initials pop in one after another.
      tl.from(".intro-initial", {
        autoAlpha: 0,
        y: 24,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.14
      });

      // 2 — each word spells itself out, one word at a time.
      words.forEach((_, w) => {
        tl.to(
          `.intro-rest-${w}`,
          {
            autoAlpha: 1,
            duration: 0.04,
            ease: "none",
            stagger: 0.055
          },
          w === 0 ? "+=0.25" : "+=0.12"
        );
      });

      // 3 — hold, fade the wordmark, retract the quadrants corner by corner.
      tl.to(".intro-word", { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, "+=0.6")
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

      <div className="intro-word absolute inset-0 flex items-center justify-center px-6">
        <div className="flex flex-col items-start font-display text-4xl font-bold leading-[1.12] tracking-tight text-paper sm:text-6xl md:text-7xl">
          {words.map((word, w) => (
            <span key={word} className="block whitespace-nowrap">
              <span className="intro-initial inline-block">{word[0]}</span>
              {[...word.slice(1)].map((ch, i) => (
                <span
                  key={`${word}-${i}`}
                  className={`intro-rest-${w} inline-block opacity-0 [visibility:hidden]`}
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
