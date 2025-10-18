"use client";

import { box } from "@/lib/box";
import DecryptedText from "../shared/ui/DecryptedText";

export function Intro() {
    return (
        <div className={box({ surface: "muted", className: "justify-start my-[4rem]" })}>
            <h1 className="border-t-1 text-[3rem] mx-auto px-[0.75rem]">
                <DecryptedText
                text="tyler hao huynh"
                speed={50}
                characters="ABCDEF1234567890!@$%&*"
                sequential={true}
                revealDirection="start"
                animateOn="view"
                />
            </h1>
            <h2 className="text-[2rem] m-auto">
            <DecryptedText
                text="software engineer"
                speed={50}
                characters="ABCDEF1234567890!@$%&*"
                sequential={true}
                revealDirection="start"
                animateOn="view"
                />
            </h2>
            <p className="border-b-1 navbar-short-borders-bottom text-[1.33rem] px-[1.75rem] pb-[1rem]">
            <DecryptedText
                text="intentional, curious, resilient"
                speed={50}
                characters="ABCDEF1234567890!@$%&*"
                sequential={true}
                revealDirection="start"
                animateOn="view"
                />
            </p>
        </div>
    )
}
