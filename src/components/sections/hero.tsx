"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { profile, heroArtifacts } from "@/data/portfolio";
import {
  Block,
  ChoreoGroup,
  Dealt,
  Fade,
  LEAN_SPRING,
  PARALLAX,
  Words,
} from "./choreography";
import { Ornament } from "./ornament";

interface PointerContextType {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

const PointerContext = createContext<PointerContextType | null>(null);

interface PointerFieldProps {
  children: ReactNode;
  className?: string;
}

function PointerField({ children, className }: PointerFieldProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const fieldRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={fieldRef}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <PointerContext.Provider value={{ x: pointerX, y: pointerY }}>
        {children}
      </PointerContext.Provider>
    </div>
  );
}

const REDUCED_SPRING = {
  stiffness: 1000,
  damping: 100,
};

interface PointerLeanProps {
  factor?: number;
  className?: string;
  children: ReactNode;
}

function PointerLean({ factor = 10, className, children }: PointerLeanProps) {
  const pointer = useContext(PointerContext);
  const reducedMotion = useReducedMotion();
  const fallback = useMotionValue(0);

  const x = pointer?.x ?? fallback;
  const y = pointer?.y ?? fallback;

  const springConfig = reducedMotion ? REDUCED_SPRING : LEAN_SPRING;
  const springX = useSpring(
    useTransform(x, (t) => t * factor),
    springConfig,
  );
  const springY = useSpring(
    useTransform(y, (t) => t * factor * 0.7),
    springConfig,
  );

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div className={className} style={{ x: springX, y: springY }}>
      {children}
    </m.div>
  );
}

interface GhostLettersProps {
  children: ReactNode;
  className?: string;
  drift?: number;
}

