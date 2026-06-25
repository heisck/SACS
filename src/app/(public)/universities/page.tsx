import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHeader } from "@/components/sections/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionBg } from "@/components/sections/section-bg";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Universities & destinations",
  description:
    "Where we place students — leading study destinations and partner institutions across Europe."
};

const destinations = [
  {
    country: "Germany",
    note: "Tuition-free public universities & strong research funding."
  },
  {
    country: "Netherlands",
    note: "English-taught Master's and generous scholarship schemes."
  },
  {
    country: "Sweden",
    note: "Innovation-led programmes with global scholarship options."
  },
  {
    country: "France",
    note: "Grandes écoles, research labs, and Eiffel Excellence grants."
  },
  {
    country: "Ireland",
    note: "Growing PhD funding and a fast-track to post-study work."
  },
  {
    country: "Belgium",
    note: "EU-hub universities with affordable, English-taught degrees."
  },
  {
    country: "Finland",
    note: "Top-ranked research universities and student-friendly cities."
  },
  {
    country: "Italy",
    note: "Historic institutions with regional and national scholarships."
  }
];

export default function UniversitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Universities & destinations"
        title="Your degree, somewhere remarkable in Europe."
        intro="We match students with programmes across Europe and guide every application. Specific partner institutions are managed by our team and shared during your consultation."
      />

      <Section className="relative isolate">
        <SectionBg tone="cool" />
        <Container>
          <Eyebrow>Where we place students</Eyebrow>
          <Reveal
            stagger
            className="mt-10 grid gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-4"
          >
            {destinations.map((dest) => (
              <article key={dest.country} className="bg-surface p-7">
                <div
                  data-asset-slot="partner-logo"
                  aria-hidden
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-ink/5 font-display text-lg text-ink-soft"
                >
                  {dest.country.slice(0, 2)}
                </div>
                <h2 className="font-display text-xl">{dest.country}</h2>
                <p className="mt-2 text-sm text-pretty text-ink-soft">{dest.note}</p>
              </article>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
