import { useState } from "react";

interface Slide {
  headline: string;
  description: string;
  gradient: string;
  svgDecor: React.ReactNode;
}

interface BenefitSliderProps {
  lang?: "de" | "en";
}

const SlideDecor1 = () => (
  <svg viewBox="0 0 320 380" className="w-full h-full" aria-hidden="true">
    <defs>
      <radialGradient id="g1a" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#df41fb" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#df41fb" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="g1b" cx="75%" cy="70%" r="50%">
        <stop offset="0%" stopColor="#4fd1c5" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#4fd1c5" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="320" height="380" fill="#1a0a2e" />
    <circle cx="128" cy="133" r="160" fill="url(#g1a)" />
    <circle cx="240" cy="266" r="120" fill="url(#g1b)" />
    {/* Abstract data streams */}
    {[0,1,2,3,4,5].map(i => (
      <line key={i} x1={40 + i*20} y1="20" x2={80 + i*30} y2="360"
        stroke="#df41fb" strokeOpacity={0.12 + i*0.03} strokeWidth="1" />
    ))}
    {/* Floating UI chips */}
    <rect x="40" y="60" width="110" height="36" rx="8" fill="#df41fb" fillOpacity="0.18" stroke="#df41fb" strokeOpacity="0.4" strokeWidth="1"/>
    <rect x="44" y="68" width="60" height="6" rx="3" fill="#df41fb" fillOpacity="0.6"/>
    <rect x="44" y="80" width="40" height="4" rx="2" fill="#fff" fillOpacity="0.3"/>

    <rect x="160" y="110" width="130" height="50" rx="8" fill="#4fd1c5" fillOpacity="0.12" stroke="#4fd1c5" strokeOpacity="0.3" strokeWidth="1"/>
    <rect x="168" y="120" width="70" height="6" rx="3" fill="#4fd1c5" fillOpacity="0.7"/>
    <rect x="168" y="132" width="50" height="4" rx="2" fill="#fff" fillOpacity="0.3"/>
    <rect x="168" y="142" width="80" height="4" rx="2" fill="#fff" fillOpacity="0.2"/>

    {/* Bar chart */}
    <rect x="50" y="190" width="16" height="60" rx="3" fill="#df41fb" fillOpacity="0.5"/>
    <rect x="72" y="210" width="16" height="40" rx="3" fill="#df41fb" fillOpacity="0.35"/>
    <rect x="94" y="175" width="16" height="75" rx="3" fill="#df41fb" fillOpacity="0.65"/>
    <rect x="116" y="200" width="16" height="50" rx="3" fill="#4fd1c5" fillOpacity="0.5"/>

    {/* Video play icon */}
    <circle cx="230" cy="200" r="28" fill="#df41fb" fillOpacity="0.2" stroke="#df41fb" strokeOpacity="0.4" strokeWidth="1.5"/>
    <polygon points="222,190 222,212 245,201" fill="#fff" fillOpacity="0.7"/>

    {/* Small floating dots */}
    <circle cx="170" cy="80" r="3" fill="#df41fb" fillOpacity="0.8"/>
    <circle cx="190" cy="60" r="2" fill="#4fd1c5" fillOpacity="0.7"/>
    <circle cx="280" cy="140" r="4" fill="#df41fb" fillOpacity="0.5"/>
    <circle cx="60" cy="300" r="3" fill="#4fd1c5" fillOpacity="0.6"/>
  </svg>
);

