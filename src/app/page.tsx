import { IntroReveal } from "@/components/motion/intro-reveal";
import { SnapController } from "@/components/motion/snap-controller";
import { SiteMenu } from "@/components/site/site-menu";
import { HeroScene } from "@/components/sections/hero-scene";
import { HomeManifesto } from "@/components/sections/home-manifesto";
import { ServicesGallery } from "@/components/sections/services-gallery";
import { HomeProcess } from "@/components/sections/home-process";
import { CtaBand } from "@/components/sections/cta-band";
import { Panel } from "@/components/sections/panel";
import { FlowingMenu, type FlowingMenuItem } from "@/components/menu/flowing-menu";
import { SiteFooter } from "@/components/site/site-footer";

const statItems: FlowingMenuItem[] = [
  {
    link: "/about",
    text: "Masters & PhD",
    tagline: "Degree levels we place",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80"
  },
  {
    link: "/universities",
    text: "Europe-wide",
    tagline: "Study destinations",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80"
  },
  {
    link: "/services",
    text: "End-to-end",
    tagline: "Shortlist to visa",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
  },
  {
    link: "/contact",
    text: "1-on-1",
    tagline: "Dedicated counselling",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
  }
];

export default function HomePage() {
  return (
    <>
      <IntroReveal />
      <SnapController />

      {/* Dark hero photo → light toggle; hero words own the corners, so no wordmark. */}
      <SiteMenu scheme="light" showLogo={false} />

      <main id="main">
        <HeroScene />
        <HomeManifesto />
        {/* GSAP pins the gallery inside a pin-spacer (a DOM move React can't
            see). This wrapper keeps main's child list React-owned so hot
            reloads don't crash with insertBefore errors. */}
        <div>
          <ServicesGallery />
        </div>

        <HomeProcess />

        <section data-snap className="h-dvh w-full">
          <FlowingMenu
            items={statItems}
            bgColor="#0a0a0a"
            textColor="#fafafa"
            marqueeBgColor="#c9c9c9"
            marqueeTextColor="#0a0a0a"
            borderColor="#171717"
          />
        </section>

        <Panel tone="warm">
          <CtaBand />
        </Panel>
      </main>

      <SiteFooter />
    </>
  );
}
