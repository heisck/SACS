import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
};

/** Consistent hero band for inner marketing/legal pages. */
export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="border-b border-line pt-36 md:pt-44">
      <Container className="pb-16 md:pb-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.5rem,6vw,5rem)]">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-pretty text-lg text-ink-soft md:text-xl">
            {intro}
          </p>
        ) : null}
      </Container>
    </header>
  );
}
