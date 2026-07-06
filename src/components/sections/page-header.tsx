import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { SectionBg, type Tone } from "@/components/sections/section-bg";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: Tone;
  /** Editorial split: portrait image beside the headline, gold-framed. */
  image?: { src: string; alt: string } | undefined;
};

/** Consistent hero band for inner marketing/legal pages, on a gradient field. */
export function PageHeader({ eyebrow, title, intro, tone = "warm", image }: PageHeaderProps) {
  const copy = (
    <>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.5rem,6vw,5rem)]">
        {title}
      </h1>
      {intro ? (
        <p className="mt-6 max-w-2xl text-pretty text-lg text-ink-soft md:text-xl">
          {intro}
        </p>
      ) : null}
    </>
  );

  if (!image) {
    return (
      <header className="relative isolate border-b border-line pt-36 md:pt-44">
        <SectionBg tone={tone} />
        <Container className="pb-16 md:pb-20">{copy}</Container>
      </header>
    );
  }

  return (
    <header className="relative isolate overflow-hidden border-b border-line pt-36 md:pt-44">
      <SectionBg tone={tone} />
      <Container className="pb-16 md:pb-20">
        <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>{copy}</div>
          <Reveal delay={0.15} className="relative lg:-mb-4">
            <div
              aria-hidden
              className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-gold/40"
            />
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-raise lg:aspect-5/4">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-ink/25 to-transparent"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </header>
  );
}
