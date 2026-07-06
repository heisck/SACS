import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

/**
 * Quiet opening screen — the first thing a visitor sees, one viewport tall,
 * before scrolling into the "Study without Borders" hero scene.
 */
export function PreHero() {
  return (
    <section
      aria-label="Welcome"
      data-snap
      className="relative isolate min-h-dvh w-full overflow-hidden bg-background text-foreground"
    >
      <div className="relative z-0">
        <Reveal className="flex min-h-dvh w-full flex-col items-center justify-center gap-5 px-6 text-center">
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            First we listen. Then you fly.
          </h1>
          <p className="max-w-md text-balance text-base text-muted-foreground md:text-lg">
            A consultancy for Ghanaian graduates who want the funded kind of degree —
            Master&apos;s and PhDs across Europe, guided end to end.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Book a consultation
            </Link>
            <a
              href="#story"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-border transition-colors hover:bg-muted"
            >
              See how it works
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
