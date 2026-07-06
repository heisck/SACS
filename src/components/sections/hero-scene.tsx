"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buttonVariants } from "@/components/ui/button";
import { HeroSubcopy } from "@/components/motion/hero-subcopy";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Each word bends around its own viewport corner: the letters run along one
 * edge, turn at the corner, and continue along the other edge.
 *   Study   — top-left:  "St" up the left edge, "u" on the corner, "dy" along the top
 *   without — bottom-left: down the left edge, around, along the bottom
 *   Borders — bottom-right: along the bottom, around, up the right edge
 */
type CornerWord = {
  text: string;
  corner: "tl" | "bl" | "br";
  cursive: boolean;
  /** Distance of the letter arc from its corner, in vmin. */
  radius: number;
};

const words: CornerWord[] = [
  { text: "Study", corner: "tl", cursive: false, radius: 26 },
  { text: "without", corner: "bl", cursive: true, radius: 24 },
  { text: "Borders", corner: "br", cursive: false, radius: 34 }
];

/* Letters are centred on the arc, so keep every centre at least INSET from
 * the edges — half a letter is ~5vmin at the largest size, so nothing gets
 * clipped and every word sits fully in frame. */
const INSET = 8;

/** Per-letter position + tangent rotation along a quarter-circle arc. */
function letterStyle(
  corner: CornerWord["corner"],
  radius: number,
  index: number,
  count: number
): { style: React.CSSProperties; dx: number; dy: number } {
  // 0 → first letter (on the starting edge), 1 → last letter (on the ending edge).
  const t = count > 1 ? index / (count - 1) : 0.5;
  const rad = (t * Math.PI) / 2;
  const along = INSET + radius * Math.sin(rad); // distance along the ending edge
  const out = INSET + radius * Math.cos(rad); // distance along the starting edge

  // (dx, dy) walks this letter from its resting spot INTO its corner, in vmin.
  switch (corner) {
    case "tl":
      // Start on the left edge (below the corner) reading upward, end on the top edge.
      return {
        style: {
          left: `${along.toFixed(2)}vmin`,
          top: `${out.toFixed(2)}vmin`,
          transform: `translate(-50%, -50%) rotate(${(-90 * (1 - t)).toFixed(2)}deg)`
        },
        dx: -along,
        dy: -out
      };
    case "bl":
      // Start on the left edge (above the corner) reading downward, end on the bottom edge.
      return {
        style: {
          left: `${along.toFixed(2)}vmin`,
          bottom: `${out.toFixed(2)}vmin`,
          transform: `translate(-50%, 50%) rotate(${(90 * (1 - t)).toFixed(2)}deg)`
        },
        dx: -along,
        dy: out
      };
    case "br":
      // Start on the bottom edge (left of the corner), end up the right edge reading upward.
      return {
        style: {
          right: `${out.toFixed(2)}vmin`,
          bottom: `${along.toFixed(2)}vmin`,
          transform: `translate(50%, 50%) rotate(${(-90 * t).toFixed(2)}deg)`
        },
        dx: out,
        dy: along
      };
  }
}

export function HeroScene() {
  const stage = useRef<HTMLElement>(null);
  const introRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const vmin = () => Math.min(window.innerWidth, window.innerHeight) / 100;

      // Load: each word's letters emerge FROM its own corner into place,
      // one word at a time — the same path they leave along when scrolling.
      // Paused until the IntroReveal curtain finishes (sacs:intro-done), so
      // the entrance is actually visible instead of playing behind the curtain.
      const intro = gsap.timeline({
        paused: true,
        onComplete: () => ScrollTrigger.refresh()
      });
      words.forEach((w) => {
        intro.from(
          `.hero-word-${w.corner} .hero-letter`,
          {
            x: (_, el: Element) => Number((el as HTMLElement).dataset.dx) * vmin(),
            y: (_, el: Element) => Number((el as HTMLElement).dataset.dy) * vmin(),
            autoAlpha: 0,
            scale: 0.4,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06
          },
          "<0.25"
        );
      });
      introRef.current = intro;

      // Scroll: the letters flow back INTO their corners — "Study" pours into
      // the top-left, "without" bottom-left, "Borders" bottom-right.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Subcopy + buttons clear out the moment the flow begins.
      tl.to(".hero-extra", { autoAlpha: 0, duration: 0.08 }, 0).to(
        ".hero-letter",
        {
          x: (_, el: Element) => Number((el as HTMLElement).dataset.dx) * vmin(),
          y: (_, el: Element) => Number((el as HTMLElement).dataset.dy) * vmin(),
          scale: 0.3,
          autoAlpha: 0,
          ease: "power2.in",
          stagger: { each: 0.02, from: "end" },
          duration: 0.5
        },
        0
      );
    },
    { scope: stage }
  );

  // Start the corner-word entrance once the intro curtain has retracted.
  // Falls back to a timeout in case the curtain is absent or never signals.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => introRef.current?.play();
    window.addEventListener("sacs:intro-done", start, { once: true });
    const fallback = window.setTimeout(start, 6000);
    return () => {
      window.removeEventListener("sacs:intro-done", start);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section ref={stage} className="relative h-[200vh] bg-ink">
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="An airliner crossing a dramatic sky — borders passing beneath."
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/images/planflying.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-black/40"
        />

        <h1 className="absolute inset-0 font-display text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
          <span className="sr-only">Study without Borders</span>
          {words.map((w) => (
            <span key={w.text} aria-hidden className={`hero-word-${w.corner}`}>
              {[...w.text].map((ch, i) => {
                const { style, dx, dy } = letterStyle(
                  w.corner,
                  w.radius,
                  i,
                  w.text.length
                );
                return (
                  <span
                    key={`${w.text}-${i}`}
                    className={cn(
                      "absolute block leading-none",
                      w.cursive
                        ? "text-[clamp(1.5rem,4.5vw,3.25rem)] italic"
                        : "text-[clamp(2rem,7vw,6rem)] font-bold uppercase tracking-tight"
                    )}
                    style={style}
                  >
                    <span
                      className="hero-letter block"
                      data-dx={dx.toFixed(2)}
                      data-dy={dy.toFixed(2)}
                    >
                      {ch}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Corners are owned by the words now, so the copy holds the centre. */}
        <div className="hero-extra absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 p-8 text-center">
          <HeroSubcopy
            text="We guide Ghanaian students to Master's and PhD admissions and scholarships across Europe, from your first shortlist to a stamped visa."
            delayMs={1000}
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
              <ArrowRight size={18} />
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
