"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { ScrollDownButton } from "@/components/motion/scroll-down-button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Card = { id: string; label: string; aspect: string; group: number; image: string };

const groupTitles = [
  "One team for the whole journey.",
  "Your degree, somewhere remarkable in Europe."
];

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

const cards: Card[] = [
  // Group 0 — what we do
  {
    id: "selection",
    label: "University & course selection",
    aspect: "16 / 10",
    group: 0,
    image: unsplash("photo-1541339907198-e08756dedf3f")
  },
  {
    id: "scholarships",
    label: "Scholarship & financial aid",
    aspect: "1 / 1",
    group: 0,
    image: unsplash("photo-1523580494863-6f3031224c94")
  },
  {
    id: "applications",
    label: "Application prep & submission",
    aspect: "1 / 1",
    group: 0,
    image: unsplash("photo-1454165804606-c3d57bc86b40")
  },
  {
    id: "sop",
    label: "Statement of purpose",
    aspect: "3 / 4",
    group: 0,
    image: unsplash("photo-1434030216411-0b793f4b4173")
  },
  {
    id: "visa",
    label: "Visa & interview coaching",
    aspect: "16 / 10",
    group: 0,
    image: unsplash("photo-1523240795612-9a054b0db644")
  },
  {
    id: "predeparture",
    label: "Pre-departure support",
    aspect: "1 / 1",
    group: 0,
    image: unsplash("photo-1436491865332-7a61a109cc05")
  },
  // Group 1 — destinations
  {
    id: "germany",
    label: "Germany",
    aspect: "1 / 1",
    group: 1,
    image: unsplash("photo-1560969184-10fe8719e047")
  },
  {
    id: "netherlands",
    label: "Netherlands",
    aspect: "3 / 4",
    group: 1,
    image: unsplash("photo-1534351590666-13e3e96b5017")
  },
  {
    id: "sweden",
    label: "Sweden",
    aspect: "16 / 10",
    group: 1,
    image: unsplash("photo-1467269204594-9661b134dd2b")
  },
  {
    id: "france",
    label: "France",
    aspect: "1 / 1",
    group: 1,
    image: unsplash("photo-1502602898657-3e91760cbb34")
  },
  {
    id: "ireland",
    label: "Ireland",
    aspect: "3 / 4",
    group: 1,
    image: unsplash("photo-1549918864-48ac978761a4")
  },
  {
    id: "italy",
    label: "Italy",
    aspect: "1 / 1",
    group: 1,
    image: unsplash("photo-1552832230-c0197dd311b5")
  },
  {
    id: "belgium",
    label: "Belgium",
    aspect: "16 / 10",
    group: 1,
    image: unsplash("photo-1499856871958-5b9627545d1a")
  },
  {
    id: "finland",
    label: "Finland",
    aspect: "1 / 1",
    group: 1,
    image: unsplash("photo-1519677100203-a0e668c92439")
  }
];

export function ServicesGallery() {
  const section = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const currentGroup = useRef(0);
  const [activeGroup, setActiveGroup] = useState(0);
  const [lightbox, setLightbox] = useState<Card | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = row.current;
      const sec = section.current;
      if (!el || !sec || window.innerWidth < 768) return;

      const cardEls = Array.from(el.querySelectorAll<HTMLElement>("[data-group]"));
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);
      const skewTo = gsap.quickTo(el, "skewX", { duration: 0.5, ease: "power3" });
      let resetTimer: ReturnType<typeof setTimeout>;

      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            skewTo(gsap.utils.clamp(-9, 9, self.getVelocity() / -320));
            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => skewTo(0), 120);

            // Caption follows whichever card is nearest the viewport centre.
            const centre = window.innerWidth / 2;
            let nearest = currentGroup.current;
            let best = Infinity;
            cardEls.forEach((card) => {
              const r = card.getBoundingClientRect();
              const d = Math.abs(r.left + r.width / 2 - centre);
              if (d < best) {
                best = d;
                nearest = Number(card.dataset.group ?? 0);
              }
            });
            if (nearest !== currentGroup.current) {
              currentGroup.current = nearest;
              setActiveGroup(nearest);
            }
          }
        }
      });

      return () => clearTimeout(resetTimer);
    },
    { scope: section }
  );

  return (
    <section
      ref={section}
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-paper py-16 md:h-dvh md:py-0"
      style={{ ["--bh" as string]: "62vh" }}
    >
      <div
        ref={row}
        className="flex shrink-0 flex-col divide-y divide-line px-6 will-change-transform md:h-(--bh) md:flex-row md:divide-x md:divide-y-0 md:px-0"
      >
        {cards.map((c) => (
          <article
            key={c.id}
            id={c.id}
            data-group={c.group}
            onClick={() => setLightbox(c)}
            className="relative flex w-full shrink-0 cursor-pointer items-end overflow-hidden bg-surface p-7 md:h-full md:w-auto"
            style={{ aspectRatio: c.aspect }}
          >
            <Image
              src={c.image}
              alt={c.label}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/15 to-transparent"
            />
            <h3 className="relative font-display text-2xl text-white">{c.label}</h3>
          </article>
        ))}
      </div>

      {/* Bottom-centre caption — swaps as you reach each group of cards */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={activeGroup}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="whitespace-nowrap text-[clamp(1.1rem,3.2vw,3rem)]"
          >
            {groupTitles[activeGroup]}
          </motion.h2>
        </AnimatePresence>
      </div>

      <ScrollDownButton />

      {/* Lightbox: just the image with its caption beneath — no card chrome. */}
      <AnimatePresence>
        {lightbox ? (
          <motion.div
            key="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-90 flex cursor-pointer flex-col items-center justify-center gap-5 bg-ink/95 p-6"
          >
            <motion.img
              src={lightbox.image}
              alt={lightbox.label}
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[75vh] w-auto max-w-full object-contain"
            />
            <p className="font-display text-xl text-paper md:text-2xl">
              {lightbox.label}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
