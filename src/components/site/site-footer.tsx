"use client";

import { RippleButton, RippleLink } from "@/components/ui/ripple-button";
import { siteConfig } from "@/config/site";

const tickerItems = [
  "University selection",
  "Scholarships",
  "Applications",
  "SOP coaching",
  "Visa & interviews",
  "Pre-departure"
];

/**
 * Cinematic reveal footer: the page lifts away to expose a fixed, screen-tall
 * dark stage beneath it. Ticker is static (no marquee), controls have no
 * hover states — every button answers with a click ripple instead.
 */
export function SiteFooter() {
  return (
    <div
      className="relative h-screen w-full"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <footer className="cinematic-footer fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-ink text-paper">
        {/* atmosphere */}
        <div
          aria-hidden
          className="cf-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] rounded-[50%] blur-[80px]"
        />
        <div aria-hidden className="cf-grid pointer-events-none absolute inset-0 z-0" />
        <div
          aria-hidden
          className="cf-giant-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
        >
          SACS
        </div>

        {/* static ticker band — deliberately not scrolling */}
        <div className="absolute left-0 top-12 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-paper/10 bg-ink/60 py-4 shadow-2xl backdrop-blur-md">
          <div className="flex w-full items-center justify-center gap-6 whitespace-nowrap text-xs font-bold uppercase tracking-[0.3em] text-paper/60 md:gap-12 md:text-sm">
            {tickerItems.map((item, i) => (
              <span key={item} className="flex items-center gap-6 md:gap-12">
                {item}
                {i < tickerItems.length - 1 ? (
                  <span aria-hidden className="text-paper/30">
                    ✦
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>

        {/* centre stage */}
        <div className="relative z-10 mx-auto mt-20 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
          <h2 className="cf-text-glow mb-12 text-center text-5xl font-black tracking-tighter md:text-8xl">
            Ready to begin?
          </h2>
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-wrap justify-center gap-4">
              <RippleLink
                href="/contact"
                className="cf-glass-pill flex items-center gap-3 rounded-full px-10 py-5 text-sm font-bold text-paper md:text-base"
              >
                Book a consultation
              </RippleLink>
              <RippleLink
                href="/services"
                className="cf-glass-pill flex items-center gap-3 rounded-full px-10 py-5 text-sm font-bold text-paper md:text-base"
              >
                Explore services
              </RippleLink>
            </div>
            <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
              <RippleLink
                href="/privacy"
                className="cf-glass-pill rounded-full px-6 py-3 text-xs font-medium text-paper/70 md:text-sm"
              >
                Privacy Policy
              </RippleLink>
              <RippleLink
                href="/terms"
                className="cf-glass-pill rounded-full px-6 py-3 text-xs font-medium text-paper/70 md:text-sm"
              >
                Terms of Service
              </RippleLink>
              <RippleLink
                href="/universities"
                className="cf-glass-pill rounded-full px-6 py-3 text-xs font-medium text-paper/70 md:text-sm"
              >
                Destinations
              </RippleLink>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
          <div className="order-2 text-[10px] font-semibold uppercase tracking-widest text-paper/60 md:order-1 md:text-xs">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </div>
          <div className="cf-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full px-6 py-3 md:order-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-paper/60 md:text-xs">
              Crafted with
            </span>
            <span aria-hidden className="cf-heart text-sm text-danger md:text-base">
              ❤
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-paper/60 md:text-xs">
              in Accra by
            </span>
            <span className="ml-1 text-xs font-black text-paper md:text-sm">
              {siteConfig.name}
            </span>
          </div>
          <RippleButton
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cf-glass-pill order-3 flex h-12 w-12 items-center justify-center rounded-full text-paper/70"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </RippleButton>
        </div>
      </footer>
    </div>
  );
}
