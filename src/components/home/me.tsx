"use client";

import { boxCx } from "@/lib/box";
import Image from 'next/image';

export function Me() {
  return (
    <div className={boxCx({ 
      surface: "transparent",
      paddingX: "lg",
      paddingY: "md",
      className: "border-y-1 rounded-none" 
    })}>
      <Image
        src="/pfp.svg"
        alt="profile picture"
        width={320}
        height={213}
        className="w-[clamp(10rem, 16vw, 20rem)] h-[clamp(6.67rem, 10.67vw, 13.33rem)] object-cover cursor-target"
      />
    </div>
  )
}