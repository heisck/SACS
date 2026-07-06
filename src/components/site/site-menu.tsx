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

type SiteMenuProps = {
  /** Toggle colour before the panel opens: light sits over photo heroes,
   * dark over paper pages. */
  scheme?: "light" | "dark";
};

/** The one navigation for the whole system — the staggered overlay menu. */
export function SiteMenu({ scheme = "dark" }: SiteMenuProps) {
  return (
    <StaggeredMenu
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      position="right"
      logoUrl="/images/logo.svg"
      menuButtonColor={scheme === "light" ? "#ffffff" : "#0a0a0a"}
      openMenuButtonColor="#0a0a0a"
      accentColor="#0a0a0a"
      colors={["#262626", "#0a0a0a"]}
      changeMenuColorOnOpen
      isFixed
    />
  );
}
