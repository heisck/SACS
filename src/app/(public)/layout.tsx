import type { ReactNode } from "react";
import { SiteMenu } from "@/components/site/site-menu";
import { SiteFooter } from "@/components/site/site-footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteMenu scheme="light" />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
