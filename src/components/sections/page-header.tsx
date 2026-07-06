import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { MaskedLines } from "@/components/motion/masked-lines";
import { Reveal } from "@/components/motion/reveal";

type PageHeaderProps = {
  /** Kept for call-site compatibility; no longer rendered. */
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Unused since the header went black; kept for call-site compatibility. */
  tone?: string;
  /** Editorial split: boxy image beside the headline with a reflection. */
  image?: { src: string; alt: string } | undefined;
};

/**
 * Full-viewport black opening section for inner pages — the headline rises
 * out of line masks the way the menu items do.
 */
export function PageHeader({ title, intro, image }: PageHeaderProps) {
  const copy = (
    <>
      <MaskedLines>
        <h1 className="max-w-4xl text-balance text-[clamp(2.5rem,6vw,5rem)] text-paper">
          {title}
        </h1>
      </MaskedLines>
      {intro ? (
        <MaskedLines delay={0.25}>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-paper/70 md:text-xl">
            {intro}
          </p>
        </MaskedLines>
      ) : null}
    </>
  );

  return (
    <header className="relative isolate flex min-h-dvh w-full items-center overflow-hidden bg-ink pb-16 pt-28 text-paper md:pb-20">
      <Container className="w-full">
        {image ? (
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>{copy}</div>
            <Reveal delay={0.35} className="relative">
              <div className="img-reflect relative aspect-4/3 w-full overflow-hidden shadow-raise">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        ) : (
          copy
        )}
      </Container>
    </header>
  );
}
