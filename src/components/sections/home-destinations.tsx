import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

const destinations = [
  { country: "Germany", note: "Tuition-free public universities." },
  { country: "Netherlands", note: "English-taught Master's & scholarships." },
  { country: "Sweden", note: "Research-led, global funding." },
  { country: "France", note: "Grandes écoles & Eiffel grants." },
  { country: "Ireland", note: "Growing PhD funding." },
  { country: "Italy", note: "Historic, regional scholarships." },
  { country: "Belgium", note: "Affordable EU-hub degrees." },
  { country: "Finland", note: "Top-ranked, student-first." }
];

export function HomeDestinations() {
  return (
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <Eyebrow>Where we place students</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-balance text-[clamp(2rem,4.5vw,3.5rem)]">
            Your degree, somewhere remarkable in Europe.
          </h2>
        </Reveal>
        <Link
          href="/universities"
          className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-gold"
        >
          All destinations
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <Reveal
        stagger
        className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-4"
      >
        {destinations.map((d) => (
          <article
            key={d.country}
            data-asset-slot="destination-image"
            className="group flex min-h-40 flex-col justify-between bg-surface p-6 transition-colors hover:bg-paper"
          >
            <span className="font-display text-lg text-ink-soft transition-colors group-hover:text-gold">
              {d.country.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <h3 className="font-display text-xl">{d.country}</h3>
              <p className="mt-1 text-pretty text-sm text-ink-soft">{d.note}</p>
            </div>
          </article>
        ))}
      </Reveal>
    </Container>
  );
}
