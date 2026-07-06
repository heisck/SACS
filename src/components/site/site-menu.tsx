"use client";

import { useEffect, useState } from "react";
import {
  StaggeredMenu,
  type StaggeredMenuItem,
  type StaggeredMenuSocialItem
} from "@/components/menu/staggered-menu";

const menuItems: StaggeredMenuItem[] = [
  { label: "Home", link: "/", ariaLabel: "Go to home" },
  { label: "Services", link: "/services", ariaLabel: "View our services" },
  {
    label: "Universities",
    link: "/universities",
    ariaLabel: "Universities & destinations"
  },
  { label: "About", link: "/about", ariaLabel: "About SACS" },
  { label: "Contact", link: "/contact", ariaLabel: "Contact us" }
];

const socialItems: StaggeredMenuSocialItem[] = [
  { label: "LinkedIn", link: "https://www.linkedin.com/company/sacs-study-abroad" },
  { label: "Instagram", link: "https://www.instagram.com/sacs.studyabroad" },
  { label: "Facebook", link: "https://www.facebook.com/sacs.studyabroad" },
  { label: "WhatsApp", link: "https://wa.me/233000000000" }
];

type SiteMenuProps = {
  /** Initial colour before the first background sample lands. The fixed menu
   * overlays dark heroes AND light paper, so this is only a starting guess —
   * the actual colour is driven by `useAdaptiveScheme` below. */
  scheme?: "light" | "dark";
  /** Hide the SACS wordmark (homepage: the hero words own the corners). */
  showLogo?: boolean;
};

/**
 * Sample the section currently sitting behind the menu header and return
 * "light" (white UI, for dark backgrounds) or "dark" (ink UI, for light
 * backgrounds). The fixed menu overlays dark heroes AND light paper sections,
 * so a single static colour is unreadable on one or the other.
 *
 * It reads the topmost element with an opaque `background-color` at the
 * header's vertical band (clear of the logo and toggle) and compares its
 * luminance. Sections here all use solid ink/paper/surface backgrounds, so
 * this is reliable; if nothing opaque is found (e.g. raw photo/video) it
 * assumes dark media and returns "light".
 */
function useAdaptiveScheme(initial: "light" | "dark") {
  const [scheme, setScheme] = useState<"light" | "dark">(initial);

  useEffect(() => {
    const pick = () => {
      const x = window.innerWidth / 2;
      // Top of the header band, between the logo (left) and toggle (right).
      const y = 16;
      const els = document.elementsFromPoint(x, y);
      for (const el of els) {
        const e = el as HTMLElement | null;
        if (!e || e === document.body || e === document.documentElement) continue;
        const bg = getComputedStyle(e).backgroundColor;
        const m = bg.match(
          /rgba?\(\s*([\d.]+)\s*[ ,]\s*([\d.]+)\s*[ ,]\s*([\d.]+)\s*(?:,[\s]*([\d.]+)\s*)?\)/i
        );
        if (!m) continue;
        const r = Number(m[1]);
        const g = Number(m[2]);
        const b = Number(m[3]);
        const a = m[4] === undefined ? 1 : Number(m[4]);
        if (a < 0.5) continue; // transparent layer — look at what's behind it
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        setScheme(lum < 0.45 ? "light" : "dark");
        return;
      }
      // No opaque background found (photo/video) — assume dark media.
      setScheme("light");
    };

    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        pick();
      });
    };

    pick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return scheme;
}

/** The one navigation for the whole system — the staggered overlay menu. */
export function SiteMenu({ scheme = "dark", showLogo = true }: SiteMenuProps) {
  const active = useAdaptiveScheme(scheme);

  return (
    <StaggeredMenu
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      position="right"
      logoUrl={active === "light" ? "/images/logo.svg" : "/images/logo-dark.svg"}
      showLogo={showLogo}
      menuButtonColor={active === "light" ? "#ffffff" : "#0a0a0a"}
      openMenuButtonColor="#0a0a0a"
      accentColor="#0a0a0a"
      colors={["#262626", "#0a0a0a"]}
      changeMenuColorOnOpen
      isFixed
    />
  );
}
