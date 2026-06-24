import type { Route } from "next";

/**
 * Static site configuration. Once the admin CMS lands, these defaults become
 * the seed values for DB-backed, editable site settings.
 */
export const siteConfig = {
  name: "SACS",
  legalName: "Study Abroad Consultancy Services",
  tagline: "Study abroad, fully guided.",
  description:
    "SACS helps Ghanaian students win admissions and scholarships for Master's and PhD study in Europe.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    email: "hello@sacs.com",
    phone: "+233 00 000 0000",
    location: "Accra, Ghana"
  }
} as const;

export type NavLink = { label: string; href: Route };

export const primaryNav: readonly NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Universities", href: "/universities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const footerNav: readonly { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "Universities", href: "/universities" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Services",
    links: [
      { label: "University selection", href: "/services#selection" },
      { label: "Scholarships", href: "/services#scholarships" },
      { label: "Applications", href: "/services#applications" },
      { label: "Visa & interviews", href: "/services#visa" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" }
    ]
  }
] as const;
