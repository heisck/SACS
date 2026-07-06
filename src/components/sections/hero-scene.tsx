"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buttonVariants } from "@/components/ui/button";
import { HeroSubcopy } from "@/components/motion/hero-subcopy";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Each word is pinned to a viewport corner; "Study" bleeds out past the
// top-left corner (clipped by the stage's overflow-hidden). Sizes unchanged.
const words = [
  {
    text: "Study",
    cursive: false,
    position: "-top-[0.16em] -left-[0.06em] text-left"
  },
  { text: "without", cursive: true, position: "bottom-0 left-0" },
  { text: "Borders", cursive: false, position: "bottom-0 right-0 text-right" }
];

export function HeroScene() {
  const stage = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Pinned (sticky) stage: as you scroll, the letters fall completely —
      // mixed order, letter by letter — before the next section arrives.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Subcopy + buttons clear out the moment the fall begins.
      tl.to(".hero-extra", { autoAlpha: 0, duration: 0.08 }, 0).to(
        ".hero-letter",
        {
          y: () => window.innerHeight * 1.1,
          rotate: () => gsap.utils.random(-45, 45),
          autoAlpha: 0,
          ease: "power2.in",
          stagger: { each: 0.025, from: "random" },
          duration: 0.5
        },
        0
      );
    },
    { scope: stage }
  );

  return (
    <section ref={stage} className="relative h-[200vh] bg-ink">
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <Image
          src="/images/hero-graduate.png"
          alt="A graduate in cap and gown at a desk, between maps of Africa and Europe."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent"
        />

        <h1 className="absolute inset-0 font-display leading-[0.82] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
          <span className="sr-only">Study without Borders</span>
          {words.map((w) => (
            <span
              key={w.text}
              aria-hidden
              className={cn(
                "absolute block whitespace-nowrap text-[clamp(3rem,12vw,10rem)] font-bold uppercase tracking-tight",
                w.cursive && "text-[clamp(2rem,7vw,5rem)] italic normal-case",
                w.position
              )}
            >
              {[...w.text].map((ch, i) => (
                <span key={`${w.text}-${i}`} className="hero-letter inline-block">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Top-right so it clears "Borders", now pinned to the bottom-right. */}
        <div className="hero-extra absolute right-0 top-20 z-20 flex flex-col items-end gap-6 p-8 text-right md:top-24 md:p-12">
          <HeroSubcopy
            text="We guide Ghanaian students to Master's and PhD admissions and scholarships across Europe, from your first shortlist to a stamped visa."
            delayMs={2600}
            className="max-w-88 text-balance text-base leading-snug text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.55)]"
          />
          <div className="flex flex-col items-stretch gap-3 sm:flex-row">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "gold", size: "lg" }),
                "h-16 rounded-none px-10 font-display text-sm uppercase tracking-[0.08em] md:text-base"
              )}
            >
              Book a consultation
            </Link>
            <Link
              href="/services#scholarships"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-16 rounded-none border-white/50 px-10 font-display text-sm uppercase tracking-[0.08em] text-white hover:border-white hover:bg-white/10 md:text-base"
              )}
            >
              Explore scholarships
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
