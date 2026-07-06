"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState, type MouseEvent } from "react";

export type FlowingMenuItem = {
  link: string;
  text: string;
  image: string;
  tagline?: string;
};

type FlowingMenuProps = {
  items: FlowingMenuItem[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
};

export function FlowingMenu({
  items,
  speed = 15,
  textColor = "#fff",
  bgColor = "#120F17",
  marqueeBgColor = "#fff",
  marqueeTextColor = "#120F17",
  borderColor = "#fff"
}: FlowingMenuProps) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            index={idx}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
      </nav>
    </div>
  );
}

type MenuItemProps = FlowingMenuItem & {
  index: number;
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
};

const animationDefaults = { duration: 0.6, ease: "expo" };

const distMetric = (x: number, y: number, x2: number, y2: number) => {
  const dx = x - x2;
  const dy = y - y2;
  return dx * dx + dy * dy;
};

const findClosestEdge = (mx: number, my: number, w: number, h: number) =>
  distMetric(mx, my, w / 2, 0) < distMetric(mx, my, w / 2, h) ? "top" : "bottom";

function MenuItem({
  link,
  text,
  image,
  tagline,
  index,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor
}: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const marqueeInnerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);

  useEffect(() => {
    const calc = () => {
      const part =
        marqueeInnerRef.current?.querySelector<HTMLElement>(".marquee__part");
      if (!part) return;
      const needed = Math.ceil(window.innerWidth / part.offsetWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [text, image]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => {
      const part =
        marqueeInnerRef.current?.querySelector<HTMLElement>(".marquee__part");
      if (!part || part.offsetWidth === 0) return;
      animationRef.current?.kill();
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -part.offsetWidth,
        duration: speed,
        ease: "none",
        repeat: -1
      });
    }, 50);
    return () => {
      clearTimeout(timer);
      animationRef.current?.kill();
    };
  }, [text, image, repetitions, speed]);

  // Hover-driven on pointer devices (slide in from the edge the cursor
  // entered, slide out toward the edge it left); click toggles on touch,
  // where there is no hover.
  const [openMarquee, setOpenMarquee] = useState(false);

  const slideIn = (edge: "top" | "bottom") => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;
    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const slideOut = (edge: "top" | "bottom") => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;
    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  const edgeFromEvent = (ev: MouseEvent<HTMLAnchorElement>) => {
    const rect = itemRef.current?.getBoundingClientRect();
    if (!rect) return "top" as const;
    return findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );
  };

  const hasHover = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  const handleEnter = (ev: MouseEvent<HTMLAnchorElement>) => {
    if (!hasHover()) return;
    slideIn(edgeFromEvent(ev));
    setOpenMarquee(true);
  };

  const handleLeave = (ev: MouseEvent<HTMLAnchorElement>) => {
    if (!hasHover()) return;
    slideOut(edgeFromEvent(ev));
    setOpenMarquee(false);
  };

  const handleToggle = (ev: MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    if (hasHover()) return; // pointer devices morph on hover instead
    const edge = edgeFromEvent(ev);
    if (!openMarquee) slideIn(edge);
    else slideOut(edge);
    setOpenMarquee((v) => !v);
  };

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor }}>
      <span
        aria-hidden
        className="menu__item-num"
        style={{ WebkitTextStrokeColor: textColor }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <a
        className="menu__item-link"
        href={link}
        onClick={handleToggle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-expanded={openMarquee}
        style={{ color: textColor }}
      >
        {text}
      </a>
      <div
        className="marquee"
        ref={marqueeRef}
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {Array.from({ length: repetitions }).map((_, idx) => (
              <div
                className="marquee__part"
                key={idx}
                style={{ color: marqueeTextColor }}
              >
                <span>{tagline ?? text}</span>
                <div
                  className="marquee__img"
                  style={{ backgroundImage: `url(${image})` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
