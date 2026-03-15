'use client';

import { useState, useEffect } from 'react';

interface Word {
  text: string;
  color: string;
}

interface FlipWordsProps {
  words: Word[];
  displayDuration?: number; // ms each word is shown
  animDuration?: number;    // ms of the flip animation
}

export default function FlipWords({
  words,
  displayDuration = 2800,
  animDuration = 400,
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'visible' | 'exit' | 'enter'>('visible');

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setPhase('exit');
    }, displayDuration);
    return () => clearTimeout(showTimer);
  }, [index, displayDuration]);

  useEffect(() => {
    if (phase === 'exit') {
      const t = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setPhase('enter');
      }, animDuration);
      return () => clearTimeout(t);
    }
    if (phase === 'enter') {
      const t = setTimeout(() => setPhase('visible'), animDuration);
      return () => clearTimeout(t);
    }
  }, [phase, animDuration, words.length]);

  const current = words[index];

  const style: React.CSSProperties = {
    color: current.color,
    display: 'inline-block',
    transition: `opacity ${animDuration}ms ease, transform ${animDuration}ms cubic-bezier(0.4,0,0.2,1)`,
    opacity: phase === 'exit' ? 0 : phase === 'enter' ? 0 : 1,
    transform:
      phase === 'exit'
        ? 'translateY(-8px) rotateX(25deg)'
        : phase === 'enter'
        ? 'translateY(8px) rotateX(-25deg)'
        : 'translateY(0) rotateX(0deg)',
  };

  return (
    <span
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{ display: 'inline-block', perspective: '600px', whiteSpace: 'nowrap' }}
    >
      <span style={{ ...style, whiteSpace: 'nowrap' }}>{current.text}</span>
    </span>
  );
}