const SlideDecor2 = () => (
  <svg viewBox="0 0 320 380" className="w-full h-full" aria-hidden="true">
    <defs>
      <radialGradient id="g2a" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="g2b" cx="60%" cy="65%" r="45%">
        <stop offset="0%" stopColor="#df41fb" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#df41fb" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="320" height="380" fill="#120820" />
    <circle cx="160" cy="152" r="150" fill="url(#g2a)" />
    <circle cx="192" cy="250" r="110" fill="url(#g2b)" />
    {/* AI chip center */}
    <rect x="110" y="110" width="100" height="100" rx="12" fill="#df41fb" fillOpacity="0.15" stroke="#df41fb" strokeOpacity="0.45" strokeWidth="1.5"/>
    <rect x="128" y="128" width="64" height="64" rx="6" fill="#df41fb" fillOpacity="0.2" stroke="#df41fb" strokeOpacity="0.5" strokeWidth="1"/>
    <text x="160" y="168" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#df41fb" fillOpacity="0.9" fontFamily="monospace">AI</text>
    {/* Chip pins */}
    {[0,1,2,3].map(i => (
      <g key={i}>
        <line x1={125 + i*18} y1="110" x2={125 + i*18} y2="95" stroke="#df41fb" strokeOpacity="0.5" strokeWidth="2"/>
        <line x1={125 + i*18} y1="210" x2={125 + i*18} y2="225" stroke="#df41fb" strokeOpacity="0.5" strokeWidth="2"/>
        <line x1="110" y1={125 + i*18} x2="95" y2={125 + i*18} stroke="#df41fb" strokeOpacity="0.5" strokeWidth="2"/>
        <line x1="210" y1={125 + i*18} x2="225" y2={125 + i*18} stroke="#df41fb" strokeOpacity="0.5" strokeWidth="2"/>
      </g>
    ))}
    {/* Orbiting dots / speed lines */}
    <circle cx="68" cy="80" r="5" fill="#a855f7" fillOpacity="0.7"/>
    <circle cx="252" cy="72" r="4" fill="#df41fb" fillOpacity="0.6"/>
    <circle cx="270" cy="280" r="6" fill="#a855f7" fillOpacity="0.5"/>
    <circle cx="50" cy="260" r="4" fill="#df41fb" fillOpacity="0.5"/>
    {/* Speed streaks */}
    {[0,1,2,3,4].map(i => (
      <line key={i} x1={20 + i*14} y1={290 + i*8} x2={60 + i*14} y2={290 + i*8}
        stroke="#df41fb" strokeOpacity={0.3 - i*0.04} strokeWidth="2" strokeLinecap="round"/>
    ))}
    {/* Clock / time icon */}
    <circle cx="252" cy="300" r="22" fill="none" stroke="#a855f7" strokeOpacity="0.5" strokeWidth="1.5"/>
    <line x1="252" y1="300" x2="252" y2="284" stroke="#a855f7" strokeOpacity="0.7" strokeWidth="1.5"/>
    <line x1="252" y1="300" x2="263" y2="307" stroke="#a855f7" strokeOpacity="0.7" strokeWidth="1.5"/>
  </svg>
);

const SlideDecor3 = () => (
  <svg viewBox="0 0 320 380" className="w-full h-full" aria-hidden="true">
    <defs>
      <radialGradient id="g3a" cx="50%" cy="38%" r="55%">
        <stop offset="0%" stopColor="#df41fb" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#df41fb" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="g3b" cx="30%" cy="70%" r="45%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="320" height="380" fill="#150d25" />
    <circle cx="160" cy="145" r="145" fill="url(#g3a)" />
    <circle cx="96" cy="270" r="120" fill="url(#g3b)" />
    {/* Stylized face silhouette */}
    <ellipse cx="160" cy="150" rx="56" ry="72" fill="#df41fb" fillOpacity="0.08" stroke="#df41fb" strokeOpacity="0.25" strokeWidth="1.5"/>
    <ellipse cx="160" cy="118" rx="34" ry="38" fill="#df41fb" fillOpacity="0.12"/>
    {/* Circuit lines from face */}
    <line x1="104" y1="150" x2="50" y2="150" stroke="#df41fb" strokeOpacity="0.4" strokeWidth="1.2"/>
    <line x1="50" y1="150" x2="50" y2="190" stroke="#df41fb" strokeOpacity="0.3" strokeWidth="1.2"/>
    <line x1="216" y1="150" x2="270" y2="150" stroke="#df41fb" strokeOpacity="0.4" strokeWidth="1.2"/>
    <line x1="270" y1="150" x2="270" y2="200" stroke="#df41fb" strokeOpacity="0.3" strokeWidth="1.2"/>
    {/* Circuit node dots */}
    <circle cx="50" cy="190" r="4" fill="#df41fb" fillOpacity="0.7"/>
    <circle cx="270" cy="200" r="4" fill="#df41fb" fillOpacity="0.7"/>
    {/* Brand color swatches */}
    <rect x="60" y="270" width="20" height="50" rx="4" fill="#df41fb" fillOpacity="0.85"/>
    <rect x="86" y="285" width="20" height="35" rx="4" fill="#818cf8" fillOpacity="0.75"/>
    <rect x="112" y="278" width="20" height="42" rx="4" fill="#4fd1c5" fillOpacity="0.7"/>
    {/* AI label chip */}
    <rect x="190" y="200" width="80" height="32" rx="8" fill="#df41fb" fillOpacity="0.2" stroke="#df41fb" strokeOpacity="0.4" strokeWidth="1"/>
    <circle cx="210" cy="216" r="6" fill="#df41fb" fillOpacity="0.7"/>
    <rect x="222" y="210" width="38" height="5" rx="2.5" fill="#fff" fillOpacity="0.5"/>
    <rect x="222" y="220" width="28" height="4" rx="2" fill="#fff" fillOpacity="0.3"/>
    {/* Floating badge */}
    <rect x="180" y="250" width="90" height="26" rx="13" fill="#df41fb" fillOpacity="0.15" stroke="#df41fb" strokeOpacity="0.35" strokeWidth="1"/>
    <rect x="196" y="259" width="56" height="6" rx="3" fill="#df41fb" fillOpacity="0.6"/>
  </svg>
);

