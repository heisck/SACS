import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHeader } from "@/components/sections/page-header";
import { TestimonialsReel } from "@/components/sections/testimonials-reel";
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
    body: "No two students are the same. Every shortlist, SOP, and plan is built around you.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    alt: "A counsellor working one-on-one with a student."
  },
  {
    title: "Honest",
    body: "Straight guidance on your real chances, costs, and the funding worth chasing.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
    alt: "Notes and planning on paper during an advising session."
  },
  {
    title: "Relentless",
    body: "We stay with you through every deadline, document, and decision — to day one abroad.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
    alt: "Students pushing through a working session together."
  }
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About SACS"
        title="Talent is everywhere. Opportunity shouldn't be the barrier."
        intro="Study Abroad Consultancy Services helps Ghanaian graduates reach Master's and PhD programmes in Europe — with the information, guidance, and funding access that too often go missing."
        image={{
          src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
          alt: "Students working together around a laptop."
        }}
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
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=80"
          alt="Graduates throwing their caps in celebration."
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
          <Reveal stagger className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="group bg-surface">
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={value.image}
                    alt={value.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h2 className="font-display text-2xl">{value.title}</h2>
                  <p className="mt-3 text-pretty text-ink-soft">{value.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <TestimonialsReel />

      <CtaBand />
    </>
  );
}
