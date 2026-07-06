"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

const defaultItems: Testimonial[] = [
  {
    quote:
      "SACS took me from a vague dream to three funded offers. My counsellor knew exactly which programmes fit my research.",
    name: "Kwame Mensah",
    role: "PhD Candidate · Technical University of Munich",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&q=80&auto=format&fit=crop"
  },
  {
    quote:
      "The SOP support alone was worth it. I stopped writing what I thought admissions wanted and started telling my real story.",
    name: "Ama Owusu",
    role: "MSc Water Management · TU Delft",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=640&q=80&auto=format&fit=crop"
  },
  {
    quote:
      "From shortlist to visa interview prep, someone was always in my corner. I landed in Dublin with housing already sorted.",
    name: "Kofi Boateng",
    role: "MSc Data Analytics · University College Dublin",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=640&q=80&auto=format&fit=crop"
  },
  {
    quote:
      "I thought scholarships were for other people. SACS found funding I qualified for and pushed me to apply. It changed everything.",
    name: "Efua Asante",
    role: "Erasmus Mundus Scholar · Sweden & France",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=640&q=80&auto=format&fit=crop"
  }
];

type TestimonialsReelProps = {
  items?: Testimonial[];
};

/** Portrait-and-quote carousel: photo card on the left, rotating words on the right. */
export function TestimonialsReel({ items = defaultItems }: TestimonialsReelProps) {
  const [index, setIndex] = useState(0);
  const active = items[index] ?? items[0];
  if (!active) return null;

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <Section className="border-t border-line">
      <Container>
        <Eyebrow>Student stories</Eyebrow>
        <Reveal className="mt-10">
          <div className="relative flex w-full flex-col items-stretch gap-2.5 overflow-hidden rounded-2xl border border-line bg-surface md:min-h-80 md:flex-row">
            {/* portrait column */}
            <div className="relative flex h-64 w-full shrink-0 items-center justify-center self-stretch overflow-hidden bg-paper md:h-auto md:w-95">
              <div
                aria-hidden
                className="absolute -left-10 top-8 h-28 w-28 rounded-xl border border-line bg-linear-to-b from-paper to-surface blur-[1px]"
              />
              <div
                aria-hidden
                className="absolute -right-8 bottom-10 h-24 w-24 rounded-xl border border-line bg-linear-to-b from-paper to-surface blur-[1px]"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                  className="relative h-44 w-44 overflow-hidden rounded-xl shadow-raise md:h-52 md:w-52"
                >
                  <Image
                    src={active.image}
                    alt={`Portrait of ${active.name}`}
                    fill
                    sizes="208px"
                    className="object-cover object-[center_30%]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* quote column */}
            <div className="flex min-w-0 flex-1 flex-col justify-between px-6 py-8 md:py-10 md:pr-10">
              <div className="flex flex-col gap-3">
                <svg
                  className="block h-11 w-11 text-gold/50"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
                </svg>
                <div className="relative min-h-35 w-full max-w-xl" aria-live="polite">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.name}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="flex flex-col gap-4"
                    >
                      <p className="text-pretty font-display text-xl leading-snug text-ink sm:text-2xl">
                        {active.quote}
                      </p>
                      <p className="text-sm text-ink-soft">
                        <span className="font-medium text-ink">{active.name}</span>
                        {" — "}
                        {active.role}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous story"
                  onClick={() => go(-1)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition-transform hover:scale-108 hover:border-ink/40 active:scale-95"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7.5 2.5 3.5 6l4 3.5" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next story"
                  onClick={() => go(1)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition-transform hover:scale-108 hover:border-ink/40 active:scale-95"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m4.5 2.5 4 3.5-4 3.5" />
                  </svg>
                </button>
                <div className="ml-3 flex items-center gap-1.5" aria-hidden>
                  {items.map((t, i) => (
                    <span
                      key={t.name}
                      className={
                        i === index
                          ? "h-2 w-2 scale-125 rounded-full bg-gold transition-all"
                          : "h-2 w-2 rounded-full bg-ink/15 transition-all"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
