import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHeader } from "@/components/sections/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionBg } from "@/components/sections/section-bg";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "SACS is an education consultancy helping Ghanaian graduates access Master's and PhD opportunities in Europe."
};

const values = [
  {
    title: "Personalized",
    body: "No two students are the same. Every shortlist, SOP, and plan is built around you."
  },
  {
    title: "Honest",
    body: "Straight guidance on your real chances, costs, and the funding worth chasing."
  },
  {
    title: "Relentless",
    body: "We stay with you through every deadline, document, and decision — to day one abroad."
  }
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About SACS"
        title="Talent is everywhere. Opportunity shouldn't be the barrier."
        intro="Study Abroad Consultancy Services helps Ghanaian graduates reach Master's and PhD programmes in Europe — with the information, guidance, and funding access that too often go missing."
      />

      <Section className="relative isolate">
        <SectionBg tone="paper" />
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>Our mission</Eyebrow>
            <p className="mt-5 text-balance font-display text-2xl leading-snug text-ink md:text-3xl">
              To empower students to achieve their highest academic potential through
              personalized guidance, comprehensive resources, and unwavering support
              throughout their educational journey.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Our vision</Eyebrow>
            <p className="mt-5 text-balance font-display text-2xl leading-snug text-ink md:text-3xl">
              To be the premier educational consultant that inspires and enables every
              Ghanaian student to access international education without barriers.
            </p>
          </Reveal>
        </Container>
      </Section>

      <section className="relative isolate h-[60vh] min-h-80 w-full overflow-hidden">
        <Image
          src="/images/hero-graduate.png"
          alt="A SACS student between maps of Africa and Europe."
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/30 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 pb-12">
          <Reveal>
            <p className="max-w-2xl text-balance font-display text-2xl text-white md:text-4xl">
              Every year, brilliant Ghanaian graduates miss out — not for lack of
              talent, but for lack of guidance. We close that gap.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="relative isolate border-t border-line">
        <SectionBg tone="cool" />
        <Container>
          <Eyebrow>What we stand for</Eyebrow>
          <Reveal stagger className="mt-10 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title}>
                <h2 className="font-display text-2xl">{value.title}</h2>
                <p className="mt-3 text-pretty text-ink-soft">{value.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
