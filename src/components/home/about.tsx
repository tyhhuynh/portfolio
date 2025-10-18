"use client";

import { box } from "@/lib/box";


export function About() {
    return (
        <div className={box({ 
            surface: "muted", 
            items: "stretch", 
            className: "w-full max-w-[52rem] mx-auto px-[1rem]"})}>

            <h2 className="border-b-1 navbar-short-borders-bottom text-[1.75rem] px-[0.25rem] my-[0.5rem]">
                about me
            </h2>
            <p className="min-w-0 w-full self-stretch whitespace-normal break-words [overflow-wrap:anywhere] leading-relaxed text-[1.25rem]">
                im a recent graduate from UC Davis with focus on building practical and robust software. i thrive in collaborative environments and value lifelong learning. curiosity fuels my career goals, side projects, and hobbies
            </p>

            <p className="min-w-0 w-full self-stretch whitespace-normal break-words [overflow-wrap:anywhere] leading-relaxed text-[1.25rem]">
                if im not coding, im powerlifting, tinkering with new hardware, exploring AI/ML projects, or playing indie games to spark new ideas. currently developing a retro 2D game and training a computer vision model
            </p>

            <p className="min-w-0 w-full self-stretch whitespace-normal break-words [overflow-wrap:anywhere] leading-relaxed text-[1.25rem]">
                feel free to reach out to me via LinkedIn or Email!
            </p>
        </div>
    )
}