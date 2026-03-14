import { useState, useEffect, useCallback } from "react";

interface Slide {
  image: string;
  headline: string;
  description: string;
}

interface BenefitSliderProps {
  lang?: "de" | "en";
  base?: string;
}

export default function BenefitSlider({ lang = "de", base = "" }: BenefitSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slidesDE: Slide[] = [
    {
      image: `${base}/images/slider/01.webp`,
      headline: "9x mehr Content",
      description: "Deutlich mehr hochwertiger Content für das gleiche Budget",
    },
    {
      image: `${base}/images/slider/02.webp`,
      headline: "Sofort bereit",
      description: "Von der Idee zum fertigen Content in Stunden statt Wochen",
    },
    {
      image: `${base}/images/slider/03.webp`,
      headline: "Immer markentreu",
      description: "KI-Modelle lernen Ihre Markenrichtlinien und folgen ihnen konsistent",
    },
    {
      image: `${base}/images/slider/04.webp`,
      headline: "Alles aus einer Hand",
      description: "Strategie, Text, Design, Video und Distribution – vollständig orchestriert",
    },
    {
      image: `${base}/images/slider/05.webp`,
      headline: "Global skalierbar",
      description: "Ihre Inhalte automatisch in 30 Sprachen für 155 internationale Märkte",
    },
    {
      image: `${base}/images/slider/06.webp`,
      headline: "Messbare Ergebnisse",
      description: "Datengestützte Insights für kontinuierliche Optimierung Ihrer Content-Strategie",
    },
  ];

  const slidesEN: Slide[] = [
    {
      image: `${base}/images/slider/01.webp`,
      headline: "9x more content",
      description: "Significantly more high-quality content for the same budget",
    },
    {
      image: `${base}/images/slider/02.webp`,
      headline: "Ready in hours",
      description: "From idea to finished content in hours instead of weeks",
    },
    {
      image: `${base}/images/slider/03.webp`,
      headline: "Always on brand",
      description: "AI models learn your brand guidelines and follow them consistently",
    },
    {
      image: `${base}/images/slider/04.webp`,
      headline: "All in one place",
      description: "Strategy, copy, design, video and distribution – fully orchestrated",
    },
    {
      image: `${base}/images/slider/05.webp`,
      headline: "Globally scalable",
      description: "Your content automatically in 30 languages for 155 international markets",
    },
    {
      image: `${base}/images/slider/06.webp`,
      headline: "Measurable results",
      description: "Data-driven insights for continuous optimisation of your content strategy",
    },
  ];

  const slides = lang === "de" ? slidesDE : slidesEN;
  const total = slides.length;

  const go = useCallback((dir: 1 | -1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((c) => (c + dir + total) % total);
    setTimeout(() => setIsAnimating(false), 350);
  }, [isAnimating, total]);

  const prev = () => go(-1);
  const next = () => go(1);

  // Show 3 consecutive slides starting at current
  const visible = [0, 1, 2].map((offset) => (current + offset) % total);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((idx, pos) => {
          const slide = slides[idx];
          return (
            <div
              key={`${idx}-${pos}`}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-muted"
              style={{ transition: "opacity 0.35s ease" }}
            >
              {/* Full-bleed image */}
              <img
                src={slide.image}
                alt={slide.headline}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />

              {/* Bottom gradient overlay + text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                <p className="text-white/80 text-sm leading-snug mb-1.5">
                  {slide.description}
                </p>
                <p className="text-white text-xl font-bold leading-tight drop-shadow">
                  {slide.headline}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows — bottom right, matching original */}
      <div className="flex items-center justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={prev}
          aria-label={lang === "de" ? "Vorheriges" : "Previous"}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label={lang === "de" ? "Nächstes" : "Next"}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
