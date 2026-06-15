'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

import { ICON_PATHS } from './iconPaths';

/** Darkens an HSL color string for use as accessible text on white backgrounds.
 *  Accepts "hsl(H, S%, L%)" or CSS custom properties. Clamps lightness to ≤42%. */
function darkenForText(color: string): string {
  const match = color.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/);
  if (!match) return color;
  const [, h, s, l] = match.map(Number);
  const newL = Math.min(l, 42); // ≤42% lightness → ≥4.5:1 contrast on white
  return `hsl(${h}, ${s}%, ${newL}%)`;
}

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
    hoverForDetails: 'Details ansehen →',
    yourBenefits: 'Ihre Vorteile',
    getFreePremiumArticle: 'Kostenlosen Artikel erhalten',
  },
  en: {
    hoverForDetails: 'See details →',
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
      className="group relative w-full h-[380px] rounded-2xl cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((f) => !f)}
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

          <p className="text-sm font-medium mb-4" style={{ color: darkenForText(accentColor) }}>
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
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span className="text-sm text-foreground/90">{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-4 border-t border-border">
            <button
              type="button"
              className="w-full rounded-xl py-2.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: `${accentColor}15`, color: darkenForText(accentColor) }}
            >
              {ctaLabel || t.getFreePremiumArticle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
