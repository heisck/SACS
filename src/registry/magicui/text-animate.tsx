"use client";

/* eslint-disable react-hooks/static-components -- vendored MagicUI component renders a polymorphic, memoized motion element */

import { AnimatePresence, motion, type MotionProps, type Variants } from "motion/react";
import { useMemo, type ElementType } from "react";
import { cn } from "@/lib/cn";

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

interface TextAnimateProps extends Omit<MotionProps, "children"> {
  children: string;
  className?: string;
  segmentClassName?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  as?: ElementType;
  by?: AnimationType;
  startOnView?: boolean;
  once?: boolean;
  animation?: AnimationVariant;
}

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06
};

const itemVariantsByAnimation = (
  animation: AnimationVariant,
  duration: number
): Variants => {
  const t = { duration };
  switch (animation) {
    case "blurIn":
      return {
        hidden: { opacity: 0, filter: "blur(10px)" },
        show: { opacity: 1, filter: "blur(0px)", transition: t },
        exit: { opacity: 0, filter: "blur(10px)", transition: t }
      };
    case "blurInUp":
      return {
        hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
        show: { opacity: 1, filter: "blur(0px)", y: 0, transition: t },
        exit: { opacity: 0, filter: "blur(10px)", y: 20, transition: t }
      };
    case "blurInDown":
      return {
        hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
        show: { opacity: 1, filter: "blur(0px)", y: 0, transition: t }
      };
    case "slideUp":
      return {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: t },
        exit: { y: -20, opacity: 0, transition: t }
      };
    case "slideDown":
      return {
        hidden: { y: -20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: t }
      };
    case "slideLeft":
      return {
        hidden: { x: 20, opacity: 0 },
        show: { x: 0, opacity: 1, transition: t }
      };
    case "slideRight":
      return {
        hidden: { x: -20, opacity: 0 },
        show: { x: 0, opacity: 1, transition: t }
      };
    case "scaleUp":
      return {
        hidden: { scale: 0.5, opacity: 0 },
        show: { scale: 1, opacity: 1, transition: t }
      };
    case "scaleDown":
      return {
        hidden: { scale: 1.5, opacity: 0 },
        show: { scale: 1, opacity: 1, transition: t }
      };
    case "fadeIn":
    default:
      return {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: t },
        exit: { opacity: 0, y: 20, transition: t }
      };
  }
};

export function TextAnimate({
  children,
  delay = 0,
  duration = 0.3,
  variants,
  className,
  segmentClassName,
  as: Component = "p",
  startOnView = true,
  once = false,
  by = "word",
  animation = "fadeIn",
  ...props
}: TextAnimateProps) {
  const MotionComponent = useMemo(() => motion.create(Component), [Component]);

  let segments: string[] = [];
  switch (by) {
    case "word":
      segments = children.split(/(\s+)/);
      break;
    case "character":
      segments = [...children];
      break;
    case "line":
      segments = children.split("\n");
      break;
    default:
      segments = [children];
  }

  const item = variants ?? itemVariantsByAnimation(animation, duration);
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren: delay, staggerChildren: staggerTimings[by] }
    },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        variants={container}
        initial="hidden"
        whileInView={startOnView ? "show" : undefined}
        animate={startOnView ? undefined : "show"}
        exit="exit"
        viewport={{ once }}
        className={cn("whitespace-pre-wrap", className)}
        {...props}
      >
        {segments.map((segment, i) => (
          <motion.span
            key={`${by}-${i}-${segment}`}
            variants={item}
            className={cn(
              by === "line" ? "block" : "inline-block whitespace-pre",
              segmentClassName
            )}
          >
            {segment}
          </motion.span>
        ))}
      </MotionComponent>
    </AnimatePresence>
  );
}
