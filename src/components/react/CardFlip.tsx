'use client';

import { useState } from 'react';

interface CardFlipProps {
  name: string;
  role: string;
  description: string;
  features: string[];
  accentColor: string;
  image: string;
  lang?: 'de' | 'en';
}

export default function CardFlip({
  name,
  role,
  description,
  features,
  accentColor,
  image,
  lang = 'de',
}: CardFlipProps) {
  const viewDetailsLabel = lang === 'de' ? 'Details ansehen' : 'View details';
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative w-full cursor-pointer"
      style={{ height: '420px', perspective: '1200px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(f => !f)}
    >
      {/* Glow halo behind card on hover */}
      <div
        className="absolute inset-2 rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500 -z-10"
        style={{ background: accentColor }}
      />

      {/* The flipping card */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Background image */}
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                transparent 20%,
                ${accentColor}22 55%,
                rgba(0,0,0,0.88) 100%
              )`,
            }}
          />
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
            style={{ background: accentColor }}
          />
          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: accentColor }}
            >
              {role}
            </p>
            <h3 className="text-2xl font-bold text-white leading-tight">{name}</h3>
            {/* Animated flip hint */}
            <div className="mt-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                style={{ color: accentColor }}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors duration-300">
                {viewDetailsLabel}
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'hsl(var(--card))',
            border: `1px solid ${accentColor}55`,
          }}
        >
          {/* Accent top bar */}
          <div className="h-[3px] w-full rounded-t-3xl flex-shrink-0" style={{ background: accentColor }} />

          {/* Subtle accent bg pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              background: `radial-gradient(circle at 80% 20%, ${accentColor}, transparent 60%)`,
            }}
          />

          <div className="relative p-6 flex flex-col h-full">
            {/* Header row */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
                style={{ background: accentColor }}
              >
                {name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground leading-tight">{name}</h3>
                <p className="text-xs font-semibold tracking-wide" style={{ color: accentColor }}>
                  {role}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full mb-4" style={{ background: `${accentColor}33` }} />

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {description}
            </p>

            {/* Feature list */}
            <div className="mt-auto space-y-2.5">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: accentColor }}
                  />
                  <span className="text-xs text-foreground/80 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
