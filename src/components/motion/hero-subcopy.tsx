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
    <div className={className}>
      {show ? (
        <DecryptedText
          text={text}
          animateOn="view"
          sequential
          speed={22}
          revealDirection="start"
          encryptedClassName="text-white/40"
        />
      ) : (
        // Reserve space (hidden behind the intro) so there's no layout shift.
        <span className={cn("opacity-0")}>{text}</span>
      )}
    </div>
  );
}
