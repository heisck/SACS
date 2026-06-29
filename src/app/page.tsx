import { IntroReveal } from "@/components/motion/intro-reveal";
import { SnapController } from "@/components/motion/snap-controller";
import {
  StaggeredMenu,
  type StaggeredMenuItem,
  type StaggeredMenuSocialItem
} from "@/components/menu/staggered-menu";
import { HeroScene } from "@/components/sections/hero-scene";
import { HomeManifesto } from "@/components/sections/home-manifesto";
import { ServicesGallery } from "@/components/sections/services-gallery";
import { HomeProcess } from "@/components/sections/home-process";
import { CtaBand } from "@/components/sections/cta-band";
import { Panel } from "@/components/sections/panel";
import { FlowingMenu, type FlowingMenuItem } from "@/components/menu/flowing-menu";
import { SiteFooter } from "@/components/site/site-footer";

const menuItems: StaggeredMenuItem[] = [
  { label: "Home", link: "/", ariaLabel: "Go to home" },
  { label: "Services", link: "/services", ariaLabel: "View our services" },
  {
    label: "Universities",
    link: "/universities",
    ariaLabel: "Universities & destinations"
  },
  { label: "About", link: "/about", ariaLabel: "About SACS" },
  { label: "Contact", link: "/contact", ariaLabel: "Contact us" }
];

const socialItems: StaggeredMenuSocialItem[] = [
  { label: "LinkedIn", link: "#" },
  { label: "Instagram", link: "#" },
  { label: "Facebook", link: "#" }
];

const statItems: FlowingMenuItem[] = [
  {
    link: "/about",
    text: "Masters & PhD",
    tagline: "Degree levels we place",
    image: "/images/hero-graduate.png"
  },
  {
    link: "/universities",
    text: "Europe-wide",
    tagline: "Study destinations",
    image: "/images/hero-graduate.png"
  },
  {
    link: "/services",
    text: "End-to-end",
    tagline: "Shortlist to visa",
    image: "/images/hero-graduate.png"
  },
  {
    link: "/contact",
    text: "1-on-1",
    tagline: "Dedicated counselling",
    image: "/images/hero-graduate.png"
  }
];

export default function HomePage() {
  return (
    <>
      <IntroReveal />
      <SnapController />

      <StaggeredMenu
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        position="right"
        logoUrl="/images/logo.svg"
        menuButtonColor="#ffffff"
        openMenuButtonColor="#17140f"
        accentColor="#a9772b"
        colors={["#2f3a44", "#a9772b"]}
        changeMenuColorOnOpen
        isFixed
      />

      <main id="main">
        <HeroScene />
        <HomeManifesto />
        <ServicesGallery />

        <HomeProcess />

        <section data-snap className="h-dvh w-full">
          <FlowingMenu
            items={statItems}
            bgColor="#17140f"
            textColor="#f5f0e8"
            marqueeBgColor="#c9a14e"
            marqueeTextColor="#17140f"
            borderColor="#2a2620"
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
