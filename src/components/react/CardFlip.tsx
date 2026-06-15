'use client';

import { useState } from 'react';

// Shared icon paths (same set as FeatureCard)
const ICON_PATHS: Record<string, string> = {
  'calendar-days': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M4 11h16"/><path d="M7 14h.013"/><path d="M10.01 14h.005"/><path d="M13.01 14h.005"/><path d="M16.015 14h.005"/><path d="M13.015 17h.005"/><path d="M7.01 17h.005"/><path d="M10.01 17h.005"/>`,
  'file-text': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/><path d="M9 9l1 0"/><path d="M9 13l6 0"/><path d="M9 17l6 0"/>`,
  'image': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8h.01"/><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"/><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"/><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"/>`,
  'search': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M21 21l-6 -6"/>`,
  'video': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z"/><path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"/>`,
  'share': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M8.7 10.7l6.6 -3.4"/><path d="M8.7 13.3l6.6 3.4"/>`,
};

function LucideIcon({ name, size = 24, color }: { name: string; size?: number; color: string }) {
  const paths = ICON_PATHS[name] ?? ICON_PATHS['calendar-days'];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}

interface CardFlipProps {
  name: string;
  role: string;
  description: string;
  features: string[];
  accentColor: string;
  image: string;
  iconName?: string;
  lang?: 'de' | 'en';
}

export default function CardFlip({
  name,
  role,
  description,
  features,
  accentColor,
  image,
  iconName = 'calendar-days',
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
      {/* Glow halo */}
      <div
        className="absolute inset-2 rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500 -z-10"
        style={{ background: accentColor }}
      />

      {/* Flipping card */}
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
          <img
            src={image}
            alt={`${name} – ${role}`}
            width={400}
            height={420}
                        decoding="async"
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
          />
          {/* Strong dark gradient for legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                transparent 0%,
                transparent 35%,
                rgba(0,0,0,0.30) 55%,
                rgba(0,0,0,0.78) 75%,
                rgba(0,0,0,0.96) 100%
              )`,
            }}
          />
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
            style={{ background: accentColor }}
          />
          {/* Bottom: Name first, then role */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white leading-tight">{name}</h3>
            <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: accentColor }}>
              {role}
            </p>
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
          {/* Top accent bar */}
          <div className="h-[3px] w-full rounded-t-3xl flex-shrink-0" style={{ background: accentColor }} />

          {/* Subtle accent radial bg */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ background: `radial-gradient(circle at 80% 20%, ${accentColor}, transparent 60%)` }}
          />

          <div className="relative p-6 flex flex-col h-full overflow-hidden">
            {/* 1. Icon — large, standalone */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 flex-shrink-0"
              style={{ backgroundColor: `${accentColor}1a` }}
            >
              <LucideIcon name={iconName} size={28} color={accentColor} />
            </div>

            {/* 2. Name */}
            <h3 className="text-xl font-bold text-foreground leading-tight mb-1">
              {name}
            </h3>

            {/* 3. Funktion / Role */}
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>
              {role}
            </p>

            {/* 4. Beschreibung */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {description}
            </p>

            {/* Feature list */}
            <div className="mt-auto space-y-2">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-[5px] flex-shrink-0"
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
