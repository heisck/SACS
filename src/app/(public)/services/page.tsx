import type { Metadata } from "next";
import { MagneticCollage } from "@/components/sections/magnetic-collage";
import { Services } from "@/components/sections/services";
import { ResultsBento } from "@/components/sections/results-bento";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionBg } from "@/components/sections/section-bg";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end support: university selection, scholarships, applications, SOPs, visa coaching, and pre-departure."
};

export default function ServicesPage() {
  return (
    <>
      <MagneticCollage
        eyebrow="Our services"
        title="Everything you need, from shortlist to visa."
        intro="We make the entire study-abroad journey easy — so you can focus on building your future."
        image={{
          src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
          alt: "Students working through applications together at a shared table."
        }}
        tags={["Shortlist", "SOPs", "Scholarships", "Visa"]}
        cta={[{ label: "Book a consultation", href: "/contact" }]}
      />
      <div className="relative isolate">
        <SectionBg tone="paper" />
        <Services />
      </div>
      <ResultsBento />
      <CtaBand />
    </>
  );
}
