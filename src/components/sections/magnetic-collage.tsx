"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { MaskedLines } from "@/components/motion/masked-lines";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Chip = {
  src: string;
  alt: string;
  /** width in rem */
  w: number;
  /** position within the section, in % — one of top/bottom is set */
  top?: string;
  bottom?: string;
  left: string;
  rotate: number;
};

/** Shared study-abroad photo set so pages without their own image still get a
 * full collage. The caller's `image`, when supplied, takes the first slot. */
const FALLBACK_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    alt: "Students working together around a laptop."
  },
  {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
    alt: "An airliner climbing through a dramatic sky."
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    alt: "Notes and planning spread across a desk."
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    alt: "Students working through applications together."
  },
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80",
    alt: "Graduates throwing their caps in celebration."
  },
  {
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
    alt: "A university campus walkway at dusk."
  }
];

/** Chip layouts — scattered around the margins, leaving a central corridor
 * for the headline. Positions are in % so they track viewport size. Bottom
 * chips anchor with `bottom` instead of `top` so their full 3/4-aspect height
 * always stays inside the section regardless of viewport height. */
const CHIP_LAYOUT: (Omit<Chip, "src" | "alt" | "top"> & {
  top?: string;
  bottom?: string;
})[] = [
  { w: 9, top: "9%", left: "4%", rotate: -6 },
  { w: 11, top: "15%", left: "82%", rotate: 5 },
  { w: 10, bottom: "22%", left: "5%", rotate: 4 },
  { w: 8.5, bottom: "16%", left: "81%", rotate: -5 },
  { w: 7, bottom: "5%", left: "28%", rotate: 8 },
  { w: 7.5, bottom: "7%", left: "64%", rotate: -7 }
];

const TAG_LAYOUT: {
  text: string;
  top?: string;
  bottom?: string;
  left: string;
  rotate: number;
}[] = [
  { text: "", top: "44%", left: "7%", rotate: -3 },
  { text: "", top: "38%", left: "86%", rotate: 3 },
  { text: "", bottom: "4%", left: "47%", rotate: -2 }
];

type MagneticCollageProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: { src: string; alt: string };
  tags?: string[];
  cta?: { label: string; href: string }[];
  className?: string;
};

/**
 * Editorial page header: a paper stage with photo chips and keyword tag pills
 * scattered around the margins that gently dodge the cursor and spring back,
 * with the headline woven through the central negative space. No grid, no
 * side-image, no background-image — the photos float as discrete chips.
 *
 * Physics runs only on fine pointers (desktop); on touch / reduced-motion the
 * pieces sit at rest so nothing depends on a cursor.
 */
