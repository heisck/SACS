import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { WordsRise } from "@/components/motion/words-rise";
import { cn } from "@/lib/cn";

export function CtaBand() {
  return (
    <Section>
      <Container>
        {/* No boxed background — the band sits directly on the page so the
            backdrop runs uninterrupted. */}
        <div className="relative px-8 py-16 text-center md:px-16 md:py-24">
          <h2 className="relative mx-auto max-w-3xl text-balance text-[clamp(2rem,5vw,4rem)]">
            <WordsRise text="Your future starts with one conversation." />
          </h2>
          <Reveal delay={0.35}>
            <p className="relative mx-auto mt-5 max-w-xl text-pretty text-lg text-ink-soft">
              Book a free consultation and we&apos;ll map your path to a funded degree
              in Europe.
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
        </div>
      </Container>
    </Section>
  );
}
