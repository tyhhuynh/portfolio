'use client';
import React from 'react';

interface OptionsProps {
  options: Array<{ text: string; type: string; value: string }>;
  selectedIndex: number;
  onSelect: (value: string) => void;
  onHover: (index: number) => void;
}

export default function Options({
  options,
  selectedIndex,
  onSelect,
  onHover,
}: OptionsProps) {
  return (
    <div className="space-y-1">
      {options.map((option, index) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          onMouseEnter={() => onHover(index)}
          className={`w-full text-left font-mono text-[#00ff00] cursor-pointer ${
            index === selectedIndex && `bg-[#00ff00] text-[#000000]`
          }`}
        >
          {index === selectedIndex
            ? `> ${option.text} <==`
            : `> ${option.text}`}
        </button>
      ))}
    </div>
  );
}
