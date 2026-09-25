"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

// Shared motion configuration, timings, keyframes, easings, viewport thresholds,
// and stagger intervals for consistent animations across portfolio sections.
export const LEAN_SPRING = { stiffness: 220, damping: 28, mass: 1 };
export const PARALLAX = { slow: -28, medium: -48, fast: -72 };
export const STAGGER = { word: 0.07, tag: 0.05, row: 0.08 };
export const VIEWPORT_ONCE = { once: true, amount: 0.35 };
export const VIEWPORT_GROUP = { once: true, amount: 0.25 };
const GLIDE = [0.16, 1, 0.3, 1] as const;
const FLICK = [0.68, 0, 0.1, 1] as const;
const WIPE = [0.4, 0, 0.28, 1] as const;

type Offset = { x?: number; y?: number; rotate?: number };
type BaseProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  driven?: boolean;
};
type MoveProps = BaseProps & {
  fromY?: number;
  from?: Offset;
  duration?: number;
};

export function dealVariants(from: Offset = {}, settle = 0): Variants {
  const { x = 90, y = -110, rotate = 8 } = from;
  return {
    hidden: { opacity: 0, x, y, rotate, scale: 1.07 },
    visible: (delay = 0) => ({
      opacity: [0, 1, 1, 1],
      x: [x, -4, 2, 0],
      y: [y, 5, -2, 0],
      rotate: [rotate, settle - 2.5, settle + 0.8, settle],
      scale: [1.07, 0.995, 1, 1],
      transition: {
        duration: 0.95,
        times: [0, 0.55, 0.78, 1],
        ease: "easeOut",
        delay,
      },
    }),
  };
}
export const wordDropVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay = 0) => ({
    opacity: [0, 1, 1],
    y: [26, -5, 0],
    transition: { duration: 0.6, times: [0, 0.65, 1], ease: "easeOut", delay },
  }),
};
export function blockDropVariants(fromY = 16, duration = 0.5): Variants {
  return {
    hidden: { opacity: 0, y: fromY },
    visible: (delay = 0) => ({
      opacity: [0, 1, 1],
      y: [fromY, -0.18 * fromY, 0],
      transition: { duration, times: [0, 0.7, 1], ease: "easeOut", delay },
    }),
  };
}
export function slideInVariants(from: Offset = {}, duration = 0.5): Variants {
  const { x = 0, y = 16 } = from;
  return {
    hidden: { opacity: 0, x, y },
    visible: (delay = 0) => ({
      opacity: [0, 1, 1],
      x: [x, -0.18 * x, 0],
      y: [y, -0.18 * y, 0],
      transition: { duration, times: [0, 0.7, 1], ease: "easeOut", delay },
    }),
  };
}
export const tagFlickVariants: Variants = {
  hidden: { opacity: 0, y: 10, rotate: 4, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: [0, 1, 1],
    y: [10, -2, 0],
    rotate: [4, -1, 0],
    scale: [0.85, 1.02, 1],
    transition: { duration: 0.38, times: [0, 0.7, 1], ease: "easeOut", delay },
  }),
};
export const stampVariants: Variants = {
  hidden: { opacity: 0, scale: 1.45, rotate: -6 },
  visible: (delay = 0) => ({
    opacity: [0, 1, 1],
    scale: [1.45, 0.96, 1],
    rotate: [-6, -0.3, -1],
    transition: { duration: 0.42, times: [0, 0.6, 1], ease: "easeOut", delay },
  }),
};
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: GLIDE, delay },
  }),
};
export const maskRiseVariants: Variants = {
  hidden: { y: "110%", skewX: -35, opacity: 0 },
  visible: (delay = 0) => ({
    y: "0%",
    skewX: 0,
    opacity: 1,
    transition: { duration: 1.15, ease: FLICK, delay },
  }),
};
export const clipRevealVariants: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", scale: 1.07 },
  visible: (delay = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1.25, ease: WIPE, delay },
  }),
};
export function drawVariants(axis: "x" | "y" = "x"): Variants {
  return axis === "x"
    ? {
        hidden: { scaleX: 0 },
        visible: (delay = 0) => ({
          scaleX: 1,
          transition: { duration: 0.8, ease: GLIDE, delay },
        }),
      }
    : {
        hidden: { scaleY: 0 },
        visible: (delay = 0) => ({
          scaleY: 1,
          transition: { duration: 0.8, ease: GLIDE, delay },
        }),
      };
}
const playback = (driven?: boolean) =>
  driven
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: VIEWPORT_ONCE };

