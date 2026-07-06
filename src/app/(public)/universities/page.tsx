import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TearHero } from "@/components/sections/tear-hero";
import { FanCarousel, type FanCard } from "@/components/sections/fan-carousel";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionBg } from "@/components/sections/section-bg";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Universities & destinations",
  description:
    "Where we place students — leading study destinations and partner institutions across Europe."
};

// Placeholder stock photography — swappable per destination from the admin later.
const destinations = [
  {
    country: "Germany",
    note: "Tuition-free public universities & strong research funding.",
    image:
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=900&q=80"
  },
  {
    country: "Netherlands",
    note: "English-taught Master's and generous scholarship schemes.",
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=900&q=80"
  },
  {
    country: "Sweden",
    note: "Innovation-led programmes with global scholarship options.",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80"
  },
  {
    country: "France",
    note: "Grandes écoles, research labs, and Eiffel Excellence grants.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80"
  },
  {
    country: "Ireland",
    note: "Growing PhD funding and a fast-track to post-study work.",
    image:
      "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=900&q=80"
  },
  {
    country: "Belgium",
    note: "EU-hub universities with affordable, English-taught degrees.",
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80"
  },
  {
    country: "Finland",
    note: "Top-ranked research universities and student-friendly cities.",
    image:
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=900&q=80"
  },
  {
    country: "Italy",
    note: "Historic institutions with regional and national scholarships.",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80"
  }
];

const fanItems: FanCard[] = destinations.map((d) => ({
  label: d.country,
  sub: d.note,
  image: d.image
}));

export default function UniversitiesPage() {
  return (
    <>
      <TearHero
        image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=80"
        alt="The facade of a grand European university."
        title="Your degree, somewhere remarkable in Europe."
        intro="We match students with programmes across Europe and guide every application. Specific partner institutions are managed by our team and shared during your consultation."
      />

      <Section className="relative isolate flex min-h-dvh items-center overflow-hidden">
        <SectionBg tone="warm" />
        <div className="w-full">
          <Container>
            <div className="text-center">
              <Eyebrow className="justify-center">Pick a city, we know the way</Eyebrow>
              <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.5rem)]">
                Eight destinations. One route: yours.
              </h2>
            </div>
          </Container>
          <Reveal className="mt-10">
            <FanCarousel items={fanItems} />
          </Reveal>
        </div>
      </Section>

      <Section className="relative isolate border-t border-line">
        <SectionBg tone="cool" />
        <Container>
          <Eyebrow>Where we place students</Eyebrow>
          <Reveal
            stagger
            className="mt-10 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-4"
          >
            {destinations.map((dest) => (
              <article key={dest.country} className="group bg-surface">
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={`${dest.country} — study destination.`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-ink/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <div className="p-7">
                  <h2 className="font-display text-xl">{dest.country}</h2>
                  <p className="mt-2 text-sm text-pretty text-ink-soft">{dest.note}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
