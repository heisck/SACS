import type { ReactNode } from "react";
import { SiteMenu } from "@/components/site/site-menu";
import { SiteFooter } from "@/components/site/site-footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteMenu scheme="dark" />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
