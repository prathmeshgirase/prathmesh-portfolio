"use client";

import { profile } from "@/data/portfolio";
import { Block, ChoreoGroup, Fade, Words } from "./choreography";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto flex min-h-[82vh] w-full max-w-6xl scroll-mt-20 flex-col justify-center px-6 py-24 sm:px-10"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-[18%] hidden w-20 select-none text-fg/10 md:block"
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="orn-spin-rev block h-auto w-full"
        >
          <circle
            cx="24"
            cy="24"
            r="14"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M24 2v12M24 34v12M2 24h12M34 24h12"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="24" cy="24" r="2.5" fill="currentColor" />
        </svg>
      </span>

      <ChoreoGroup amount={0.45}>
        <Block driven fromY={10}>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-dim">
            04 / Contact
          </p>
        </Block>

        <Block driven delay={0.12}>
          <p className="mt-12 font-display text-[clamp(1.3rem,2.6vw,2rem)] font-semibold tracking-[-0.02em] text-fg">
            {"If you're hiring someone who sweats the details,"}
          </p>
        </Block>

        <h2 className="mt-2 text-[clamp(3.5rem,10vw,9rem)] leading-[0.95]">
          <Words
            driven
            baseDelay={0.3}
            stagger={0.14}
            segments={[
              {
                text: "let's talk.",
                className: "font-serif italic tracking-[-0.02em] text-accent",
              },
            ]}
          />
        </h2>

        <Fade driven delay={0.75}>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="text-fg transition-colors hover:text-accent"
            >
              {profile.email}
              {" →"}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-faint transition-colors hover:text-fg"
            >
              GitHub ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-faint transition-colors hover:text-fg"
            >
              LinkedIn ↗
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-faint transition-colors hover:text-fg"
            >
              Résumé ↗
            </a>
          </div>
        </Fade>
      </ChoreoGroup>

      <Fade delay={0.2}>
        <footer className="mt-28 flex flex-wrap justify-between gap-2 border-t border-line pt-6 font-mono text-[11px] text-dim">
          <span>
            {profile.name}
            {" · "}
            {profile.location}
          </span>
          <span>
            Built with Next.js, TypeScript, Motion, and a focus on performance and detail.
          </span>
        </footer>
      </Fade>
    </section>
  );
}
