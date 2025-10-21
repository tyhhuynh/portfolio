'use client';

import { box } from '@/lib/box';
import DecryptedText from '../shared/ui/DecryptedText';

export function Intro() {
  return (
    <div
      className={box({
        surface: 'muted',
        paddingX: "md",
        paddingY: "lg",
        gap: "lg",
        justify: "center",
        className: "my-[var(--spacing-xl)]",
      })}
    >
      <h1 className="border-t-1 navbar-short-borders-top mx-auto px-[var(--spacing-md)] text-name">
        <DecryptedText 
        text="tyler hao huynh" 
        speed={50} 
        characters="ABCDEF1234567890!@$%&*" 
        sequential={true} 
        revealDirection="start" 
        animateOn="view" />
      </h1>

      <h2 className="m-auto text-title">
        <DecryptedText 
        text="software engineer" 
        speed={50} characters="ABCDEF1234567890!@$%&*" 
        sequential={true} 
        revealDirection="start" 
        animateOn="view" />
      </h2>

      <p className="border-b-1 navbar-short-borders-bottom px-[var(--spacing-md)] pb-[var(--spacing-sm)] text-body">
        <DecryptedText 
          text="intentional, curious, resilient" 
          speed={50} 
          characters="ABCDEF1234567890!@$%&*" 
          sequential={true} 
          revealDirection="start" 
          animateOn="view" />
      </p>

    </div>
  );
}
