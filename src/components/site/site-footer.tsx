import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/site/logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon
} from "@/components/site/social-icons";
import { footerNav, siteConfig } from "@/config/site";

const socials = [
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-pretty text-muted">{siteConfig.description}</p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink-soft transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="inline-flex items-center gap-1 text-ink-soft transition-colors hover:text-ink"
          >
            {siteConfig.contact.email}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
