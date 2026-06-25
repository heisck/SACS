import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/features/leads/components/contact-form";
import { SectionBg } from "@/components/sections/section-bg";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a free consultation with a SACS counsellor."
};

const details = [
  {
    Icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`
  },
  {
    Icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone}`
  },
  { Icon: MapPin, label: "Office", value: siteConfig.contact.location }
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's map your path abroad."
        intro="Book a free consultation and we'll outline your route to a funded degree in Europe."
      />

      <Section className="relative isolate">
        <SectionBg tone="cool" />
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-8">
            {details.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-1 block text-lg text-ink hover:text-gold"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-lg text-ink">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 md:p-10">
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
