import Link from "next/link";

/** Brand-toned take on the glitch 404: chromatic layers slide out on hover. */
export default function NotFound() {
  return (
    <section className="flex min-h-dvh w-full flex-col items-center justify-center gap-8 bg-paper px-6 py-20 text-center">
      <div className="group relative select-none font-display font-bold leading-none tracking-tighter text-ink [font-size:clamp(5rem,18vw,11rem)]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 text-clay opacity-0 transition-[transform,opacity] duration-150 ease-out group-hover:translate-x-[3px] group-hover:opacity-70 motion-reduce:hidden"
        >
          <span className="tabular-nums">404</span>
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 text-gold opacity-0 transition-[transform,opacity] duration-150 ease-out group-hover:-translate-x-[3px] group-hover:opacity-70 motion-reduce:hidden"
        >
          <span className="tabular-nums">404</span>
        </span>
        <h1 className="relative">
          <span className="tabular-nums">404</span>
        </h1>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-semibold text-ink">Page not found</p>
        <p className="max-w-sm text-sm text-pretty text-ink-soft">
          The page you are looking for does not exist or has been moved — but your
          route abroad is still on the map.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-transform active:scale-[0.97]"
        >
          Go home
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-full border border-line bg-surface px-6 text-sm font-medium text-ink transition-colors hover:border-ink/30"
        >
          Talk to a counsellor
        </Link>
      </div>
    </section>
  );
}
