"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { HeroSubcopy } from "@/components/motion/hero-subcopy";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sourceWords = [
  { text: "Study", cursive: false },
  { text: "without", cursive: true },
  { text: "Borders", cursive: false }
];

const targetLines = [
  "Talent is",
  "everywhere.",
  "Opportunity",
  "shouldn't be",
  "the barrier."
];

export function HeroMorph() {
  const stage = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".morph-src, .morph-hero, .morph-bg", { autoAlpha: 0 });
        gsap.set(".morph-line", { autoAlpha: 1, yPercent: 0, filter: "blur(0px)" });
        gsap.set(".morph-divs", { autoAlpha: 1 });
        return;
      }

      gsap.set(".morph-line", { autoAlpha: 0, yPercent: 120, filter: "blur(12px)" });
      gsap.set(".morph-divs", { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Hero falls away.
      tl.to(".morph-hero", { autoAlpha: 0, y: 40, duration: 0.3 }, 0)
        .to(
          ".morph-src",
          {
            yPercent: 650,
            autoAlpha: 0,
            rotate: () => gsap.utils.random(-25, 25),
            stagger: 0.03,
            duration: 0.6,
            ease: "power1.in"
          },
          0
        )
        .to(".morph-bg", { autoAlpha: 0, duration: 0.55 }, 0.1)
        // The statement assembles as the letters arrive.
        .to(".morph-divs", { autoAlpha: 1, duration: 0.5 }, 0.4)
        .to(
          ".morph-line",
          {
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0px)",
            stagger: 0.06,
            duration: 0.5,
            ease: "power2.out"
          },
          0.45
        );
    },
    { scope: stage }
  );

  return (
    <section ref={stage} className="relative h-[220vh] bg-paper">
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        {/* Hero photo (fades to paper, blending into the statement) */}
        <div className="morph-bg absolute inset-0">
          <Image
            src="/images/hero-graduate.png"
            alt="A graduate between maps of Africa and Europe."
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
        </div>

        {/* Rising divs behind the statement */}
        <div className="morph-divs absolute inset-0 opacity-0" aria-hidden>
          <div
            className="rising-col absolute left-[12%] flex w-36 -translate-x-1/2 flex-col gap-24"
            style={{ animationDuration: "36s" }}
          >
            <div className="h-40 w-full bg-gold" />
            <div className="h-28 w-full bg-ink" />
            <div className="h-40 w-full bg-gold" />
            <div className="h-28 w-full bg-ink" />
          </div>
          <div
            className="rising-col absolute left-1/2 flex w-32 -translate-x-1/2 flex-col gap-24"
            style={{ animationDuration: "46s", animationDelay: "-12s" }}
          >
            <div className="h-32 w-full bg-slate" />
            <div className="h-40 w-full bg-clay" />
            <div className="h-32 w-full bg-slate" />
            <div className="h-40 w-full bg-clay" />
          </div>
          <div
            className="rising-col absolute left-[85%] flex w-32 -translate-x-1/2 flex-col gap-24"
            style={{ animationDuration: "40s", animationDelay: "-6s" }}
          >
            <div className="h-36 w-full bg-clay" />
            <div className="h-28 w-full bg-gold-soft" />
            <div className="h-36 w-full bg-clay" />
            <div className="h-28 w-full bg-gold-soft" />
          </div>
        </div>

        {/* Source headline — falls on scroll */}
        <h1 className="absolute inset-0 flex flex-col items-center justify-center text-center font-display leading-[0.82] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
          <span className="sr-only">Study without Borders</span>
          {sourceWords.map((w) => (
            <span key={w.text} aria-hidden className="block">
              {[...w.text].map((ch, i) => (
                <span
                  key={`${w.text}-${i}`}
                  className={cn(
                    "morph-src inline-block text-[clamp(3rem,12vw,10rem)] font-bold uppercase tracking-tight",
                    w.cursive &&
                      "font-display text-[clamp(2rem,7vw,5rem)] italic normal-case"
                  )}
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Target statement — assembles on scroll */}
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <Container>
            <h2 className="flex flex-col-reverse items-start font-sans text-[clamp(2rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-tighter text-ink">
              {targetLines.map((line, i) => (
                <span
                  key={line}
                  className="morph-line block"
                  style={{ marginLeft: `${i * 7}vw` }}
                >
                  {line}
                </span>
              ))}
            </h2>
          </Container>
        </div>

        {/* Subcopy + CTAs */}
        <div className="morph-hero absolute bottom-8 right-0 z-20 flex flex-col items-end gap-6 p-8 text-right md:bottom-12 md:p-12">
          <HeroSubcopy
            text="We guide Ghanaian students to Master's and PhD admissions and scholarships across Europe, from your first shortlist to a stamped visa."
            delayMs={2600}
            className="max-w-88 text-balance text-base leading-snug text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.55)]"
          />
          <div className="flex flex-col items-stretch gap-3 sm:flex-row">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "gold", size: "lg" }),
                "h-16 rounded-none px-10 font-display text-sm uppercase tracking-[0.08em] md:text-base"
              )}
            >
              Book a consultation
            </Link>
            <Link
              href="/services#scholarships"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-16 rounded-none border-white/50 px-10 font-display text-sm uppercase tracking-[0.08em] text-white hover:border-white hover:bg-white/10 md:text-base"
              )}
            >
              Explore scholarships
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
