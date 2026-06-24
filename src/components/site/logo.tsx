import Link from "next/link";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/config/site";

/**
 * Wordmark. The split dot nods to the Africa↔Europe story and doubles as a
 * slot the admin can later swap for an uploaded logo asset.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.legalName} — home`}
      className={cn(
        "inline-flex items-center gap-2 font-display text-xl font-semibold tracking-tight",
        className
      )}
    >
      <span
        aria-hidden
        className="h-3.5 w-3.5 rounded-full bg-[conic-gradient(from_140deg,var(--color-clay)_0_50%,var(--color-slate)_50%_100%)]"
      />
      {siteConfig.name}
    </Link>
  );
}
