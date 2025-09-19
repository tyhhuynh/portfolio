// src/app/components/AboutDisplay.tsx
'use client';

import { ABOUT_DATA } from '@/lib/constants';

export default function AboutDisplay() {
  return (
    <div className="font-mono text-[#00ff00] whitespace-pre-wrap">
      {`{
  "name": "${ABOUT_DATA.name}",\n
  "title": "${ABOUT_DATA.title}",\n
  "location": "${ABOUT_DATA.location}",\n
  "interests": [${ABOUT_DATA.interests.map((i) => `"${i}"`).join(', ')}],\n
  "summary": "${ABOUT_DATA.summary}",\n
  }`}
    </div>
  );
}
