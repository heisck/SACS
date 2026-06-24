import { Award, Compass, FileText, PenLine, Plane, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

type Service = { id: string; title: string; body: string; Icon: LucideIcon };

const services: Service[] = [
  {
    id: "selection",
    title: "University & course selection",
    body: "We shortlist programmes that fit your goals, budget, and profile — not a generic list.",
    Icon: Compass
  },
  {
    id: "scholarships",
    title: "Scholarship & financial aid",
    body: "We surface the funding you qualify for and help you build a competitive application.",
    Icon: Award
  },
  {
    id: "applications",
    title: "Application prep & submission",
    body: "Deadlines, documents, and portals handled end to end so nothing slips.",
    Icon: FileText
  },
  {
    id: "sop",
    title: "Statement of purpose",
    body: "We shape a focused, authentic SOP that makes admissions committees pay attention.",
    Icon: PenLine
  },
  {
    id: "visa",
    title: "Visa & interview coaching",
    body: "Documentation, mock interviews, and guidance to walk in prepared and confident.",
    Icon: ShieldCheck
  },
  {
    id: "predeparture",
    title: "Pre-departure support",
    body: "Housing, travel, and settling-in advice so day one abroad feels like home.",
    Icon: Plane
  }
];

export function Services() {
  return (
    <Section id="services" className="border-t border-line">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.5rem)]">
            One team for the whole journey.
          </h2>
          <p className="mt-5 text-pretty text-lg text-ink-soft">
            From shortlisting universities to a visa approval, we make the entire
            study-abroad journey easy — so you can focus on your future.
          </p>
        </div>

        <Reveal
          stagger
          className="mt-14 grid gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(({ id, title, body, Icon }) => (
            <article
              key={id}
              id={id}
              className="group flex scroll-mt-28 flex-col gap-4 bg-surface p-7 transition-colors hover:bg-paper"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors group-hover:bg-gold group-hover:text-white">
                <Icon size={20} />
              </span>
              <h3 className="font-display text-xl">{title}</h3>
              <p className="text-pretty text-ink-soft">{body}</p>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
