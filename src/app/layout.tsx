import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Orbitron } from "next/font/google";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import "./globals.css";
import "../components/menu/staggered-menu.css";
import "../components/menu/flowing-menu.css";
import "../components/menu/infinite-menu.css";

/* Single brand face across the whole system. Orbitron is a variable font
 * (weights 400–900, no italic — italics render as synthetic oblique). */
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.legalName}`,
    template: `%s · ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.legalName,
    title: `${siteConfig.name} — ${siteConfig.legalName}`,
    description: siteConfig.description
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(orbitron.variable)}
      suppressHydrationWarning
    >
      <body>
        <div className="grain-layer" aria-hidden />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
