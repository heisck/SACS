import Image from "next/image";
import { Award, Compass, FileText, PenLine, Plane, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

type Service = {
  id: string;
  title: string;
  body: string;
  Icon: LucideIcon;
  span: string;
  /** Full-bleed photo behind the card; copy flips to light-on-ink. */
  image?: { src: string; alt: string };
};

// One rectangle, divided by thin lines into mixed squares and rectangles.
const services: Service[] = [
  {
    id: "selection",
    title: "University & course selection",
    body: "We shortlist programmes that fit your goals, budget, and profile — not a generic list.",
    Icon: Compass,
    span: "lg:col-span-2 lg:row-span-2",
    image: {
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80",
      alt: "A historic European university building."
    }
  },
  {
    id: "scholarships",
    title: "Scholarship & financial aid",
    body: "We surface the funding you qualify for and help you build a competitive application.",
    Icon: Award,
    span: "lg:col-span-2"
  },
  {
    id: "applications",
    title: "Application prep & submission",
    body: "Deadlines, documents, and portals handled end to end.",
    Icon: FileText,
    span: "lg:col-span-1"
  },
  {
    id: "sop",
    title: "Statement of purpose",
    body: "A focused, authentic SOP that earns attention.",
    Icon: PenLine,
    span: "lg:col-span-1"
  },
  {
    id: "visa",
    title: "Visa & interview coaching",
    body: "Documentation and mock interviews so you walk in prepared.",
    Icon: ShieldCheck,
    span: "lg:col-span-2",
    image: {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
      alt: "A counsellor coaching a student through interview preparation."
    }
  },
  {
    id: "predeparture",
    title: "Pre-departure support",
    body: "Housing, travel, and settling-in advice for day one abroad.",
    Icon: Plane,
    span: "lg:col-span-2"
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

        <Reveal className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line lg:auto-rows-[13rem] lg:grid-cols-4">
          {services.map(({ id, title, body, Icon, span, image }) => (
            <article
              key={id}
              id={id}
              className={cn(
                "group relative flex scroll-mt-28 flex-col justify-between gap-6 overflow-hidden p-7 transition-colors",
                image ? "bg-ink text-white" : "bg-surface hover:bg-paper",
                span
              )}
            >
              {image ? (
                <>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/35 to-ink/10"
                  />
                </>
              ) : null}

              <span
                className={cn(
                  "relative inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors",
                  image
                    ? "bg-white/15 text-white backdrop-blur-sm group-hover:bg-gold"
                    : "bg-ink/5 text-ink group-hover:bg-gold group-hover:text-white"
                )}
              >
                <Icon size={20} />
              </span>
              <div className="relative">
                <h3 className="font-display text-xl">{title}</h3>
                <p
                  className={cn(
                    "mt-2 text-pretty text-sm",
                    image ? "text-white/85" : "text-ink-soft"
                  )}
                >
                  {body}
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
