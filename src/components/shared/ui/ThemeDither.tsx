"use client";

import { useTheme } from "next-themes";
import { useMemo } from "react";
import Dither from "./Dither";

export function ThemeDither() {
  const { resolvedTheme } = useTheme();
  
  // Theme-based Dither configuration
  const config = useMemo(() => {
    if (resolvedTheme === 'dark') {
      return {
        waveColor: [0.2, 0.2, 0.2] as [number, number, number], 
        waveSpeed: 0.05,
        waveFrequency: 10,
        waveAmplitude: 0.66,
        colorNum: 5,
        pixelSize: 1,
        mouseRadius: 0.1
      };
    } else {
      return {
        waveColor: [0.9, 0.9, 0.9] as [number, number, number], 
        waveSpeed: 0.05,
        waveFrequency: 10,
        waveAmplitude: 0.33,
        colorNum: 5,
        pixelSize: 1,
        mouseRadius: 0.1
      };
    }
  }, [resolvedTheme]);

  return <Dither {...config} />;
}
