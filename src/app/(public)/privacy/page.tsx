import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/container";
import { PageHeader } from "@/components/sections/page-header";
import { Prose } from "@/components/ui/prose";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SACS collects, uses, and protects your personal information."
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro="Last updated June 2026."
      />
      <Section>
        <Container>
          <Prose>
            <p>
              {siteConfig.legalName} (&ldquo;SACS&rdquo;, &ldquo;we&rdquo;) is committed
              to protecting your privacy. This policy explains what information we
              collect when you use our website and consultancy services, and how we
              handle it.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li>
                Contact details you provide, such as your name, email, and phone number.
              </li>
              <li>
                Information about your academic goals, degree level, and study
                interests.
              </li>
              <li>Technical data such as device, browser, and usage analytics.</li>
            </ul>

            <h2>How we use your information</h2>
            <ul>
              <li>To respond to enquiries and deliver our advisory services.</li>
              <li>To send you updates you have requested, such as our newsletter.</li>
              <li>To improve our website, services, and student outcomes.</li>
            </ul>

            <h2>Sharing</h2>
            <p>
              We do not sell your personal information. We share data only with service
              providers who help us operate (for example, email and messaging
              providers), and only as needed to deliver our services.
            </p>

            <h2>Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal
              data at any time by emailing{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              .
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy can be sent to{" "}
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
