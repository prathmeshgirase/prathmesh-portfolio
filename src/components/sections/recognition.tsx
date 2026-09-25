"use client";

import type { CSSProperties } from "react";
import { achievements, education, skills, profile } from "@/data/portfolio";
import { Block, ChoreoGroup, Dealt, Fade, Slide } from "./choreography";
import { Ornament } from "./ornament";

const evidence = [
  {
    project: "EONE",
    metric: "~78",
    label: "REST API endpoints",
    caption: "EONE · built independently",
    rotation: "-5deg",
    y: "10px",
    color: "#35254e",
    aspectRatio: "1/1",
  },
  {
    project: "KitchenaryKart",
    metric: "Live",
    label: "B2B commerce platform",
    caption: "KitchenaryKart · production",
    rotation: "3.5deg",
    y: "-8px",
    color: "#433417",
    aspectRatio: "1/1",
  },
  {
    project: "Hotelic Essentials",
    metric: "500+",
    label: "Android & iOS installs",
    caption: "Hotelic · mobile delivery",
    rotation: "-3deg",
    y: "6px",
    color: "#1c3a2b",
    aspectRatio: "16/9",
  },
];

export function Recognition() {
  return (
    <section
      id="recognition"
      className="relative scroll-mt-24 pb-28 pt-28 md:pb-36 md:pt-36"
    >
      <Ornament
        kind="arc"
        spin="ccw"
        className="right-[10%] top-[22%] hidden w-28 text-accent/15 md:block"
      />
      <Ornament
        kind="cross"
        className="bottom-[12%] right-[6%] hidden w-7 text-fg/12 lg:block"
      />
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10">
        <Block fromY={12}>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
            03 / Recognition
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-fg">
            Proof & recognition
          </h2>
        </Block>
      </div>
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10">
        <ChoreoGroup
          amount={0.3}
          className="mt-14 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14"
        >
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            <div>
              <Slide driven from={{ y: 46 }} duration={0.8}>
                <div className="font-display text-[clamp(2.6rem,6.2vw,4.75rem)] font-bold leading-[0.92] tracking-[-0.045em] text-fg">
                  500+
                </div>
              </Slide>
              <Fade driven delay={0.45}>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  Installs across Android and iOS for{" "}
                  <span className="text-fg">Hotelic Essentials</span> — a mobile
                  product whose complete UI I redesigned and delivered with
                  React Native and Expo.
                </p>
              </Fade>
            </div>
            <div>
              <Slide driven from={{ y: 46 }} duration={0.8} delay={0.12}>
                <div className="font-display text-[clamp(2.6rem,6.2vw,4.75rem)] font-bold leading-[0.92] tracking-[-0.045em] text-fg">
                  2 apps
                </div>
              </Slide>
              <Fade driven delay={0.55}>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  Shipped{" "}
                  <span className="text-fg">production-grade products</span> as
                  a full-stack developer intern — contributing across responsive
                  web interfaces, mobile UI, and API integration.
                </p>
              </Fade>
            </div>
          </div>
          <div className="mt-14 flex justify-center pt-2 lg:mt-0 lg:justify-end">
            {evidence.map((item, index) => (
              <Dealt
                driven
                from={{ y: 34 }}
                delay={0.6 + index * 0.12}
                className={index ? "-ml-7 sm:-ml-8 lg:-ml-9" : ""}
                key={item.project}
              >
                <figure
                  style={
                    { "--r": item.rotation, "--ty": item.y } as CSSProperties
                  }
                  className="w-[7.75rem] shrink-0 rounded-[3px] bg-paper p-2 pb-1 shadow-[0_12px_34px_-10px_rgba(0,0,0,0.65)] ring-1 ring-black/10 transition-transform duration-300 ease-out [transform:rotate(var(--r))_translateY(var(--ty))] hover:z-10 hover:[transform:rotate(0deg)_translateY(-6px)] sm:w-[11rem] lg:w-[12.5rem]"
                >
                  <div
                    className="evidence-print"
                    style={{
                      background: item.color,
                      aspectRatio: item.aspectRatio,
                    }}
                  >
                    <span className="font-mono">{item.project}</span>
                    <strong className="font-display">{item.metric}</strong>
                    <span className="font-mono">{item.label}</span>
                  </div>
                  <figcaption className="mt-2 px-0.5 pb-1 font-mono text-[10px] leading-tight text-ink-soft">
                    {item.caption}
                  </figcaption>
                </figure>
              </Dealt>
            ))}
          </div>
        </ChoreoGroup>
        <div className="mt-20 grid gap-x-20 gap-y-8 border-t border-line pt-14 md:grid-cols-2">
          {achievements.map((achievement, index) => (
            <Slide
              from={{ y: 18 }}
              delay={index * 0.06}
              key={achievement.title}
            >
              <p className="text-[18px] leading-snug text-fg">
                <span className="font-semibold">{achievement.kind}</span> —{" "}
                {achievement.title}
              </p>
              <p className="mt-1.5 text-[14.5px] text-faint">
                {achievement.organization}
                {achievement.year && ` · ${achievement.year}`}
              </p>
            </Slide>
          ))}
        </div>
        <div
          id="foundations"
          className="mt-20 grid scroll-mt-24 gap-14 border-t border-line pt-14 md:grid-cols-3"
        >
          <Slide from={{ y: 20 }}>
            <h3 className="text-[16.5px] font-semibold text-fg">Education</h3>
            <div className="mt-5 grid gap-5">
              {education.map((item) => (
                <div key={item.degree}>
                  <div className="text-[15.5px] leading-snug text-fg">
                    {item.degree}
                  </div>
                  <div className="mt-1 text-[14px] text-faint">
                    {item.school}
                  </div>
                  <div className="mt-1 font-mono text-[14px] text-accent">
                    {item.score}{" "}
                    <span className="text-[10.5px] text-dim">CGPA / 10</span>
                  </div>
                  <p className="mt-1 text-[14px] text-faint">{item.period}</p>
                </div>
              ))}
            </div>
          </Slide>
          <Slide from={{ y: 20 }} delay={0.08}>
            <h3 className="text-[16.5px] font-semibold text-fg">Stack</h3>
            <div className="mt-5 grid gap-3.5">
              {skills.map((skill) => (
                <p
                  className="text-[15.5px] leading-relaxed text-muted"
                  key={skill.category}
                >
                  <span className="font-semibold text-fg">
                    {skill.category}.
                  </span>{" "}
                  {skill.items}
                </p>
              ))}
            </div>
          </Slide>
          <Slide from={{ y: 20 }} delay={0.16}>
            <h3 className="text-[16.5px] font-semibold text-fg">
              Learning & practice
            </h3>
            <ul className="mt-5 grid gap-2.5">
              <li className="text-[15px] leading-snug text-fg">
                AI Model Training Workshop{" "}
                <span className="text-dim">
                  — Fergusson College × Chainworks Digital, 2025
                </span>
              </li>
              <li className="text-[15px] leading-snug text-fg">
                APGI Hackathon <span className="text-dim">— Participant</span>
              </li>
            </ul>
            <div className="mt-6">
              <div className="text-[15.5px] leading-snug text-fg">
                Full-stack development, end to end.
              </div>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
                {profile.summary}
              </p>
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
}
