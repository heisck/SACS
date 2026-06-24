import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Services } from "@/components/sections/services";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end support: university selection, scholarships, applications, SOPs, visa coaching, and pre-departure."
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Everything you need, from shortlist to visa."
        intro="We make the entire study-abroad journey easy — so you can focus on building your future."
      />
      <Services />
      <CtaBand />
    </>
  );
}