export function MagneticCollage({
  eyebrow,
  title,
  intro,
  image,
  tags = [],
  cta = [],
  className
}: MagneticCollageProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Entrance: chips + tags pop into view with a springy scale-up stagger.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".mc-float", {
        scale: 0,
        autoAlpha: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.09,
        delay: 0.15
      });
    },
    { scope: sectionRef }
  );

  const images = image
    ? [{ src: image.src, alt: image.alt }, ...FALLBACK_IMAGES]
    : FALLBACK_IMAGES;

  const chips: Chip[] = CHIP_LAYOUT.map((c, i) => {
    const img = images[i % images.length] ?? FALLBACK_IMAGES[0]!;
    return { ...c, src: img.src, alt: img.alt };
  });

  const tagItems = TAG_LAYOUT.map((t, i) => ({
    ...t,
    text: tags[i % Math.max(1, tags.length)] ?? ""
  })).filter((t) => t.text);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return; // static on touch / reduced-motion

    const floaters = Array.from(
      section.querySelectorAll<HTMLElement>(".mc-float")
    );
    if (!floaters.length) return;

    // Per-floater live offset + velocity (transform translate, in px).
    const state = floaters.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }));
    const mouse = { x: -9999, y: -9999 };
    const RADIUS = 190; // px — cursor influence
    const PUSH = 64; // px — max displacement
    const SPRING = 0.12; // pull back toward home
    const DAMP = 0.78;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let raf = 0;
    // Let the pop-in entrance (GSAP, also writes transform) finish first so
    // the two animations don't fight over the same property.
    const startAt = performance.now() + 1600;
    const tick = () => {
      if (performance.now() < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const rect = section.getBoundingClientRect();
      for (let i = 0; i < floaters.length; i++) {
        const el = floaters[i];
        const s = state[i];
        if (!el || !s) continue;
        // Home centre in viewport coords (offsetLeft/Top ignore transforms).
        const homeX = rect.left + el.offsetLeft + el.offsetWidth / 2;
        const homeY = rect.top + el.offsetTop + el.offsetHeight / 2;
        let tx = 0;
        let ty = 0;
        const dx = homeX - mouse.x;
        const dy = homeY - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS && dist > 0.001) {
          const force = ((RADIUS - dist) / RADIUS) * PUSH;
          tx = (dx / dist) * force;
          ty = (dy / dist) * force;
        }
        // Spring toward target (home + repel), with velocity damping.
        s.vx += (tx - s.x) * SPRING;
        s.vy += (ty - s.y) * SPRING;
        s.vx *= DAMP;
        s.vy *= DAMP;
        s.x += s.vx;
        s.y += s.vy;
        const rot = el.dataset.rotate ?? "0";
        el.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px) rotate(${rot}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <header
      ref={sectionRef}
      className={cn(
        "relative isolate flex min-h-dvh w-full items-center overflow-hidden bg-paper py-24 md:py-28",
        className
      )}
    >
      {/* Photo chips scattered around the margins. */}
      {chips.map((c, i) => (
        <div
          key={`chip-${i}`}
          className="mc-float pointer-events-none absolute z-0"
          data-rotate={c.rotate}
          style={
            {
              top: c.top,
              bottom: c.bottom,
              left: c.left,
              width: `${c.w}rem`,
              transform: `rotate(${c.rotate}deg)`
            } as CSSProperties
          }
        >
          <div className="relative aspect-3/4 w-full overflow-hidden border border-line shadow-raise">
            <Image
              src={c.src}
              alt={c.alt}
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>
        </div>
      ))}

      {/* Keyword tag pills interleaved with the chips. */}
      {tagItems.map((t, i) => (
        <span
          key={`tag-${i}`}
          className="mc-float pointer-events-none absolute z-0 inline-flex items-center border border-line bg-surface px-3 py-1.5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-soft shadow-soft"
          data-rotate={t.rotate}
          style={
            {
              top: t.top,
              bottom: t.bottom,
              left: t.left,
              transform: `rotate(${t.rotate}deg)`
            } as CSSProperties
          }
        >
          {t.text}
        </span>
      ))}

      {/* Headline woven through the central corridor. */}
      <Container className="relative z-10 w-full">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <p className="mb-5 font-display text-xs font-semibold uppercase tracking-[0.22em] text-clay">
              {eyebrow}
            </p>
          ) : null}
          <MaskedLines>
            <h1
              className="text-balance font-display text-[clamp(2.25rem,6.5vw,5rem)] font-bold leading-[1.02] text-ink"
              style={{ textShadow: "0 0 22px var(--color-paper)" }}
            >
              {title}
            </h1>
          </MaskedLines>
          {intro ? (
            <MaskedLines delay={0.15}>
              {/* Paper halo keeps the microtext legible if a chip drifts
                  underneath, without changing the text colour. */}
              <p
                className="mx-auto mt-6 max-w-xl text-pretty text-lg text-ink-soft"
                style={{
                  textShadow:
                    "0 0 10px var(--color-paper), 0 0 18px var(--color-paper)"
                }}
              >
                {intro}
              </p>
            </MaskedLines>
          ) : null}
          {cta.length ? (
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              {cta.map((c, i) => (
                <Link
                  key={c.href + i}
                  href={c.href as Route}
                  className={buttonVariants({
                    variant: i === 0 ? "primary" : "outline",
                    size: "lg"
                  })}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
