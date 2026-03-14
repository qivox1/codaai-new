'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

// Lucide-compatible SVG paths (Tabler icons style, strokeWidth 1.5)
const ICON_PATHS: Record<string, string> = {
  'calendar-days': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M4 11h16"/><path d="M7 14h.013"/><path d="M10.01 14h.005"/><path d="M13.01 14h.005"/><path d="M16.015 14h.005"/><path d="M13.015 17h.005"/><path d="M7.01 17h.005"/><path d="M10.01 17h.005"/>`,
  'file-text': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/><path d="M9 9l1 0"/><path d="M9 13l6 0"/><path d="M9 17l6 0"/>`,
  'image': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8h.01"/><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"/><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"/><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"/>`,
  'search': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M21 21l-6 -6"/>`,
  'video': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z"/><path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"/>`,
  'share-2': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h-1a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-8a2 2 0 0 0 -2 -2h-1"/><path d="M12 14v-11"/><path d="M9 6l3 -3l3 3"/>`,
  'share': `<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M8.7 10.7l6.6 -3.4"/><path d="M8.7 13.3l6.6 3.4"/>`,
};

function LucideIcon({ name, size = 24, color }: { name: string; size?: number; color: string }) {
  const paths = ICON_PATHS[name] ?? ICON_PATHS['file-text'];
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

interface FeatureCardProps {
  iconName?: string;
  icon?: string | ReactNode;
  title: string;
  role: string;
  description: string;
  features: string[];
  lang: 'de' | 'en';
  ctaLabel?: string;
  accentColor?: string;
}

const translations = {
  de: {
    hoverForDetails: 'Hover für Details →',
    yourBenefits: 'Ihre Vorteile',
    getFreePremiumArticle: 'Kostenlosen Artikel erhalten',
  },
  en: {
    hoverForDetails: 'Hover for details →',
    yourBenefits: 'Your benefits',
    getFreePremiumArticle: 'Get free premium article',
  },
};

export default function FeatureCard({
  iconName,
  icon,
  title,
  role,
  description,
  features,
  lang,
  ctaLabel,
  accentColor = '#3B82F6',
}: FeatureCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const t = translations[lang];

  const iconLarge = iconName ? (
    <LucideIcon name={iconName} color={accentColor} size={26} />
  ) : (
    <span>{typeof icon === 'string' ? icon : icon}</span>
  );

  const iconSmall = iconName ? (
    <LucideIcon name={iconName} color={accentColor} size={20} />
  ) : (
    <span className="text-lg">{typeof icon === 'string' ? icon : icon}</span>
  );

  return (
    <div
      className="group relative w-full h-[380px] rounded-2xl"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* Glow halo — same effect as team cards */}
      <div
        className="absolute inset-2 rounded-2xl opacity-0 group-hover:opacity-35 blur-2xl transition-opacity duration-500 -z-10"
        style={{ background: accentColor }}
      />

      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-border p-6 flex flex-col bg-card"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div
            className="size-14 rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: `${accentColor}1a` }}
          >
            {iconLarge}
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm font-medium text-muted-foreground mb-3">{role}</p>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t.hoverForDetails}</span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-border p-6 flex flex-col bg-card"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="size-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}1a` }}
            >
              {iconSmall}
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>

          <p className="text-sm font-medium mb-4" style={{ color: accentColor }}>
            {t.yourBenefits}
          </p>

          <div className="space-y-3 flex-1">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-2"
                style={{
                  opacity: isFlipped ? 1 : 0,
                  transform: isFlipped ? 'translateX(0)' : 'translateX(-10px)',
                  transition: `opacity 0.3s ${i * 0.08}s, transform 0.3s ${i * 0.08}s`,
                }}
              >
                <svg
                  className="size-4 mt-0.5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: accentColor }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span className="text-sm text-foreground/90">{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-4 border-t border-border">
            <button
              className="w-full rounded-xl py-2.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
            >
              {ctaLabel || t.getFreePremiumArticle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
