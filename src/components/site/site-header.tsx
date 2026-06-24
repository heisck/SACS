"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { buttonVariants } from "@/components/ui/button";
import { primaryNav } from "@/config/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-line/70 bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-18 max-w-[1240px] items-center justify-between px-6 py-4 md:px-10">
        <Logo />

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-tight text-ink-soft transition-colors hover:text-ink",
                pathname === link.href && "text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "hidden md:inline-flex"
            )}
          >
            Book a consultation
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/6 md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          onClick={() => setOpen(false)}
          className="border-t border-line/70 bg-paper px-6 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-3 text-lg font-display hover:bg-ink/5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "primary", size: "md" }),
              "mt-4 w-full"
            )}
          >
            Book a consultation
          </Link>
        </nav>
      )}
    </header>
  );
}
