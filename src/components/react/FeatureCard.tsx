'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

interface FeatureCardProps {
  icon: string | ReactNode;
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

  return (
    <div
      className="relative w-full h-[380px] rounded-2xl"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
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
          <div className="size-14 rounded-xl bg-muted flex items-center justify-center mb-4 text-2xl">
            {typeof icon === 'string' ? icon : icon}
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm font-medium text-muted-foreground mb-3">
            {role}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t.hoverForDetails}</span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-border p-6 flex flex-col bg-card"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-muted flex items-center justify-center text-lg">
              {typeof icon === 'string' ? icon : icon}
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
                  transition: `opacity 0.3s ${i * 0.1}s, transform 0.3s ${i * 0.1}s`,
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
              className="w-full bg-muted/50 hover:bg-muted text-foreground rounded-xl py-2.5 text-sm font-medium transition-colors"
              style={{
                borderColor: accentColor,
              }}
            >
              {ctaLabel || t.getFreePremiumArticle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
