import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

export function CtaBand() {
  return (
    <Section className="border-t border-line">
      <Container>
        <Reveal className="relative overflow-hidden bg-surface px-8 py-16 text-center md:px-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-clay/10 blur-3xl"
          />
          <h2 className="relative mx-auto max-w-3xl text-balance text-[clamp(2rem,5vw,4rem)]">
            Your future starts with one conversation.
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-pretty text-lg text-ink-soft">
            Book a free consultation and we&apos;ll map your path to a funded degree in
            Europe.
          </p>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "gold", size: "lg" }),
              "relative mt-9"
            )}
          >
            Book a consultation
            <ArrowRight size={18} />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
