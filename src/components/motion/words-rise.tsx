"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type WordsRiseProps = {
  text: string;
  className?: string;
  delay?: number;
};

/**
 * Headline that rises into view word by word — each word lifts out of its own
 * overflow mask with a slight rotation settle, the same motion the staggered
 * menu items use, but per word.
 */
export function WordsRise({ text, className, delay = 0 }: WordsRiseProps) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".wr-word", {
        yPercent: 130,
        rotate: 6,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.08,
        delay,
        scrollTrigger: { trigger: root.current, start: "top 85%" }
      });
    },
    { scope: root }
  );

  return (
    <span ref={root} className={cn("inline", className)}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.28em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0"
        >
          <span className="wr-word inline-block origin-bottom-left will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
