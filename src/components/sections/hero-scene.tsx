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

const words = [
  { text: "Study", cursive: false },
  { text: "without", cursive: true },
  { text: "Borders", cursive: false }
];

export function HeroScene() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // On scroll the letters fall and exit the bottom of this section (the
      // section clips them — they vanish "behind the tree").
      gsap.to(".hero-letter", {
        y: () => window.innerHeight * 1.15,
        rotate: () => gsap.utils.random(-30, 30),
        autoAlpha: 0,
        ease: "power1.in",
        stagger: { each: 0.035, from: "random" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-snap
      className="relative h-dvh w-full overflow-hidden bg-ink"
    >
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

      <h1 className="absolute inset-0 flex flex-col items-center justify-center text-center font-display leading-[0.82] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
        <span className="sr-only">Study without Borders</span>
        {words.map((w) => (
          <span key={w.text} aria-hidden className="block">
            {[...w.text].map((ch, i) => (
              <span
                key={`${w.text}-${i}`}
                className={cn(
                  "hero-letter inline-block text-[clamp(3rem,12vw,10rem)] font-bold uppercase tracking-tight",
                  w.cursive && "text-[clamp(2rem,7vw,5rem)] italic normal-case"
                )}
              >
                {ch}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <div className="absolute bottom-8 right-0 z-20 flex flex-col items-end gap-6 p-8 text-right md:bottom-12 md:p-12">
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
    </section>
  );
}
