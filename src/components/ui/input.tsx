import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes
} from "react";
import { cn } from "@/lib/cn";

const controlBase =
  "w-full rounded-none border border-line bg-paper px-3.5 text-ink placeholder:text-muted-foreground/70 transition-colors focus-visible:border-ink/40 aria-[invalid=true]:border-danger";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(controlBase, "h-11", className)} {...props} />;
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(controlBase, "min-h-32 py-3", className)}
      {...props}
    />
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  InputHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(controlBase, "h-11", className)} {...props}>
      {children}
    </select>
  );
});
