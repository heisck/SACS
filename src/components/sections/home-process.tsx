import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  { n: "01", title: "Discovery", body: "We learn your goals, field, and budget." },
  {
    n: "02",
    title: "Shortlist",
    body: "Programmes matched to you, not a generic list."
  },
  {
    n: "03",
    title: "Apply",
    body: "Applications, SOPs, and documents handled end to end."
  },
  {
    n: "04",
    title: "Scholarships",
    body: "We surface and pursue the funding you qualify for."
  },
  {
    n: "05",
    title: "Visa & interview",
    body: "Documentation and mock interviews until you're ready."
  },
  { n: "06", title: "Departure", body: "Housing, travel, and settling-in support." }
];

export function HomeProcess() {
  return (
    <Container>
      <Reveal>
        <Eyebrow className="text-paper/70">The journey</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-balance text-[clamp(2rem,4.5vw,3.5rem)] text-paper">
          One clear path, from first chat to first day abroad.
        </h2>
      </Reveal>

      <Reveal
        stagger
        className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {steps.map((s) => (
          <div key={s.n} className="border-t border-paper/20 pt-5">
            <span className="font-display text-2xl text-gold-soft">{s.n}</span>
            <h3 className="mt-3 font-display text-2xl text-paper">{s.title}</h3>
            <p className="mt-2 text-pretty text-paper/70">{s.body}</p>
          </div>
        ))}
      </Reveal>
    </Container>
  );
}
