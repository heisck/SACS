import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
