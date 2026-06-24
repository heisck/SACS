import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"]
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
      className={cn(inter.variable, fraunces.variable)}
      suppressHydrationWarning
    >
      <body>
        <div className="grain-layer" aria-hidden />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
