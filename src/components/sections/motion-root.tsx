"use client";

import {
  LazyMotion,
  domAnimation,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function MotionRoot({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ReactLenis
          root
          options={{ smoothWheel: !reduced, anchors: { offset: -84 } }}
        >
          {children}
        </ReactLenis>
      </MotionConfig>
    </LazyMotion>
  );
}
