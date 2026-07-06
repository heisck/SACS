"use client";

import Image from "next/image";
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

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

// Endlessly rising photo columns behind the manifesto.
const columns = [
  {
    left: "12%",
    width: "9rem",
    duration: "36s",
    delay: "0s",
    images: [
      unsplash("photo-1523580494863-6f3031224c94"),
      unsplash("photo-1541339907198-e08756dedf3f"),
      unsplash("photo-1522202176988-66273c2fd55f"),
      unsplash("photo-1502602898657-3e91760cbb34")
    ]
  },
  {
    left: "50%",
    width: "8rem",
    duration: "46s",
    delay: "-12s",
    images: [
      unsplash("photo-1534351590666-13e3e96b5017"),
      unsplash("photo-1523240795612-9a054b0db644"),
      unsplash("photo-1560969184-10fe8719e047"),
      unsplash("photo-1434030216411-0b793f4b4173")
    ]
  },
  {
    left: "85%",
    width: "8rem",
    duration: "40s",
    delay: "-6s",
    images: [
      unsplash("photo-1467269204594-9661b134dd2b"),
      unsplash("photo-1436491865332-7a61a109cc05"),
      unsplash("photo-1552832230-c0197dd311b5"),
      unsplash("photo-1549918864-48ac978761a4")
    ]
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
      // Calm line-by-line reveal: each line slides up out of its own mask.
      gsap.from(".manifesto-line", {
        yPercent: 110,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
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
            {[...c.images, ...c.images].map((src, i) => (
              <div
                key={i}
                className={`relative ${heights[i % heights.length]} w-full overflow-hidden`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
        <div className="absolute inset-0 bg-paper/55" />
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
              className="block overflow-hidden py-[0.06em]"
              style={{ marginLeft: `${i * 7}vw` }}
            >
              <span className="manifesto-line block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h2>
      </Container>
    </section>
  );
}
