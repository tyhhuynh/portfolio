"use client";

import MatrixBg from "./components/matrix-bg";
import CLIBox from "./components/cli-box";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-[#000000] text-[#00ff00]">
      <MatrixBg />
      {/* make box move down instead of outward (if it does not make sense, run the typewriter fn and look at CLI box) */}
      <CLIBox lines={[]}> 
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("> hello world!")
              .pauseFor(500)
              .typeString("<br/>&gt; im tyler")
              .pauseFor(500)
              .typeString("<br/>&gt; to begin, type in 'projects', 'about', or 'contact'")
              .typeString("<br/>&gt; ") // cursor is >_ instead of > _
              .start();
          }}
          options={{
            autoStart: true,
            loop: false,
            delay: 50,
            cursor: "_",
          }}
        />
      </CLIBox>
    </div>
  )
}