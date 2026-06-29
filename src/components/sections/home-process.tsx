import InfiniteMenu, { type InfiniteMenuItem } from "@/components/menu/infinite-menu";

const steps = [
  {
    n: "01",
    title: "Discovery",
    description: "We learn your goals, field, and budget.",
    color: "#a9772b"
  },
  {
    n: "02",
    title: "Shortlist",
    description: "Programmes matched to you, not a generic list.",
    color: "#b4542f"
  },
  {
    n: "03",
    title: "Apply",
    description: "Applications, SOPs, and documents handled end to end.",
    color: "#2f3a44"
  },
  {
    n: "04",
    title: "Scholarships",
    description: "We surface and pursue the funding you qualify for.",
    color: "#c9a14e"
  },
  {
    n: "05",
    title: "Visa & interview",
    description: "Documentation and mock interviews until you're ready.",
    color: "#7c3c1c"
  },
  {
    n: "06",
    title: "Departure",
    description: "Housing, travel, and settling-in support.",
    color: "#3a322a"
  }
];

const disc = (n: string, color: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="${color}"/><text x="256" y="312" font-family="Georgia, serif" font-size="240" font-weight="700" fill="#f5f0e8" text-anchor="middle">${n}</text></svg>`
  )}`;

const journey: InfiniteMenuItem[] = steps.map((s) => ({
  image: disc(s.n, s.color),
  link: "#",
  title: s.title,
  description: s.description
}));

export function HomeProcess() {
  return (
    <section data-snap className="relative h-dvh w-full bg-ink">
      <InfiniteMenu items={journey} />
    </section>
  );
}
