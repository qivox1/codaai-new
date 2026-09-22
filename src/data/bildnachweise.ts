/**
 * Bildnachweise (seit 22.09.2026, Design Guide v2.2 Abschnitt 11.2).
 * ---------------------------------------------------------------------------
 * Jedes Foto aus einer Bilddatenbank steht hier — mit Herkunft, Lizenz und
 * den Seiten, auf denen es verwendet wird. Das Impressum (DE/EN) rendert die
 * Liste je URL (Komponente BildnachweisListe.astro). Eigene Grafiken und
 * Diagramme aus Code brauchen keinen Eintrag.
 *
 * Neues Foto: Eintrag ergänzen, `seiten` mit allen Pfaden (DE und EN) füllen,
 * Abrufdatum = Tag des Downloads. Keine KI-generierten Bilder (v2.2).
 */
export interface Bildnachweis {
  /** Datei unter /public, z. B. /images/blog/in-chatgpt-empfohlen-de.webp */
  dateien: string[];
  fotograf: string;
  plattform: 'Kaboompics' | 'Unsplash' | 'Pexels' | 'Burst' | 'StockSnap' | 'Wikimedia Commons' | 'Pixabay';
  /** Seite des Originalfotos auf der Plattform */
  quelle: string;
  lizenz: string;
  lizenzUrl: string;
  abgerufen: string; // JJJJ-MM-TT
  /** Seiten, auf denen das Foto (bearbeitet) erscheint */
  seiten: string[];
  /** Bearbeitung, die wir vorgenommen haben */
  bearbeitung?: string;
}

export const BEARBEITUNG_STANDARD = {
  de: 'Ausschnitt, Farbbehandlung und eingesetzte Befund-Karte durch CodaAI',
  en: 'Crop, colour treatment and overlaid finding card by CodaAI',
};

export const LIZENZEN = {
  pexels: { name: 'Pexels-Lizenz', url: 'https://www.pexels.com/license/' },
  unsplash: { name: 'Unsplash-Lizenz', url: 'https://unsplash.com/license' },
  kaboompics: { name: 'Kaboompics-Lizenz', url: 'https://kaboompics.com/license' },
};

export const BILDNACHWEISE: Bildnachweis[] = [
  // Einträge entstehen mit der Fotoauswahl (Blog-Redaktionsplan 2026/27, Abschnitt 5.1).
  {
    dateien: ['/images/blog/in-chatgpt-empfohlen-de.webp', '/images/blog/in-chatgpt-empfohlen-en.webp'],
    fotograf: 'ThisIsEngineering',
    plattform: 'Pexels',
    quelle: 'https://www.pexels.com/photo/3862129/',
    lizenz: 'Pexels-Lizenz',
    lizenzUrl: 'https://www.pexels.com/license/',
    abgerufen: '2026-09-22',
    seiten: ['/blog/in-chatgpt-als-anbieter-empfohlen-werden/', '/en/blog/get-recommended-by-chatgpt-as-a-supplier/'],
  },
  {
    dateien: ['/images/blog/youtube-b2b-de.webp', '/images/blog/youtube-b2b-en.webp'],
    fotograf: 'Isaiah Ekele',
    plattform: 'Pexels',
    quelle: 'https://www.pexels.com/photo/18357250/',
    lizenz: 'Pexels-Lizenz',
    lizenzUrl: 'https://www.pexels.com/license/',
    abgerufen: '2026-09-22',
    seiten: ['/blog/youtube-ki-sichtbarkeit-b2b/', '/en/blog/youtube-ai-visibility-b2b/'],
  },
  {
    dateien: ['/images/blog/chatgpt-bing-de.webp', '/images/blog/chatgpt-bing-en.webp'],
    fotograf: 'ThisIsEngineering',
    plattform: 'Pexels',
    quelle: 'https://www.pexels.com/photo/19895882/',
    lizenz: 'Pexels-Lizenz',
    lizenzUrl: 'https://www.pexels.com/license/',
    abgerufen: '2026-09-22',
    seiten: ['/blog/chatgpt-seo-perplexity-sichtbarkeit/', '/en/blog/chatgpt-seo-perplexity-visibility/'],
  },
  {
    dateien: ['/images/blog/ki-sichtbarkeit-praxis-messung-de.webp', '/images/blog/ki-sichtbarkeit-praxis-messung-en.webp'],
    fotograf: 'Mikhail Nilov',
    plattform: 'Pexels',
    quelle: 'https://www.pexels.com/photo/6592405/',
    lizenz: 'Pexels-Lizenz',
    lizenzUrl: 'https://www.pexels.com/license/',
    abgerufen: '2026-09-22',
    seiten: ['/blog/ki-sichtbarkeit-praxis-chatgpt-empfehlung/', '/en/blog/ai-visibility-chatgpt-recommendation-practice/'],
  },
  {
    dateien: ['/images/blog/markennennungen-de.webp', '/images/blog/markennennungen-en.webp'],
    fotograf: 'ThisIsEngineering',
    plattform: 'Pexels',
    quelle: 'https://www.pexels.com/photo/19895868/',
    lizenz: 'Pexels-Lizenz',
    lizenzUrl: 'https://www.pexels.com/license/',
    abgerufen: '2026-09-22',
    seiten: ['/blog/markennennungen-drittseiten-ki/', '/en/blog/brand-mentions-third-party-sites-ai/'],
  },
  {
    dateien: ['/images/blog/vergleichslisten-de.webp', '/images/blog/vergleichslisten-en.webp'],
    fotograf: 'ThisIsEngineering',
    plattform: 'Pexels',
    quelle: 'https://www.pexels.com/photo/3862379/',
    lizenz: 'Pexels-Lizenz',
    lizenzUrl: 'https://www.pexels.com/license/',
    abgerufen: '2026-09-22',
    seiten: ['/blog/vergleichsartikel-anbieterlisten-ki/', '/en/blog/comparison-articles-vendor-lists-ai/'],
  },
  {
    dateien: ['/images/blog/chatgpt-startseite-de.webp', '/images/blog/chatgpt-startseite-en.webp'],
    fotograf: 'ThisIsEngineering',
    plattform: 'Pexels',
    quelle: 'https://www.pexels.com/photo/3862625/',
    lizenz: 'Pexels-Lizenz',
    lizenzUrl: 'https://www.pexels.com/license/',
    abgerufen: '2026-09-22',
    seiten: ['/blog/chatgpt-quellen-startseite-markenkonsistenz/', '/en/blog/chatgpt-sources-homepage-brand-consistency/'],
  },
];
