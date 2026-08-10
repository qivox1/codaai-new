'use client';

import { useState, useEffect } from 'react';

interface Word {
  text: string;
  color: string;
  duration?: number; // optionale Anzeigedauer pro Wort (ms) — überschreibt displayDuration
}

interface FlipWordsProps {
  words: Word[];
  displayDuration?: number; // ms, die ein Wort steht
  animDuration?: number;    // ms für das Aus- und Einblenden
  /**
   * Marken-Verlauf Navy-600 → Magenta statt flacher Farbe (Design Guide v2.1).
   *
   * ⚠️ Der Verlauf liegt bewusst auf dem INNERSTEN Element — dem, das den
   * Textknoten selbst trägt. `background-clip: text` beschneidet in Safari nur
   * den eigenen Text, nicht den von Nachfahren; ein Verlauf auf dem `.k2`-Span
   * ergab auf dem iPhone durchsichtige Schrift ohne Verlauf dahinter, also eine
   * fehlende H1-Zeile (gemeldet 05.08.2026). Wer den Verlauf hier nach oben
   * verschiebt, holt genau diesen Fehler zurück.
   *
   * `color` bleibt gesetzt und trägt als Rückfall, falls `background-clip: text`
   * nicht greift.
   */
  gradient?: boolean;
}

/**
 * Wechselnde Wendungen in der H1 (/webinar).
 *
 * ── Umgeschrieben am 05.08.2026 ────────────────────────────────────────────
 * Vorher lief das über zwei `useEffect`, die sich gegenseitig weiterreichten:
 * einer setzte nach der Standzeit die Phase auf `exit`, der andere reagierte
 * darauf, zählte den Index hoch und setzte `enter`, um kurz darauf `visible`
 * zu setzen. Das erste Wort erschien dadurch korrekt — danach pendelte die
 * Phase zwischen `exit` und `enter` und erreichte `visible` nie wieder.
 *
 * Sichtbare Folge: Ab der zweiten Wendung stand die zweite H1-Zeile dauerhaft
 * auf `opacity: 0`. Der Text wechselte weiter und belegte seinen Platz, war
 * aber unsichtbar — die Überschrift wirkte abgeschnitten und hinterliess eine
 * Lücke (gemeldet von Oli am 05.08.2026 mit einem iPhone-Screenshot).
 *
 * Warum das so lange unbemerkt blieb: In den ersten rund drei Sekunden nach
 * dem Laden ist alles in Ordnung. Wer die Seite kurz aufruft oder direkt nach
 * dem Laden misst, sieht den Fehler nicht. Er zeigt sich erst ab dem zweiten
 * Wort. Beim Prüfen also lange genug hinsehen — mindestens einen vollen
 * Durchlauf aller Wendungen.
 *
 * Jetzt: EIN Effekt, zwei Zeitgeber, ein einziger Zustand für die Sichtbarkeit.
 * Kein Zustand haengt mehr davon ab, dass ein anderer Effekt rechtzeitig
 * reagiert.
 */
export default function FlipWords({
  words,
  displayDuration = 2800,
  animDuration = 400,
  gradient = false,
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (words.length < 2) return;
    const hold = words[index]?.duration ?? displayDuration;

    // 1. Ausblenden, wenn die Standzeit um ist.
    const aus = setTimeout(() => setShown(false), hold);
    // 2. Danach das naechste Wort setzen und wieder einblenden.
    const ein = setTimeout(() => {
      setIndex((i) => (i + 1) % words.length);
      setShown(true);
    }, hold + animDuration);

    return () => {
      clearTimeout(aus);
      clearTimeout(ein);
    };
  }, [index, displayDuration, animDuration, words]);

  const current = words[index];

  const gradientStyle = gradient
    ? {
        backgroundImage:
          'linear-gradient(135deg, hsl(var(--navy-600)), hsl(var(--cta)))',
        WebkitBackgroundClip: 'text' as const,
        backgroundClip: 'text' as const,
        WebkitTextFillColor: 'transparent',
      }
    : null;

  return (
    <span
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{ display: 'inline-block', perspective: '600px', whiteSpace: 'nowrap' }}
    >
      <span
        style={{
          color: current.color,
          display: 'inline-block',
          whiteSpace: 'nowrap',
          transition: `opacity ${animDuration}ms ease, transform ${animDuration}ms cubic-bezier(0.4,0,0.2,1)`,
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0) rotateX(0deg)' : 'translateY(-8px) rotateX(25deg)',
          ...gradientStyle,
        }}
      >
        {current.text}
      </span>
    </span>
  );
}
