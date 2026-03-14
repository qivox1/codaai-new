import WorldMap from "../ui/WorldMap";

interface Props {
  lang?: "de" | "en";
}

// Connection dots radiating outward from Frankfurt (HQ)
// to represent global content distribution across 155 markets
const FRANKFURT = { lat: 50.11, lng: 8.68 };

const dots = [
  // Frankfurt → New York
  { start: FRANKFURT, end: { lat: 40.71, lng: -74.01 } },
  // Frankfurt → Los Angeles
  { start: FRANKFURT, end: { lat: 34.05, lng: -118.24 } },
  // Frankfurt → São Paulo
  { start: FRANKFURT, end: { lat: -23.55, lng: -46.63 } },
  // Frankfurt → Tokyo
  { start: FRANKFURT, end: { lat: 35.68, lng: 139.69 } },
  // Frankfurt → Singapore
  { start: FRANKFURT, end: { lat: 1.35, lng: 103.82 } },
  // Frankfurt → Sydney
  { start: FRANKFURT, end: { lat: -33.87, lng: 151.21 } },
  // Frankfurt → Mumbai
  { start: FRANKFURT, end: { lat: 19.08, lng: 72.88 } },
  // Frankfurt → Nairobi
  { start: FRANKFURT, end: { lat: -1.29, lng: 36.82 } },
  // Frankfurt → Dubai
  { start: FRANKFURT, end: { lat: 25.20, lng: 55.27 } },
  // Frankfurt → Toronto
  { start: FRANKFURT, end: { lat: 43.65, lng: -79.38 } },
];

export default function WorldMapSection({ lang = "de" }: Props) {
  const title = lang === "de"
    ? "Erreichen Sie 155 Märkte weltweit mit 30+ Sprachen"
    : "Reach 155 Markets Worldwide in 30+ Languages";
  const subtitle = lang === "de"
    ? "Ihre Inhalte automatisch in 30 Sprachen — für jeden Markt optimiert und kulturell angepasst."
    : "Your content automatically in 30 languages — optimised and culturally adapted for every market.";

  const stats = lang === "de"
    ? [
        { value: "155", label: "Märkte weltweit" },
        { value: "30",  label: "Sprachen" },
        { value: "24h", label: "Lieferzeit" },
      ]
    : [
        { value: "155", label: "Global markets" },
        { value: "30",  label: "Languages" },
        { value: "24h", label: "Delivery time" },
      ];

  return (
    <div className="mt-8 rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
      <div className="px-8 pt-10 pb-4">
        {/* Stats row */}
        <div className="flex flex-wrap gap-8 mb-6">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
        {/* Text */}
        <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm max-w-xl">{subtitle}</p>
      </div>

      {/* Map */}
      <div className="px-4 pb-4">
        <WorldMap dots={dots} lineColor="#df41fb" />
      </div>
    </div>
  );
}
