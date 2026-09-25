"use client";

import { experience } from "@/data/portfolio";
import { Block, Slide } from "./choreography";
import { Ornament } from "./ornament";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-28 md:py-36">
      <Ornament
        kind="square"
        spin="cw"
        className="bottom-[18%] left-[5%] hidden w-12 text-accent/15 lg:block"
      />
      <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10">
        <Block fromY={12}>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
            02 / Experience
          </p>
          <h2 className="sr-only">Experience</h2>
        </Block>
      </div>
      <div className="mx-auto mt-12 grid w-full max-w-[88rem] gap-12 px-6 sm:px-10 md:mt-14 md:gap-14">
        {experience.map((job, index) => (
          <Slide from={{ y: 24 }} delay={index * 0.08} key={job.company}>
            <div className="border-t border-line pt-8">
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="font-display text-[19px] font-semibold tracking-[-0.01em] text-accent">
                  {job.company}
                </h3>
                <span className="font-mono text-[12px] text-dim">
                  {job.location}
                </span>
              </div>
              <div className="mt-6 grid gap-7">
                <div className="relative border-l border-line pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[3.5px] top-2 h-1.5 w-1.5 rounded-full bg-accent"
                  />
                  <div className="grid gap-2 md:grid-cols-[1fr_auto] md:gap-12">
                    <div>
                      <h4 className="font-display text-[16px] font-semibold tracking-[-0.01em] text-fg">
                        {job.role}
                      </h4>
                      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">
                        {job.description} {job.details}
                      </p>
                      <p className="mt-3 font-mono text-[12px] tracking-wide text-faint">
                        {job.stack}
                      </p>
                    </div>
                    <div className="font-mono text-[12px] leading-relaxed text-dim md:text-right">
                      {job.period}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        ))}
      </div>
    </section>
  );
}
