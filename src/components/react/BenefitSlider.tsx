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

const STEP = 3;       // cards per "page"
const INTERVAL = 4000; // ms between auto-advances

export default function BenefitSlider({ lang = "de", base = "" }: BenefitSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slidesDE: Slide[] = [
    {
      image: `${base}/images/slider/01.webp`,
      headline: "9x mehr Content",
      description: "Deutlich mehr hochwertiger Content für das gleiche Budget.",
    },
    {
      image: `${base}/images/slider/02.webp`,
      headline: "Sofort bereit",
      description: "Von der Idee zum fertigen Content in Stunden statt Wochen.",
    },
    {
      image: `${base}/images/slider/03.webp`,
      headline: "Immer markentreu",
      description: "KI-Modelle lernen Ihre Markenrichtlinien und folgen ihnen konsistent.",
    },
    {
      image: `${base}/images/slider/04.webp`,
      headline: "Ein Tool für alles",
      description: "SEO/GEO, Design, Video – nahtlos aus einer Plattform.",
    },
    {
      image: `${base}/images/slider/05.webp`,
      headline: "Global ohne Grenzen",
      description: "Mehrsprachiger Content auf Knopfdruck.",
    },
    {
      image: `${base}/images/slider/06.webp`,
      headline: "Volle Transparenz",
      description: "Echtzeit-Analyse und ROI auf einen Blick.",
    },
  ];

  const slidesEN: Slide[] = [
    {
      image: `${base}/images/slider/01.webp`,
      headline: "9x more content",
      description: "Significantly more high-quality content for the same budget.",
    },
    {
      image: `${base}/images/slider/02.webp`,
      headline: "Ready in hours",
      description: "From idea to finished content in hours instead of weeks.",
    },
    {
      image: `${base}/images/slider/03.webp`,
      headline: "Always on brand",
      description: "AI models learn your brand guidelines and follow them consistently.",
    },
    {
      image: `${base}/images/slider/04.webp`,
      headline: "One tool for everything",
      description: "SEO/GEO, design, video – seamlessly from one platform.",
    },
    {
      image: `${base}/images/slider/05.webp`,
      headline: "Global without limits",
      description: "Multilingual content at the push of a button.",
    },
    {
      image: `${base}/images/slider/06.webp`,
      headline: "Full transparency",
      description: "Real-time analytics and ROI at a glance.",
    },
  ];

  const slides = lang === "de" ? slidesDE : slidesEN;
  const total = slides.length; // 6

  // Advance by STEP, wrap around
  const advance = useCallback(
    (dir: 1 | -1) => {
      setCurrent((c) => (c + dir * STEP + total) % total);
    },
    [total]
  );

  // Manual click — pause auto-play for 8 s then resume
  const handleNav = useCallback(
    (dir: 1 | -1) => {
      advance(dir);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 8000);
    },
    [advance]
  );

  // Auto-advance every INTERVAL ms
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => advance(1), INTERVAL);
    return () => clearInterval(timer);
  }, [advance, isPaused]);

  // CSS translateX: each "page" is 100% of the visible viewport
  // Track width = (total / STEP) * 100% = 200%
  // translateX per page = -(page * 100 / (total/STEP))% = -(page * 50)%
  const page = current / STEP; // 0 or 1
  const translateX = `translateX(-${page * 50}%)`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slider track — overflow hidden clips non-visible cards */}
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            width: `${(total / STEP) * 100}%`, // 200%
            transform: translateX,
            transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 px-2.5"
              style={{ width: `${100 / total}%` }} // 16.666% of track = 33.333% of viewport
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-muted">
                {/* Full-bleed image */}
                <img
                  src={slide.image}
                  alt={slide.headline}
                  width={450}
                  height={806}
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
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() => handleNav(-1)}
          aria-label={lang === "de" ? "Vorheriges" : "Previous"}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => handleNav(1)}
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
