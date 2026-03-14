'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

interface CardFlipProps {
  name: string;
  role: string;
  description: string;
  features: string[];
  icon: ReactNode;
  accentColor: string;
}

export default function CardFlip({
  name,
  role,
  description,
  features,
  icon,
  accentColor,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="h-[420px] w-full cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative h-full w-full transition-transform duration-600"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div
            className="h-full w-full p-6 flex flex-col justify-end"
            style={{
              background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
            }}
          >
            <div className="mb-2">{icon}</div>
            <h3 className="text-2xl font-semibold text-foreground">{name}</h3>
            <p className="text-sm font-medium" style={{ color: accentColor }}>
              {role}
            </p>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="h-full w-full p-6 flex flex-col bg-card border border-border">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-foreground mb-1">
              {name}
            </h3>
            <p className="text-sm font-medium mb-4" style={{ color: accentColor }}>
              {role}
            </p>
            <p className="text-sm text-muted-foreground mb-6">{description}</p>
            <div className="mt-auto">
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
