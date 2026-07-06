import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/container";
import { MagneticCollage } from "@/components/sections/magnetic-collage";
import { Prose } from "@/components/ui/prose";
import { SectionBg } from "@/components/sections/section-bg";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the SACS website and services."
};

export default function TermsPage() {
  return (
    <>
      <MagneticCollage
        eyebrow="Legal"
        title="Terms of Service"
        intro="Last updated June 2026."
        tags={["Terms", "Fair use"]}
      />
      <Section className="relative isolate">
        <SectionBg tone="paper" />
        <Container>
          <Prose>
            <p>
              These terms govern your use of the {siteConfig.legalName} website and
              services. By using our site, you agree to them.
            </p>

            <h2>Our services</h2>
            <p>
              SACS provides educational consultancy and advisory support. We guide and
              assist with applications, scholarships, and visas, but admissions,
              funding, and visa decisions are made solely by the relevant institutions
              and authorities. We do not guarantee any specific outcome.
            </p>

            <h2>Your responsibilities</h2>
            <ul>
              <li>Provide accurate and complete information.</li>
              <li>Submit your own authentic application materials.</li>
              <li>Meet deadlines and requirements communicated to you.</li>
            </ul>

            <h2>Intellectual property</h2>
            <p>
              All content on this site is owned by SACS or its licensors and may not be
              reused without permission.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, SACS is not liable for indirect or
              consequential losses arising from use of our website or services.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
