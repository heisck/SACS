"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Neutral, labelled image slots — drop an <Image fill className="object-cover" />
// into each `[data-asset-slot]` card later; object-cover keeps it undistorted.
type Card = { id: string; label: string; aspect: string; group: number };

const groupTitles = [
  "One team for the whole journey.",
  "Your degree, somewhere remarkable in Europe."
];

const cards: Card[] = [
  // Group 0 — what we do
  {
    id: "selection",
    label: "University & course selection",
    aspect: "16 / 10",
    group: 0
  },
  {
    id: "scholarships",
    label: "Scholarship & financial aid",
    aspect: "1 / 1",
    group: 0
  },
  {
    id: "applications",
    label: "Application prep & submission",
    aspect: "1 / 1",
    group: 0
  },
  { id: "sop", label: "Statement of purpose", aspect: "3 / 4", group: 0 },
  { id: "visa", label: "Visa & interview coaching", aspect: "16 / 10", group: 0 },
  { id: "predeparture", label: "Pre-departure support", aspect: "1 / 1", group: 0 },
  // Group 1 — destinations
  { id: "germany", label: "Germany", aspect: "1 / 1", group: 1 },
  { id: "netherlands", label: "Netherlands", aspect: "3 / 4", group: 1 },
  { id: "sweden", label: "Sweden", aspect: "16 / 10", group: 1 },
  { id: "france", label: "France", aspect: "1 / 1", group: 1 },
  { id: "ireland", label: "Ireland", aspect: "3 / 4", group: 1 },
  { id: "italy", label: "Italy", aspect: "1 / 1", group: 1 },
  { id: "belgium", label: "Belgium", aspect: "16 / 10", group: 1 },
  { id: "finland", label: "Finland", aspect: "1 / 1", group: 1 }
];

export function ServicesGallery() {
  const section = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const currentGroup = useRef(0);
  const [activeGroup, setActiveGroup] = useState(0);

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
            data-asset-slot="card-image"
            className="relative flex w-full shrink-0 items-end overflow-hidden bg-surface p-7 md:h-full md:w-auto"
            style={{ aspectRatio: c.aspect }}
          >
            <h3 className="font-display text-2xl text-ink">{c.label}</h3>
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
    </section>
  );
}
