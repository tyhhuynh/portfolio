'use client';

import { useEffect, useState } from 'react';
import { box } from '@/lib/box';
import { Clock, MapPin } from 'lucide-react';

function formatNow() {
  const now = new Date();
  const time = now.toLocaleTimeString(undefined, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const date = now.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  return { time, date };
}

export function TimeDateBox() {
  const [mounted, setMounted] = useState(false);
  const [{ time }, setNow] = useState(formatNow);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setNow(formatNow()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={box({
        surface: "transparent",
        gap: "none",
        paddingX: "md",
        className: "text-caption",
      })}
    >
      <span className="flex items-center gap-[var(--spacing-sm)]">
        <Clock className="size-[var(--spacing-lg)]" />
        {time}
      </span>
      <span className="flex items-center gap-[var(--spacing-sm)] whitespace-nowrap">
        <MapPin className="size-[var(--spacing-lg)]" />
        thousand oaks, ca
      </span>
    </div>
  );
}
