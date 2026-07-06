import InfiniteMenu, { type InfiniteMenuItem } from "@/components/menu/infinite-menu";
import { ScrollDownButton } from "@/components/motion/scroll-down-button";

const steps = [
  {
    title: "Discovery",
    description: "We learn your goals, field, and budget.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Shortlist",
    description: "Programmes matched to you, not a generic list.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Apply",
    description: "Applications, SOPs, and documents handled end to end.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Scholarships",
    description: "We surface and pursue the funding you qualify for.",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Visa & interview",
    description: "Documentation and mock interviews until you're ready.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Departure",
    description: "Housing, travel, and settling-in support.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80"
  }
];

const journey: InfiniteMenuItem[] = steps.map((s) => ({
  image: s.image,
  link: "#",
  title: s.title,
  description: s.description
}));

export function HomeProcess() {
  return (
    <section data-snap className="relative h-dvh w-full bg-ink">
      <InfiniteMenu items={journey} />
      {/* The drag canvas eats touch scrolling — give phones a way out. */}
      <ScrollDownButton />
    </section>
  );
}
