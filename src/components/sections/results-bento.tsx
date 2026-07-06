import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { cn } from "@/lib/cn";

type StatTile = {
  value: string;
  label: string;
  className: string;
};

const tiles: StatTile[] = [
  { value: "4×", label: "More offers per applicant", className: "bg-brand-100 text-ink" },
  { value: "70%", label: "Leave with funding secured", className: "bg-brand-200 text-ink" }
];

const trailingTile: StatTile = {
  value: "100%",
  label: "Guided to day one abroad",
  className: "bg-brand-300 text-ink"
};

/**
 * Staggered stat band — light tiles with count-up numbers rising toward a
 * featured story card. Paper stage so the page background runs through.
 */
export function ResultsBento() {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Results</Eyebrow>
          <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.5rem)]">
            Outcomes that speak for themselves.
          </h2>
          <p className="mt-5 text-pretty text-lg text-ink-soft">
            From first shortlist to a stamped visa, our students see it through — with
            funding to match.
          </p>
        </div>

        <Reveal className="mt-12 flex flex-col gap-3 md:flex-row md:items-end md:gap-0">
          {tiles.map((tile, i) => (
            <div
              key={tile.label}
              className={cn(
                "group relative flex min-h-45 flex-col justify-end overflow-hidden p-7 transition-[flex,transform] duration-500 ease-out-expo md:flex-[1.4] md:hover:flex-[2.4]",
                i === 0 ? "md:min-h-70" : "md:min-h-82",
                tile.className
              )}
            >
              <p className="origin-bottom-left text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-none transition-transform duration-500 ease-out-expo group-hover:scale-125">
                <CountUp value={tile.value} />
              </p>
              <p className="mt-2 max-w-32 text-[11px] font-semibold uppercase tracking-[0.12em]">
                {tile.label}
              </p>
            </div>
          ))}

          <article className="relative flex min-h-115 flex-col overflow-hidden border border-line bg-surface p-8 text-ink md:flex-[4.4] md:p-10">
            <div className="max-w-75">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-clay">
                Student story
              </p>
              <h3 className="mt-2 text-balance font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight">
                From Legon to a funded Master&apos;s in Delft.
              </h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-soft">
                A focused shortlist, a sharper SOP, and a scholarship application that
                landed — the same route we map for every student.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay transition-colors hover:text-ink"
              >
                Start your route
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-8 grid flex-1 grid-cols-1 items-end gap-5 sm:grid-cols-[1fr_1.05fr]">
              <div>
                <p className="text-[clamp(3.25rem,5.5vw,4.5rem)] font-semibold leading-none">
                  <CountUp value="92%" />
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em]">
                  Visa approvals, first attempt
                </p>
              </div>
              <div className="relative h-40 overflow-hidden border border-line sm:h-45 md:h-50">
                <Image
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80"
                  alt="Graduates throwing their caps at a commencement ceremony."
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </article>

          <div
            className={cn(
              "group relative flex min-h-45 flex-col justify-end overflow-hidden p-7 transition-[flex,transform] duration-500 ease-out-expo md:min-h-95 md:flex-[1.4] md:hover:flex-[2.4]",
              trailingTile.className
            )}
          >
            <p className="origin-bottom-left text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-none transition-transform duration-500 ease-out-expo group-hover:scale-125">
              <CountUp value={trailingTile.value} />
            </p>
            <p className="mt-2 max-w-32 text-[11px] font-semibold uppercase tracking-[0.12em]">
              {trailingTile.label}
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-6 flex justify-center bg-brand-100 px-6 py-4 text-center text-ink"
        >
          <p className="text-pretty text-sm">
            Your numbers could be next — a free consultation is where every story here
            began.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
