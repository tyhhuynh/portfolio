"use client";

import { boxCx } from "@/lib/box";


export function About() {
  return (
    <div className={boxCx({
      surface: "muted",
      paddingX: "lg",
      paddingY: "md",
      width: "full",
      gap: "lg",
      className: "leading-relaxed"
    })}>

      <h2 className="border-b-1 navbar-short-borders-bottom px-[var(--spacing-md)] text-action">
        about me
      </h2>

      <p className="text-caption">
        im a recent graduate from UC Davis with focus on building practical and robust software. i thrive in collaborative environments and value lifelong learning. curiosity fuels my career goals, side projects, and hobbies
      </p>

      <p className="text-caption">
        if im not coding, im powerlifting, tinkering with new hardware, exploring AI/ML projects, or playing indie games to spark new ideas. currently messing with AI agents.
      </p>

      <p className="text-caption">
        feel free to reach out to me via LinkedIn or Email!
      </p>
    </div>
  )
}