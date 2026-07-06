"use client";

import { useEffect, useState } from "react";
import DecryptedText from "@/registry/reactbits/decrypted-text";
import { cn } from "@/lib/cn";

type HeroSubcopyProps = {
  text: string;
  className?: string;
  /** Wait this long before the decrypt starts (e.g. for the intro curtain). */
  delayMs?: number;
};

export function HeroSubcopy({ text, className, delayMs = 0 }: HeroSubcopyProps) {
  const [show, setShow] = useState(delayMs === 0);

  useEffect(() => {
    if (delayMs === 0) return;
    const t = setTimeout(() => setShow(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  return (
    <div className={cn("relative", className)}>
      {/* The real text always reserves the final box, so the scramble can
          never push the buttons below around while glyph widths jitter. */}
      <span aria-hidden className="invisible block">
        {text}
      </span>
      {show ? (
        <span className="absolute inset-0 block">
          <DecryptedText
            text={text}
            animateOn="view"
            sequential
            speed={22}
            revealDirection="start"
            encryptedClassName="text-white/40"
          />
        </span>
      ) : null}
    </div>
  );
}
