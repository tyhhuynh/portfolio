"use client";

import MatrixBg from "./components/matrix-bg";
import CLIBox from "./components/cli-box";
import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";

export default function Home() {
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTypewriter(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#000000] text-[#00ff00]">
      <MatrixBg />
      <CLIBox lines={[]}>
        <div className="whitespace-pre-wrap text-[#00ff00] font-mono">

          {showTypewriter && (
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("> ")
                  .pauseFor(500)
                  .typeString("hello world!")
                  .pauseFor(1200)
                  .typeString("\n> im tyler")
                  .pauseFor(1200)
                  .typeString("\n> to learn more about me, type in 'projects', 'about', or 'contact'")
                  .typeString("\n> ")
                  .start();
              }}
              options={{
                cursor: "_",
                delay: 50,
                autoStart: true,
                wrapperClassName: "inline",
              }}
            />
          )}
        </div>
      </CLIBox>
    </div>
  );
}