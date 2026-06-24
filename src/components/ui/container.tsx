import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** Centered max-width gutter wrapper used across the marketing site. */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1240px] px-6 md:px-10", className)}>
      {children}
    </Tag>
  );
}

type SectionProps = ContainerProps & { id?: string };

/** Vertical-rhythm section wrapper. Bring your own Container inside. */
export function Section({
  children,
  className,
  id,
  as: Tag = "section"
}: SectionProps) {
  return (
    <Tag id={id} className={cn("py-20 md:py-28 lg:py-32", className)}>
      {children}
    </Tag>
  );
}
