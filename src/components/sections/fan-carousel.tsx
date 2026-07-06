"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export type FanCard = {
  label: string;
  sub?: string | undefined;
  image: string;
};

type FanCarouselProps = {
  items: FanCard[];
};

/** Signed shortest wrap-around distance from the active card. */
function offsetFrom(active: number, index: number, length: number): number {
  let d = index - active;
  if (d > length / 2) d -= length;
  if (d < -length / 2) d += length;
  return d;
}

/**
 * Fan of tall photo cards: the active card sits upright in the centre while
 * neighbours splay outward with rotation, drop and scale, like a hand of
 * held playing cards.
 */
export function FanCarousel({ items }: FanCarouselProps) {
  const [active, setActive] = useState(0);
  const activeItem = items[active];

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + items.length) % items.length);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative flex h-105 w-full items-center justify-center overflow-hidden md:h-125">
        {items.map((item, i) => {
          const d = offsetFrom(active, i, items.length);
          const abs = Math.abs(d);
          const visible = abs <= 3;
          return (
            <motion.button
              key={item.label}
              type="button"
              aria-label={`Show ${item.label}`}
              onClick={() => setActive(i)}
              className="absolute h-88 w-50 cursor-pointer overflow-hidden rounded-xl border border-ink/10 shadow-raise will-change-transform md:h-105 md:w-60"
              initial={false}
              animate={{
                x: `${d * 8.4}rem`,
                y: `${abs * abs * 1.7}rem`,
                rotate: d * 7,
                scale: visible ? 1 - abs * 0.075 : 0.3,
                opacity: visible ? 1 : 0,
                zIndex: 10 - abs
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes="240px"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-ink/50 via-transparent to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 p-4 text-left font-display text-lg text-white">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="z-10 mt-6 flex items-center gap-4">
        <button
          type="button"
          aria-label="Previous destination"
          onClick={() => go(-1)}
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-surface/70 text-ink/60 shadow-soft backdrop-blur transition-colors hover:border-ink/35 hover:text-ink"
        >
          <svg
            className="h-4.5 w-4.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="flex items-center gap-2" aria-hidden>
          {items.map((item, i) => (
            <span
              key={item.label}
              className={
                i === active
                  ? "h-2 w-2 scale-130 rounded-full bg-ink/70 transition-all duration-300"
                  : "h-2 w-2 rounded-full bg-ink/15 transition-all duration-300"
              }
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next destination"
          onClick={() => go(1)}
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-surface/70 text-ink/60 shadow-soft backdrop-blur transition-colors hover:border-ink/35 hover:text-ink"
        >
          <svg
            className="h-4.5 w-4.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {activeItem?.sub ? (
        <AnimatePresence mode="wait">
          <motion.p
            key={activeItem.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-5 max-w-md text-center text-sm text-ink-soft"
          >
            {activeItem.sub}
          </motion.p>
        </AnimatePresence>
      ) : null}
    </div>
  );
}
