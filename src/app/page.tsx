import { IntroReveal } from "@/components/motion/intro-reveal";
import { SnapController } from "@/components/motion/snap-controller";
import {
  StaggeredMenu,
  type StaggeredMenuItem,
  type StaggeredMenuSocialItem
} from "@/components/menu/staggered-menu";
import { HeroMorph } from "@/components/sections/hero-morph";
import { Services } from "@/components/sections/services";
import { HomeDestinations } from "@/components/sections/home-destinations";
import { HomeProcess } from "@/components/sections/home-process";
import { Stats } from "@/components/sections/stats";
import { CtaBand } from "@/components/sections/cta-band";
import { Panel } from "@/components/sections/panel";
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
        <HeroMorph />

        <Panel tone="paper">
          <Services />
        </Panel>

        <Panel tone="cool">
          <HomeDestinations />
        </Panel>

        <Panel tone="ink">
          <HomeProcess />
        </Panel>

        <Panel className="bg-ink">
          <Stats />
        </Panel>

        <Panel tone="warm">
          <CtaBand />
        </Panel>
      </main>

      <SiteFooter />
    </>
  );
}