function GhostLetters({
  children,
  className = "",
  drift = 60,
}: GhostLettersProps) {
  const lettersRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lettersRef,
    offset: ["start end", "end start"],
  });
  const offset = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <div
      ref={lettersRef}
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 select-none ${className}`}
    >
      <m.div
        style={{ y: offset }}
        className="font-display font-bold leading-none tracking-[-0.06em] text-fg/[0.04]"
      >
        {children}
      </m.div>
    </div>
  );
}

export function Hero() {
  const { npm, award, scale } = heroArtifacts;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const fastDrift = useTransform(scrollYProgress, [0, 1], [0, PARALLAX.fast]);
  const mediumDrift = useTransform(
    scrollYProgress,
    [0, 1],
    [0, PARALLAX.medium],
  );
  const slowDrift = useTransform(scrollYProgress, [0, 1], [0, PARALLAX.slow]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative mx-auto flex min-h-[94vh] w-full max-w-[88rem] flex-col justify-start px-6 pb-10 pt-24 sm:px-10 md:justify-center md:pt-28"
    >
      <GhostLetters
        className="-left-8 bottom-[-2rem] text-[clamp(8rem,18vw,14rem)]"
        drift={40}
      >
        {"PG"}
      </GhostLetters>

      <Ornament
        kind="arc"
        spin="ccw"
        className="right-[4%] top-12 w-14 text-system/25 md:right-[30%] md:top-28 md:w-24"
      />
      <Ornament
        kind="cross"
        className="bottom-[22%] left-[4%] hidden w-8 text-fg/15 md:block"
      />

      <ChoreoGroup mode="mount">
        <Block
          driven
          fromY={-18}
          delay={0.05}
          className="absolute left-3 top-32 hidden md:block"
        >
          <p className="font-mono text-xs tracking-[0.16em] text-accent [writing-mode:vertical-rl]">
            {profile.kicker}
          </p>
        </Block>

        <Block driven fromY={10} delay={0.05} className="md:hidden">
          <p className="font-mono text-[13px] text-accent">{profile.kicker}</p>
        </Block>

        <div className="relative">
          <h1 className="relative z-10 mt-3 font-display text-[clamp(1.9rem,5.4vw,4.6rem)] font-semibold leading-[1.0] tracking-[-0.04em] md:mt-0 md:max-w-[58%] md:pl-14">
            <Words
              driven
              baseDelay={0.1}
              segments={[
                { text: `${profile.headline.start} ` },
                {
                  text: profile.headline.accent,
                  className: "font-serif text-[1.08em] italic text-accent",
                },
                { text: ` ${profile.headline.end}` },
              ]}
            />
          </h1>

          <Block driven fromY={12} delay={1.05} className="md:pl-14">
            <div className="mt-8 flex flex-wrap items-center gap-2.5 md:mt-9 md:gap-4">
              <a
                href="#work"
                className="group whitespace-nowrap rounded-full bg-accent px-4 py-2.5 text-[13px] font-semibold text-[#1a120c] transition-[background-color,transform] duration-200 hover:bg-accent/90 active:scale-[0.98] sm:px-5"
              >
                View the work{" "}
                <span className="ease-flick inline-block transition-transform duration-300 group-hover:translate-y-[3px]">
                  ↓
                </span>
              </a>
              <a
                href="#contact"
                className="whitespace-nowrap rounded-full border border-line-strong px-4 py-2.5 text-[13px] text-muted transition-colors hover:border-faint hover:text-fg sm:px-5"
              >
                Get in touch
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-faint hover:text-fg"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px]"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
                </svg>
              </a>
            </div>
          </Block>

          <PointerField className="relative z-20 mt-12 w-full max-w-[400px] md:absolute md:-right-14 md:top-[8%] md:mt-0 md:w-[580px] md:max-w-none lg:-right-20">
            <m.div style={{ y: fastDrift }}>
              <Dealt
                driven
                delay={0.45}
                from={{ x: 90, y: -110, rotate: 8 }}
                settle={-3}
              >
                <div
                  className="motion-drift"
                  style={
                    {
                      "--drift-dur": "7s",
                      "--drift-delay": "1.6s",
                    } as React.CSSProperties
                  }
                >
                  <PointerLean factor={10}>
                    <div className="w-[92%] rounded-xl border border-line-strong bg-surface p-5 shadow-[0_18px_40px_rgba(0,0,0,0.45)] md:w-[410px] md:p-6">
                      <div className="font-mono text-[11px] text-faint md:text-xs">
                        {"▸ "}
                        {scale.tag}
                      </div>
                      <div className="mt-2 font-display text-2xl font-bold tracking-tight md:text-4xl">
                        {scale.value}
                        <span className="ml-2 font-mono text-xs font-medium text-system">
                          {scale.unit}
                        </span>
                      </div>
                      <div className="mt-3 max-w-[15rem] font-mono text-[10px] leading-relaxed text-dim md:mt-4 md:text-[11px]">
                        {scale.note}
                      </div>
                    </div>
                  </PointerLean>
                </div>
              </Dealt>
            </m.div>

            <m.div style={{ y: mediumDrift }} className="md:mr-0">
              <Dealt
                driven
                delay={0.63}
                from={{ x: 70, y: 90, rotate: -7 }}
                settle={2.5}
              >
                <div
                  className="motion-drift -mt-3 ml-auto w-[88%] md:-mt-6 md:ml-40 md:w-[340px]"
                  style={
                    {
                      "--drift-dur": "9s",
                      "--drift-delay": "1.9s",
                    } as React.CSSProperties
                  }
                >
                  <PointerLean factor={-6}>
                    <div
                      className="rounded-xl border border-accent-soft p-5 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                      style={{
                        background:
                          "linear-gradient(160deg, #241b10, #1c150d)",
                      }}
                    >
                      <div className="font-mono text-[10px] tracking-[0.1em] text-gold md:text-[11px]">
                        {"★ "}
                        {award.seal}
                      </div>
                      <div className="mt-1.5 font-serif text-lg italic leading-tight md:text-2xl">
                        {award.title}
                      </div>
                      <div className="mt-2 font-mono text-[11px] text-faint">
                        {award.by}
                      </div>
                    </div>
                  </PointerLean>
                </div>
              </Dealt>
            </m.div>

            <m.div style={{ y: slowDrift }}>
              <Dealt
                driven
                delay={0.78}
                from={{ x: -80, y: 70, rotate: 6 }}
                settle={-1}
              >
                <div
                  className="motion-drift -mt-3 ml-[8%] mr-auto w-[90%] md:-mt-4 md:ml-2 md:mr-0 md:w-[300px]"
                  style={
                    {
                      "--drift-dur": "8s",
                      "--drift-delay": "2.2s",
                    } as React.CSSProperties
                  }
                >
                  <PointerLean factor={7}>
                    <div className="rounded-xl border border-line-strong bg-surface p-5 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
                      <div className="font-mono text-[10px] text-faint md:text-[11px]">
                        {"▸ "}
                        {npm.pkg}
                      </div>
                      <div className="mt-1.5 font-display text-lg font-bold tracking-tight md:text-2xl">
                        {npm.downloads}
                      </div>
                      <div className="-mt-0.5 font-mono text-[10px] text-system">
                        {npm.unit}
                      </div>
                      <div className="mt-2.5 flex h-6 items-end gap-1 md:h-8">
                        {[40, 55, 48, 70, 62, 85, 100].map((height, idx) => (
                          <span
                            key={idx}
                            className="flex-1 rounded-sm bg-accent/55"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                      <div className="mt-2 font-mono text-[10px] text-dim">
                        {npm.note}
                      </div>
                    </div>
                  </PointerLean>
                </div>
              </Dealt>
            </m.div>
          </PointerField>
        </div>

        <Block driven delay={0.85} className="md:max-w-[60%] md:pl-14">
          <p className="mt-10 font-serif text-[clamp(1.15rem,1.7vw,1.5rem)] italic leading-relaxed text-fg/90 md:mt-12">
            {profile.introduction.start}{" "}
            <Fade inline driven delay={1.35}>
              <span className="text-accent">
                {profile.introduction.accent}
              </span>
            </Fade>{" "}
            {profile.introduction.end}
          </p>
        </Block>

        <Fade driven delay={1.7}>
          <a
            href="#work"
            aria-label="Scroll to the work"
            className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 md:flex"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-dim transition-colors duration-300 group-hover:text-accent">
              scroll
            </span>
            <span className="flex h-9 w-[22px] justify-center rounded-full border border-line-strong pt-2 transition-colors duration-300 group-hover:border-accent/60">
              <span className="scroll-cue h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          </a>
        </Fade>
      </ChoreoGroup>
    </section>
  );
}
