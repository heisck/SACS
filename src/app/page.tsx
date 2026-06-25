import Image from "next/image";
import {
  StaggeredMenu,
  type StaggeredMenuItem,
  type StaggeredMenuSocialItem
} from "@/components/menu/staggered-menu";

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

export default function LandingPage() {
  return (
    <main id="main" className="relative h-dvh w-full overflow-hidden bg-ink">
      <Image
        src="/images/hero-graduate.png"
        alt="A graduate in cap and gown at a desk, between maps of Africa and Europe."
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Light legibility wash at the bottom — keeps the upper-left Africa map clear */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent"
      />

      <h1 className="absolute bottom-0 left-0 w-fit text-center font-display text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
        <span className="block text-[clamp(3.5rem,12vw,9.5rem)] font-bold uppercase leading-[0.82] tracking-tight">
          Study
        </span>
        <span className="block py-1 text-[clamp(1.75rem,5vw,3.5rem)] italic leading-none">
          without
        </span>
        <span className="block text-[clamp(3.5rem,12vw,9.5rem)] font-bold uppercase leading-[0.82] tracking-tight">
          Borders
        </span>
      </h1>

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
      />
    </main>
  );
}
