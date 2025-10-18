"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { buttonCx } from "@/lib/button";

export function ThemeButton() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = (theme ?? resolvedTheme) === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={buttonCx({
        className: "px-[0.5rem] py-[0.5rem] cursor-target"
      })}>
        {isDark ? <Moon className="h-[2rem] w-[2rem]" /> : <Sun className="h-[2rem] w-[2rem]" />}
    </button>
  );
}
