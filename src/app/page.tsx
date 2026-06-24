import Image from "next/image";
import { Container } from "@/components/ui/container";

export default function LandingPage() {
  return (
    <main id="main" className="relative h-dvh w-full overflow-hidden bg-ink">
      <Image
        src="/images/hero-graduate.png"
        alt="A graduate in cap and gown at a desk, between maps of Africa and Europe."
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Legibility scrim — darkens the left where the text sits, fades out to the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent"
      />

      <Container className="absolute inset-0 flex items-center">
        <h1 className="mr-auto max-w-xl text-center font-display text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
          <span className="block text-[clamp(3.5rem,12vw,9.5rem)] font-bold uppercase leading-[0.82] tracking-tight">
            Study
          </span>
          <span className="block py-1 text-[clamp(1.75rem,5vw,3.5rem)] italic leading-none">
            without
          </span>
          <span className="block text-[clamp(3.5rem,12vw,9.5rem)] font-bold uppercase leading-[0.82] tracking-tight">
            Borders
          </span>
        </h1>
      </Container>
    </main>
  );
}
