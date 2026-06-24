"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { HeroPortrait } from "@/components/sections/hero-portrait";
import { cn } from "@/lib/cn";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { autoAlpha: 0, y: 16, duration: 0.6 })
        .from(".hero-line", { yPercent: 115, duration: 1.05, stagger: 0.12 }, "-=0.25")
        .from(".hero-sub", { autoAlpha: 0, y: 16, duration: 0.7 }, "-=0.55")
        .from(
          ".hero-cta",
          { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .from(".hero-art", { autoAlpha: 0, scale: 0.96, duration: 1.2 }, "-=1.05");
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden pt-32 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-24 h-[36rem] w-[36rem] rounded-full bg-gold-soft/20 blur-3xl"
      />
      <Container className="relative grid items-center gap-12 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-28">
        <div>
          <Eyebrow className="hero-eyebrow">Study Abroad Consultancy Services</Eyebrow>

          <h1 className="mt-6 text-balance text-[clamp(3rem,8vw,6.5rem)] leading-[0.98]">
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">Study</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">
                without <span className="italic text-gold">borders.</span>
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-xl text-pretty text-lg text-ink-soft md:text-xl">
            We guide Ghanaian students to Master&apos;s and PhD admissions and
            scholarships across Europe — from your first shortlist to a stamped visa.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "hero-cta"
              )}
            >
              Book a consultation
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/services#scholarships"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hero-cta"
              )}
            >
              Explore scholarships
            </Link>
          </div>
        </div>

        <div className="hero-art lg:pl-6">
          <HeroPortrait />
        </div>
      </Container>
    </section>
  );
}
