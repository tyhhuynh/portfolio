"use client";

import MatrixBg from "./components/matrix-bg";
import CLIBox from "./components/cli-box";
import Typewriter from "typewriter-effect";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [userInput, setUserInput] = useState("");

  const ghostRef = useRef<HTMLSpanElement>(null);
  const [caretOffset, setCaretOffset] = useState(0);

  const typewriterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTypewriter(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ghostRef.current) {
      setCaretOffset(ghostRef.current.offsetWidth);
    }
  }, [userInput]);

  const removeTypewriterCursor = () => {
    const cursorEl = typewriterRef.current?.querySelector(".Typewriter__cursor");
    if (cursorEl) cursorEl.remove();
  }

  return (
    <div className="relative w-full h-screen bg-[#000000] text-[#00ff00]">
      <MatrixBg />
      <CLIBox lines={[]}>
        <div 
          className="whitespace-pre-wrap text-[#00ff00] font-mono"
          ref={typewriterRef}
        >
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
                  .pauseFor(500)
                  .callFunction(() => {
                    setShowInput(true);
                    removeTypewriterCursor();
                  })
                  .start();
              }}
              options={{
                cursor: "_",
                delay: 50,
                autoStart: true,
                wrapperClassName: "inline font-mono leading-none",
              }}
            />
          )}
          {showInput && (
            <div className="mt-0.5 flex items-center font-mono text-[#00ff00] w-full text-base">
              <span className="mr-2.5 shrink-0">&gt;</span>
              <div className="relative w-full">
                <span
                  ref={ghostRef}
                  className="invisible absolute top-0 left-0 whitespace-pre leading-none"
                  aria-hidden="true"
                >
                  {userInput || "\u200B"}
                </span>
                
                <span
                  className="caret-underscore absolute top-0 leading-none"
                  style={{
                    transform: `translateX(${caretOffset}px)`,
                  }}
                >
                  _
                </span>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full bg-transparent outline-none caret-transparent"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </CLIBox>
    </div>
  );
}