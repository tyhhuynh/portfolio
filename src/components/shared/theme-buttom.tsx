"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { buttonCx } from "@/lib/button";
import { boxCx } from "@/lib/box";

export function ThemeButton() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = (theme ?? resolvedTheme) === "dark";

  return (
    <div
      className={boxCx({
        surface: "transparent",
        paddingX: "md",
      })}>
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={buttonCx({
          iconSize: "lg"
        })}>
          {isDark ? <Moon/> : <Sun />}
      </button>
    </div>
  );
}
