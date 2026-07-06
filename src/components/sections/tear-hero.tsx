"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type TearHeroProps = {
  image: string;
  alt: string;
  title: string;
  intro?: string | undefined;
};

/* Jagged vertical tear line shared by both halves. */
const LEFT_CLIP =
  "polygon(0 0, 52% 0, 48% 12%, 53% 25%, 47% 37%, 52% 50%, 47% 63%, 53% 75%, 48% 88%, 52% 100%, 0 100%)";
const RIGHT_CLIP =
  "polygon(52% 0, 100% 0, 100% 100%, 52% 100%, 48% 88%, 53% 75%, 47% 63%, 52% 50%, 47% 37%, 53% 25%, 48% 12%)";

/**
 * Full-screen photo that tears open down a jagged seam on hover (tap on
 * touch), the two halves pulling apart like paper to reveal the headline,
 * centre-aligned on black.
 */
export function TearHero({ image, alt, title, intro }: TearHeroProps) {
  const [torn, setTorn] = useState(false);

  return (
    <header
      className="group relative isolate min-h-dvh w-full cursor-pointer overflow-hidden bg-ink text-paper"
      onMouseEnter={() => setTorn(true)}
      onMouseLeave={() => setTorn(false)}
      onClick={() => setTorn((v) => !v)}
      role="img"
      aria-label={alt}
    >
      {/* revealed layer: centre-aligned headline on black */}
      <div
        className={cn(
          "absolute inset-0 z-0 flex flex-col items-center justify-center gap-6 px-6 text-center transition-opacity delay-100 duration-700",
          torn ? "opacity-100" : "opacity-0"
        )}
      >
        <h1 className="max-w-4xl text-balance text-[clamp(2.5rem,6vw,5rem)] text-paper">
          {title}
        </h1>
        {intro ? (
          <p className="max-w-2xl text-pretty text-lg text-paper/70 md:text-xl">
            {intro}
          </p>
        ) : null}
      </div>

      {/* the two torn halves */}
      {[LEFT_CLIP, RIGHT_CLIP].map((clip, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute inset-0 z-10 transition-transform duration-1000 ease-out-expo will-change-transform"
          style={{
            clipPath: clip,
            transform: torn
              ? `translateX(${i === 0 ? "-58%" : "58%"}) rotate(${i === 0 ? "-2.5deg" : "2.5deg"})`
              : "translateX(0) rotate(0)"
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- clip-path halves need a plain element */}
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
          <div aria-hidden className="absolute inset-0 bg-ink/30" />
        </div>
      ))}

      {/* prompt before the tear */}
      <p
        className={cn(
          "absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-opacity duration-500",
          torn ? "opacity-0" : "opacity-90"
        )}
      >
        Hover to tear it open
      </p>
    </header>
  );
}
