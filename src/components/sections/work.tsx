"use client";

import { Fragment, useRef, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { projects, profile, type Project } from "@/data/portfolio";
import { Block, ChoreoGroup, ClipReveal, Fade, MaskedLine, Words } from "./choreography";
import { Ornament } from "./ornament";

interface RollingTextProps {
  text: string;
  className?: string;
}

function RollingText({ text, className = "" }: RollingTextProps) {
  const letters = text.split("");

  const renderLayer = (layerClass: string, isAriaHidden: boolean) => (
    <span className={`roll-layer ${layerClass}`} aria-hidden={isAriaHidden || undefined}>
      {letters.map((char, idx) => (
        <span
          key={idx}
          className="rc"
          style={{ transitionDelay: `${20 * idx}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );

  return (
    <span className={`roll ${className}`}>
      {renderLayer("roll-l1", false)}
      {renderLayer("roll-l2", true)}
    </span>
  );
}

interface SectionHeadingProps {
  index: string;
  title?: string;
  srTitle?: string;
  tone?: "paper" | "dark";
}

function SectionHeading({
  index,
  title,
  srTitle,
  tone = "paper",
}: SectionHeadingProps) {
  const isPaper = tone === "paper";

  return (
    <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10">
      <Block fromY={12}>
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
            isPaper ? "text-ink-dim" : "text-dim"
          }`}
        >
          {index}
        </p>
        {title ? (
          <h2
            className={`mt-3 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.03em] ${
              isPaper ? "text-ink" : "text-fg"
            }`}
          >
            {title}
          </h2>
        ) : srTitle ? (
          <h2 className="sr-only">{srTitle}</h2>
        ) : null}
      </Block>
    </div>
  );
}

function ActivityPreview() {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/9]"
      style={{
        background: "linear-gradient(160deg, #131f19, #0f1612 65%, #11150f)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(110,231,183,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.25) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <svg
        className="pv-breathe absolute inset-x-[8%] bottom-[16%] h-[55%] w-[84%]"
        viewBox="0 0 400 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,130 C50,120 80,70 130,75 C180,80 200,30 260,38 C320,46 350,90 400,60 L400,160 L0,160 Z"
          fill="rgba(224,106,64,0.16)"
        />
        <path
          d="M0,130 C50,120 80,70 130,75 C180,80 200,30 260,38 C320,46 350,90 400,60"
          fill="none"
          stroke="#e06a40"
          strokeWidth="2"
        />
        <path
          d="M0,145 C60,140 100,110 150,112 C210,115 240,80 300,86 C340,90 370,110 400,98"
          fill="none"
          stroke="#6ee7b7"
          strokeWidth="2"
          strokeDasharray="1 0"
          opacity="0.85"
        />
        <line
          x1="260"
          y1="20"
          x2="260"
          y2="160"
          stroke="rgba(240,231,221,0.25)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
      </svg>
      <div className="pv-pulse absolute left-[58%] top-[17%] rounded-md border border-system/40 bg-[#101a14]/90 px-2.5 py-1.5 font-mono text-[10px] text-system shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
        500+ installs
      </div>
      <div className="absolute left-[8%] top-[19%] grid gap-1.5 font-mono text-[9.5px] text-fg/45">
        <span>▸ platform · Android</span>
        <span>▸ platform · iOS</span>
        <span className="text-accent/80">▸ React Native · Expo</span>
      </div>
      <div className="absolute bottom-[6%] left-[8%] font-mono text-[9px] uppercase tracking-[0.14em] text-fg/30">
        cross-platform mobile delivery
      </div>
    </div>
  );
}

interface MetricPreviewProps {
  rgb: string;
  bg: string;
  hero: string;
  heroUnit: string;
  sub: string;
  specs: Project["specs"];
}

function MetricPreview({
  rgb,
  bg,
  hero,
  heroUnit,
  sub,
  specs,
}: MetricPreviewProps) {
  return (
    <div
      className="relative flex w-full flex-col justify-center overflow-hidden px-7 pb-10 pt-16 md:aspect-[16/9] md:flex-row md:items-center md:px-12 md:py-0"
      style={{ background: bg }}
    >
      <div className="md:flex-1 md:pr-10">
        <div
          className="font-display text-[clamp(2rem,6vw,3.6rem)] font-bold leading-[0.95]"
          style={{ color: `rgb(${rgb})` }}
        >
          {hero}
        </div>
        <div className="mt-3.5 font-mono text-[11px] text-fg/50">{heroUnit}</div>
        <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg/40">
          {sub}
        </div>
      </div>
      <div className="mt-7 grid grid-cols-[max-content_1fr] gap-x-5 gap-y-3 border-t border-line pt-6 font-mono text-[10px] leading-relaxed md:mt-0 md:flex-1 md:border-l md:border-t-0 md:pl-10 md:pt-0 md:text-[9.5px]">
        {specs.map((item) => (
          <Fragment key={item.label}>
            <span className="text-fg/45">{item.label}</span>
            <span
              className={item.accent ? undefined : "text-fg/65"}
              style={item.accent ? { color: `rgba(${rgb},0.9)` } : undefined}
            >
              {item.value}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  if (project.presentation.previewType === "activity") {
    return <ActivityPreview />;
  }

  return (
    <MetricPreview
      rgb={project.presentation.rgb}
      bg={project.presentation.bg}
      hero={project.metric}
      heroUnit={project.metricLabel}
      sub={project.status}
      specs={project.specs}
    />
  );
}

const TILT_SPRING = {
  stiffness: 220,
  damping: 26,
};

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

function TiltCard({ children, className, max = 5 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const rotateX = useSpring(targetX, TILT_SPRING);
  const rotateY = useSpring(targetY, TILT_SPRING);

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType !== "mouse") return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    targetY.set(normX * max * 2);
    targetX.set(-normY * max * 2);
  };

  const handlePointerLeave = () => {
    targetX.set(0);
    targetY.set(0);
  };

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ perspective: 900 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <m.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </m.div>
    </div>
  );
}

interface FeaturedProjectProps {
  project: Project;
  num: string;
  index: number;
}

function FeaturedProject({ project, num, index }: FeaturedProjectProps) {
  const projectRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: ["start end", "end start"],
  });

  const isEven = index % 2 === 0;
  const { presentation } = project;

  const panelDrift = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const previewDrift = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const titleDrift = useTransform(
    scrollYProgress,
    [0, 1],
    isEven ? [40, -80] : [-80, 40],
  );

  return (
    <ChoreoGroup
      amount={0.15}
      className="mt-24 first:mt-4 md:mt-12 md:first:mt-4"
    >
      <div
        ref={projectRef}
        className="relative flex w-full flex-col overflow-hidden md:min-h-[88vh]"
      >
        <m.div
          aria-hidden={true}
          style={{
            y: panelDrift,
            background: presentation.panelColor,
          }}
          className={`absolute -inset-y-[6%] hidden w-[34%] md:block ${
            isEven ? "left-[44%]" : "right-[44%]"
          }`}
        />
        <div
          aria-hidden={true}
          className={`absolute top-[3%] aspect-square w-[64%] rounded-full border md:top-[6%] md:w-[42%] ${
            isEven
              ? "-right-[16%] md:-right-[8%]"
              : "-left-[16%] md:-left-[8%]"
          }`}
          style={{ borderColor: presentation.lineColor }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[88rem] flex-1 px-6 pt-8 sm:px-10 md:pt-10">
          <div className={`max-w-sm ${isEven ? "" : "ml-auto text-right"}`}>
            <Fade driven delay={0.05}>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent md:hidden">
                {presentation.heroWord}
              </p>
            </Fade>

            <Words
              driven
              baseDelay={0.1}
              className="block font-display text-[clamp(2.6rem,12vw,3.4rem)] font-bold leading-[1.0] tracking-[-0.03em] sm:text-[clamp(1.5rem,2.2vw,2rem)] sm:font-semibold sm:leading-normal sm:tracking-[-0.02em]"
              segments={[{ text: project.name }]}
            />

            {presentation.descPoints ? (
              <ul className="mt-6 grid gap-2 sm:mt-4">
                {presentation.descPoints.map((point, pointIndex) => (
                  <li
                    key={point}
                    className={`flex items-start gap-2.5 text-[16px] leading-snug text-fg/85 ${
                      isEven ? "" : "flex-row-reverse text-right"
                    }`}
                  >
                    <span
                      aria-hidden={true}
                      className="mt-[0.5em] block h-1 w-1 shrink-0 rounded-full bg-accent"
                    />
                    <Fade inline driven delay={0.2 + 0.08 * pointIndex}>
                      {point}
                    </Fade>
                  </li>
                ))}
              </ul>
            ) : (
              <Fade driven delay={0.2}>
                <p className="mt-6 text-[17px] leading-relaxed text-fg/85 sm:mt-4">
                  {project.description}
                </p>
              </Fade>
            )}

            {presentation.disclosure && (
              <Fade driven delay={0.28}>
                <p className="mt-3 flex items-start gap-1.5 font-mono text-[11px] leading-relaxed text-faint">
                  <span aria-hidden={true} className="text-accent">
                    ▸
                  </span>
                  <span>{presentation.disclosure}</span>
                </p>
              </Fade>
            )}

            <Fade driven delay={0.3}>
              <p className="mt-3 font-mono text-[13px] leading-relaxed tracking-wide text-muted">
                {project.stack.join("  ·  ")}
              </p>
            </Fade>

            {presentation.aspects.length > 0 && (
              <ul className="mt-4 grid gap-1 text-[13.5px] leading-relaxed text-faint">
                {presentation.aspects.map((aspect, aspectIndex) => (
                  <li key={aspect}>
                    <Fade inline driven delay={0.4 + 0.09 * aspectIndex}>
                      {aspect}
                    </Fade>
                  </li>
                ))}
              </ul>
            )}

            {project.link && (
              <Fade driven delay={0.6}>
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-fg"
                >
                  <RollingText text={project.link.label.toLowerCase()} />
                  {" ↗"}
                </a>
              </Fade>
            )}
          </div>

          <m.div
            style={{ y: previewDrift }}
            className={`relative mt-10 w-full max-w-[640px] md:absolute md:top-[12%] md:mt-0 md:w-[46%] ${
              isEven ? "md:right-[5%]" : "md:left-[5%]"
            }`}
          >
            <div className="group relative block">
              <div
                className="motion-drift"
                style={
                  {
                    "--drift-dur": "9s",
                    "--drift-delay": "2.4s",
                  } as React.CSSProperties
                }
              >
                <TiltCard max={4}>
                  <ClipReveal
                    driven
                    delay={0.3}
                    className="relative overflow-hidden rounded-2xl border border-line-strong shadow-[inset_0_1px_0_rgba(240,231,221,0.10),0_40px_80px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[inset_0_1px_0_rgba(240,231,221,0.16),0_56px_110px_rgba(0,0,0,0.6)]"
                  >
                    <div className="ease-glide scale-[1.08] transition-transform duration-[900ms] group-hover:scale-[1.13]">
                      <ProjectPreview project={project} />
                    </div>
                    <div className="pointer-events-none absolute inset-x-5 top-4 z-10 flex justify-between font-mono text-[10px] text-fg/50">
                      <span>▸ {project.id}</span>
                      <span>fig. {num}</span>
                    </div>
                  </ClipReveal>
                </TiltCard>
              </div>
            </div>
          </m.div>
        </div>

        <m.div
          style={{ x: titleDrift }}
          className="pointer-events-none relative z-[5] hidden md:-mt-[7vw] md:block"
        >
          <div className="-mb-[0.18em]">
            <MaskedLine driven delay={0.4} className="pl-[3%]">
              <span className="block whitespace-nowrap font-display text-[clamp(7rem,17vw,16.5rem)] font-bold leading-[0.82] tracking-[-0.045em] text-fg [zoom:0.909]">
                {presentation.heroWord}
              </span>
            </MaskedLine>
          </div>
        </m.div>
      </div>
    </ChoreoGroup>
  );
}

export function Work() {
  return (
    <section id="work" className="relative scroll-mt-24 pt-8 md:pt-12">
      <Ornament
        kind="reg"
        spin="cw"
        className="right-[7%] top-24 hidden w-16 text-fg/10 md:block"
      />
      <SectionHeading tone="dark" index="01 / Work" srTitle="Work" />

      <div>
        {projects.map((project, index) => (
          <Fragment key={project.id}>
            {index > 0 && (
              <div
                aria-hidden={true}
                className="mx-auto w-full max-w-[88rem] px-6 sm:px-10"
              >
                <div className="border-t border-line" />
              </div>
            )}
            <FeaturedProject
              project={project}
              num={String(index + 1).padStart(2, "0")}
              index={index}
            />
          </Fragment>
        ))}
      </div>

      <ChoreoGroup
        amount={0.1}
        className="mx-auto mt-24 w-full max-w-[88rem] px-6 sm:px-10"
      >
        <Block driven fromY={10} delay={0}>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-dim">
            — more on github
          </p>
        </Block>

        <Block driven fromY={10} delay={0.1}>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 border-t border-line px-2 py-6 transition-colors duration-300 hover:bg-surface-2/60 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
          >
            <span className="text-[15px] leading-relaxed text-muted">
              Plenty more where these came from — side projects, experiments, and the odd 3am commit.
            </span>
            <span className="ease-flick inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-faint transition-all duration-300 group-hover:translate-x-[6px] group-hover:text-accent">
              <RollingText text="all of it on github" />
              {" ↗"}
            </span>
          </a>
        </Block>
      </ChoreoGroup>
    </section>
  );
}
