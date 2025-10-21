"use client";

import { box } from "@/lib/box";


export function About() {
  return (
    <div className={box({ // configure box
      surface: "muted",
      paddingX: "lg",
      paddingY: "md",
      gap: "lg",
      items: "stretch",
      className: "w-full max-w-[52rem]" // decide on width
    })}>

      <h2 className="border-b-1 navbar-short-borders-bottom px-[var(--spacing-md)] text-action">
        about me
      </h2>

      <p className="leading-relaxed text-justify text-caption">
        im a recent graduate from UC Davis with focus on building practical and robust software. i thrive in collaborative environments and value lifelong learning. curiosity fuels my career goals, side projects, and hobbies
      </p>

      <p className="leading-relaxed text-caption">
        if im not coding, im powerlifting, tinkering with new hardware, exploring AI/ML projects, or playing indie games to spark new ideas. currently developing a retro 2D game and training a computer vision model
      </p>

      <p className="leading-relaxed text-justify text-caption">
        feel free to reach out to me via LinkedIn or Email!
      </p>
    </div>
  )
}