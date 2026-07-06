"use client";

import { useRef } from "react";

/**
 * Mobile escape hatch for full-screen interactive sections (globe, pinned
 * galleries): a small arrow that jumps to the next section so touch-drag
 * canvases never trap the scroll.
 */
export function ScrollDownButton({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);

  const goNext = () => {
    const section = ref.current?.closest("section");
    const next = section?.nextElementSibling;
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Go to next section"
      onClick={goNext}
      className={`absolute bottom-5 left-1/2 z-20 grid h-12 w-12 -translate-x-1/2 place-items-center border border-paper/40 bg-ink/60 text-paper backdrop-blur-sm md:hidden ${className}`}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </svg>
    </button>
  );
}
