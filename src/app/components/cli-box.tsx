"use client";

import React, { useEffect, useState } from "react";

type CLIBoxProps = {
  lines: string[];
  children?: React.ReactNode;
};

export default function CLIBox({ lines, children }: CLIBoxProps) {
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
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div
        className="bg-[#000000] bg-opacity-80 text-[#00ff00]-400 font-mono p-0 border border-[#00ff00] w-full max-w-[700px] pointer-events-auto"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-2 border-b border-[#00ff00] text-sm text-[#00ff00]">
          <span>{time}</span>
          <span className="text-center">tyler_huynh@portfolio</span>
          <span>{date}</span>
        </div>

        {/* BODY */}
        <div className="p-2 h-[300px] overflow-y-auto">
          {lines.map((line, idx) => (
            <p key={idx} className="leading-relaxed">
              {line}
            </p>
          ))}
          {children}
        </div>
      </div>
    </div>
  );
}
