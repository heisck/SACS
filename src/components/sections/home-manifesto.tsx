"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const lines = [
  "Talent is",
  "everywhere.",
  "Opportunity",
  "shouldn't be",
  "the barrier."
];

const columns = [
  {
    left: "12%",
    width: "9rem",
    duration: "36s",
    delay: "0s",
    kinds: ["bg-gold", "bg-ink", "bg-gold", "bg-ink"]
  },
  {
    left: "50%",
    width: "8rem",
    duration: "46s",
    delay: "-12s",
    kinds: ["bg-slate", "bg-clay", "bg-slate", "bg-clay"]
  },
  {
    left: "85%",
    width: "8rem",
    duration: "40s",
    delay: "-6s",
    kinds: ["bg-clay", "bg-gold-soft", "bg-clay", "bg-gold-soft"]
  }
];

const heights = ["h-40", "h-28", "h-36", "h-32"];

export function HomeManifesto() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry?.isIntersecting ?? false),
      {
        threshold: 0.05
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Letters pour in from above the top edge at their own gravity pace (not
      // tied to scroll speed). Reverses on scroll up via onLeaveBack.
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        ".manifesto-letter",
        {
          y: () => -window.innerHeight * 0.6,
          autoAlpha: 0,
          rotate: () => gsap.utils.random(-25, 25)
        },
        {
          y: 0,
          autoAlpha: 1,
          rotate: 0,
          ease: "power2.out",
          duration: 0.9,
          stagger: { each: 0.045, from: "random" }
        }
      );

      ScrollTrigger.create({
        trigger: root.current,
        start: "top 85%",
        end: "bottom top",
        onUpdate: (self) => {
          // Direction-driven: pour in on the way down, pour out the moment you
          // start scrolling up — each at its own pace.
          if (self.direction === 1) tl.play();
          else tl.reverse();
        }
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-snap
      className="relative isolate flex h-dvh items-center overflow-hidden bg-paper"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        {columns.map((c) => (
          <div
            key={c.left}
            className="rising-col absolute top-0 flex -translate-x-1/2 flex-col gap-24"
            style={{
              left: c.left,
              width: c.width,
              animationDuration: c.duration,
              animationDelay: c.delay,
              animationPlayState: active ? "running" : "paused"
            }}
          >
            {[...c.kinds, ...c.kinds].map((bg, i) => (
              <div key={i} className={`${heights[i % heights.length]} w-full ${bg}`} />
            ))}
          </div>
        ))}
        <div className="absolute inset-0 bg-paper/40" />
      </div>

      <Container className="relative z-10">
        <h2 className="flex flex-col-reverse items-start font-sans text-[clamp(2rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-tighter text-ink">
          <span className="sr-only">
            Talent is everywhere. Opportunity shouldn&apos;t be the barrier.
          </span>
          {lines.map((line, i) => (
            <span
              key={line}
              aria-hidden
              className="block"
              style={{ marginLeft: `${i * 7}vw` }}
            >
              {[...line].map((ch, j) =>
                ch === " " ? (
                  <span key={j} className="inline-block w-[0.28em]" />
                ) : (
                  <span key={j} className="manifesto-letter inline-block">
                    {ch}
                  </span>
                )
              )}
            </span>
          ))}
        </h2>
      </Container>
    </section>
  );
}