export function ChoreoGroup({
  children,
  className,
  mode = "view",
  amount = VIEWPORT_GROUP.amount,
}: BaseProps & { mode?: "view" | "mount"; amount?: number }) {
  return (
    <m.div
      className={className}
      {...(mode === "mount"
        ? { initial: "hidden", animate: "visible" }
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount },
          })}
    >
      {children}
    </m.div>
  );
}
export function Block({
  children,
  className,
  fromY = 16,
  duration,
  delay = 0,
  driven,
}: MoveProps) {
  return (
    <m.div
      className={className}
      variants={blockDropVariants(fromY, duration)}
      custom={delay}
      {...playback(driven)}
    >
      {children}
    </m.div>
  );
}
export function Slide({
  children,
  className,
  from,
  duration,
  delay = 0,
  driven,
}: MoveProps) {
  return (
    <m.div
      className={className}
      variants={slideInVariants(from, duration)}
      custom={delay}
      {...playback(driven)}
    >
      {children}
    </m.div>
  );
}
export function Fade({
  children,
  className,
  delay = 0,
  driven,
  inline,
}: BaseProps & { inline?: boolean }) {
  const Element = inline ? m.span : m.div;
  return (
    <Element
      className={className}
      variants={fadeVariants}
      custom={delay}
      {...playback(driven)}
    >
      {children}
    </Element>
  );
}
export function Dealt({
  children,
  className,
  from,
  settle = 0,
  delay = 0,
  driven,
}: MoveProps & { settle?: number }) {
  return (
    <m.div
      className={className}
      variants={dealVariants(from, settle)}
      custom={delay}
      {...playback(driven)}
    >
      {children}
    </m.div>
  );
}
export function ClipReveal({
  children,
  className,
  delay = 0,
  driven,
}: BaseProps) {
  return (
    <m.div
      className={className}
      variants={clipRevealVariants}
      custom={delay}
      {...playback(driven)}
    >
      {children}
    </m.div>
  );
}
export function MaskedLine({
  children,
  className = "",
  innerClassName = "",
  delay = 0,
  driven,
}: BaseProps & { innerClassName?: string }) {
  return (
    <span
      className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}
    >
      <m.span
        className={`block origin-bottom-left ${innerClassName}`}
        variants={maskRiseVariants}
        custom={delay}
        {...playback(driven)}
      >
        {children}
      </m.span>
    </span>
  );
}
export function Words({
  segments,
  className,
  baseDelay = 0,
  stagger = STAGGER.word,
  driven,
}: {
  segments: { text: string; className?: string }[];
  className?: string;
  baseDelay?: number;
  stagger?: number;
  driven?: boolean;
}) {
  let wordIndex = 0;
  return (
    <span className={className}>
      <span className="sr-only">
        {segments.map((segment) => segment.text).join("")}
      </span>
      <span aria-hidden="true">
        {segments.map((segment, index) => (
          <span className={segment.className} key={index}>
            {segment.text.split(/(\s+)/).map((word, index) =>
              word.trim() === "" ? (
                word
              ) : (
                <m.span
                  className="inline-block"
                  variants={wordDropVariants}
                  custom={baseDelay + wordIndex++ * stagger}
                  {...playback(driven)}
                  key={index}
                >
                  {word}
                </m.span>
              ),
            )}
          </span>
        ))}
      </span>
    </span>
  );
}
export function Flick({
  children,
  className = "",
  delay = 0,
  driven,
}: BaseProps) {
  return (
    <m.span
      className={`inline-block ${className}`}
      variants={tagFlickVariants}
      custom={delay}
      {...playback(driven)}
    >
      {children}
    </m.span>
  );
}
export function Stamp({
  children,
  className = "",
  delay = 0,
  driven,
}: BaseProps) {
  return (
    <m.span
      className={`inline-block origin-center ${className}`}
      variants={stampVariants}
      custom={delay}
      {...playback(driven)}
    >
      {children}
    </m.span>
  );
}
export function DrawRule({
  className,
  axis = "x",
  delay = 0,
  driven,
}: BaseProps & { axis?: "x" | "y" }) {
  return (
    <m.div
      aria-hidden="true"
      className={className}
      style={{ transformOrigin: axis === "x" ? "left center" : "center top" }}
      variants={drawVariants(axis)}
      custom={delay}
      {...playback(driven)}
    />
  );
}
