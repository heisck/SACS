import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-[transform,background-color,color,border-color] duration-300 ease-[var(--ease-out-expo)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-ink-soft",
        gold: "bg-gold text-white hover:bg-gold/90",
        outline: "border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/4",
        ghost: "text-ink hover:bg-ink/6",
        link: "h-auto rounded-none p-0 text-ink underline-offset-4 hover:underline"
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base"
      }
    },
    defaultVariants: { variant: "primary", size: "md" }
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
