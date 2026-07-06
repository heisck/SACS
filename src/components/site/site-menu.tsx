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
  { label: "LinkedIn", link: "https://www.linkedin.com/company/sacs-study-abroad" },
  { label: "Instagram", link: "https://www.instagram.com/sacs.studyabroad" },
  { label: "Facebook", link: "https://www.facebook.com/sacs.studyabroad" },
  { label: "WhatsApp", link: "https://wa.me/233000000000" }
];

type SiteMenuProps = {
  /** Toggle colour before the panel opens: light sits over photo heroes,
   * dark over paper pages. */
  scheme?: "light" | "dark";
  /** Hide the SACS wordmark (homepage: the hero words own the corners). */
  showLogo?: boolean;
};

/** The one navigation for the whole system — the staggered overlay menu. */
export function SiteMenu({ scheme = "dark", showLogo = true }: SiteMenuProps) {
  return (
    <StaggeredMenu
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      position="right"
      logoUrl="/images/logo.svg"
      showLogo={showLogo}
      menuButtonColor={scheme === "light" ? "#ffffff" : "#0a0a0a"}
      openMenuButtonColor="#0a0a0a"
      accentColor="#0a0a0a"
      colors={["#262626", "#0a0a0a"]}
      changeMenuColorOnOpen
      isFixed
    />
  );
}