export default function BenefitSlider({ lang = "de" }: BenefitSliderProps) {
  const [current, setCurrent] = useState(0);

  const slidesDE: Slide[] = [
    {
      headline: "9x mehr Content",
      description: "Deutlich mehr hochwertiger Content für das gleiche Budget",
      gradient: "from-[#1a0a2e] to-[#0d1a2e]",
      svgDecor: <SlideDecor1 />,
    },
    {
      headline: "Sofort bereit",
      description: "Von der Idee zum fertigen Content in Stunden statt Wochen",
      gradient: "from-[#120820] to-[#0f1030]",
      svgDecor: <SlideDecor2 />,
    },
    {
      headline: "Immer markentreu",
      description: "KI-Modelle lernen Ihre Markenrichtlinien und folgen ihnen konsistent",
      gradient: "from-[#150d25] to-[#1a0a20]",
      svgDecor: <SlideDecor3 />,
    },
  ];

  const slidesEN: Slide[] = [
    {
      headline: "9x more content",
      description: "Significantly more high-quality content for the same budget",
      gradient: "from-[#1a0a2e] to-[#0d1a2e]",
      svgDecor: <SlideDecor1 />,
    },
    {
      headline: "Ready in hours",
      description: "From idea to finished content in hours instead of weeks",
      gradient: "from-[#120820] to-[#0f1030]",
      svgDecor: <SlideDecor2 />,
    },
    {
      headline: "Always on brand",
      description: "AI models learn your brand guidelines and follow them consistently",
      gradient: "from-[#150d25] to-[#1a0a20]",
      svgDecor: <SlideDecor3 />,
    },
  ];

  const slides = lang === "de" ? slidesDE : slidesEN;
  const total = slides.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Compute which 3 cards are visible (wrap around)
  const visible = [0, 1, 2].map((offset) => (current + offset) % total);

  return (
    <div className="relative">
      {/* Card grid — always 3 visible */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((idx, pos) => {
          const slide = slides[idx];
          return (
            <div
              key={`${idx}-${pos}`}
              className={`relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br ${slide.gradient} transition-all duration-500`}
            >
              {/* Decorative SVG fills the card */}
              <div className="absolute inset-0">
                {slide.svgDecor}
              </div>

              {/* Bottom overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <p className="text-white/75 text-sm leading-snug mb-1">
                  {slide.description}
                </p>
                <p className="text-white text-xl font-bold leading-tight">
                  {slide.headline}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows — bottom right */}
      <div className="flex items-center justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={prev}
          aria-label={lang === "de" ? "Vorheriges" : "Previous"}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-cta/50 hover:bg-cta/5 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label={lang === "de" ? "Nächstes" : "Next"}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-cta/50 hover:bg-cta/5 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
