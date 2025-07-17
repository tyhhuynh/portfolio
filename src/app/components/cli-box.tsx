"use client";

import React, { useEffect, useState } from "react";

type CLIBoxProps = {
  lines: string[];
};

export default function CLIBox({ lines }: CLIBoxProps) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);

      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const dateNum = now.getDate();
      const year = now.getFullYear();
      setDate(`${month}.${dateNum}.${year}`);
    }

    updateTime();
    const interval = setInterval(updateTime, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div
        className="bg-[#000000] bg-opacity-80 text-[#00FF00]-400 font-mono p-0 rounded-lg border border-[#00FF00] max-w-2xl w-full pointer-events-auto"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-[#00FF00] text-sm text-[#00FF00]">
          <span>{time}</span>
          <span className="text-center">tyler_huynh@portfolio</span>
          <span>{date}</span>
        </div>

        {/* BODY */}
        <div className="p-4">
          {lines.map((line, idx) => (
            <p key={idx} className="leading-relaxed">
              {line}
            </p>
          ))}
          <p className="animate-pulse text-[#00FF00]-500 mt-2">▊</p> {/* cursor */}
        </div>
      </div>
    </div>
  );
}
