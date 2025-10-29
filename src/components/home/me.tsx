"use client";

import { boxCx } from "@/lib/box";
import Image from 'next/image';

export function Me() {
  return (
    <div className={boxCx({ 
      surface: "transparent",
      paddingX: "lg",
      paddingY: "md",
      className: "border-y rounded-none" 
    })}>
      <Image
        src="/pfp.svg"
        alt="portrait of Tyler Huynh"
        width={320}
        height={213}
        draggable={false}
        className="w-[clamp(10rem, 16vw, 20rem)] h-auto object-cover cursor-target"
      />
    </div>
  )
}