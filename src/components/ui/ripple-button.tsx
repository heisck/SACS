"use client";

import Link from "next/link";
import type { ComponentProps, PointerEvent } from "react";
import { cn } from "@/lib/cn";

/** Spawn an expanding ink circle at the pointer, clipped to the control. */
function spawnRipple(host: HTMLElement, e: { clientX: number; clientY: number }) {
  const overlay = host.querySelector<HTMLElement>("[data-ripple-overlay]");
  if (!overlay) return;
  const rect = host.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ink = document.createElement("span");
  ink.className = "ripple-ink";
  ink.style.width = `${size}px`;
  ink.style.height = `${size}px`;
  ink.style.left = `${e.clientX - rect.left - size / 2}px`;
  ink.style.top = `${e.clientY - rect.top - size / 2}px`;
  overlay.appendChild(ink);
  ink.addEventListener("animationend", () => ink.remove());
}

function RippleOverlay() {
  return (
    <span
      aria-hidden
      data-ripple-overlay
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
    />
  );
}

export function RippleButton({
  className,
  children,
  onPointerDown,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn("relative overflow-hidden", className)}
      onPointerDown={(e: PointerEvent<HTMLButtonElement>) => {
        spawnRipple(e.currentTarget, e);
        onPointerDown?.(e);
      }}
      {...props}
    >
      <RippleOverlay />
      {children}
    </button>
  );
}

export function RippleLink({
  className,
  children,
  onPointerDown,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn("relative overflow-hidden", className)}
      onPointerDown={(e: PointerEvent<HTMLAnchorElement>) => {
        spawnRipple(e.currentTarget, e);
        onPointerDown?.(e);
      }}
      {...props}
    >
      <RippleOverlay />
      {children}
    </Link>
  );
}
