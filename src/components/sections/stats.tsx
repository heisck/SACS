import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

const stats = [
  { value: "Masters & PhD", label: "Degree levels we place" },
  { value: "Europe-wide", label: "Study destinations" },
  { value: "End-to-end", label: "Shortlist to visa" },
  { value: "1-on-1", label: "Dedicated counselling" }
];

export function Stats() {
  return (
    <section
      aria-label="At a glance"
      className="border-t border-line bg-ink text-paper"
    >
      <Container className="py-14">
        <Reveal stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl tracking-tight md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-paper/60">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
