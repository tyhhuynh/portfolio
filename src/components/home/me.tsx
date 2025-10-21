"use client";

import { box } from "@/lib/box";
import Image from 'next/image';

export function Me() {
  return (
    <div className={box({ 
      surface: "transparent",
      className: "border-y-1 rounded-none" 
    })}>
      <Image
        src="/pfp.svg"
        alt="profile picture"
        width={320}
        height={320}
        className="min-w-[clamp(12rem, 15vw, 20rem)] min-h-[clamp(12rem, 15vw, 20rem)] cursor-target"
      />
    </div>
  )
}