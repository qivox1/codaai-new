import type { Config } from "tailwindcss";

/* ═══════════════════════════════════════════════════════════════════════════
   INK NAVY — Farbrollen und Farbskalen, umgestellt 04.08.2026
   ───────────────────────────────────────────────────────────────────────────
   ROLLEN sind PFLICHT für alles Bedeutungstragende:
     Text      text-foreground · text-muted-foreground · text-data
     auf Dunkel  text-ondark · text-ondark-muted · border-ondark-line
     Flächen   bg-background · bg-muted · bg-card · bg-surface-ink · bg-surface-abyss
     Rahmen    border-border · border-input
     Zustände  text-confirm · bg-confirm · text-error · bg-error · text-price · bg-price
     Handlung  bg-cta · text-cta-accessible
   Sie hängen an den CSS-Variablen in src/styles/global.css. Wer eine Rolle
   benutzt, zieht bei jeder späteren Farbkorrektur automatisch mit.

   SKALEN sind ERLAUBT für Verläufe, Dekorationslinien, Diagramme und
   GSAP-Animationsziele: navy-50…900, verdigris-*, oxblood-*, brass-*.
   Sie stehen hier absichtlich als echte Hex-Werte: GSAP kann hsl(var(--x))
   nicht interpolieren. Das ist der EINZIGE Ort, an dem Hex im Quellcode
   erwünscht ist — im Seiten- und Komponentencode ist ein harter Hexcode
   ein Fehler (siehe Hex-Wächter in .github/workflows/).
   ═══════════════════════════════════════════════════════════════════════════ */

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,mdx,md}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* ── Skalen (Dekoration, Verläufe, GSAP-Ziele) ───────────────────── */
        navy: {
          50:  "#F3F6FB",
          100: "#E7ECF5",
          200: "#C9D3E6",
          300: "#93A3C6",
          400: "#5E72A0",
          500: "#3E5183",
          600: "#2B3A5C",
          700: "#1D2740",
          800: "#131A2B",
          900: "#0C1120",
        },
        verdigris: {
          100: "#CCEAE8",
          300: "#72CAC4",
          500: "#297A75",
          600: "#21635F",
        },
        oxblood: {
          100: "#F3D3CE",
          300: "#E4978B",
          500: "#A53827",
          600: "#8C2F21",
        },
        brass: {
          100: "#F1E4C5",
          300: "#E2C378",
          500: "#C29429",
          600: "#87671D",
        },

        /* ── Rollen ───────────────────────────────────────────────────────── */
        surface: {
          paper: "hsl(var(--surface-paper))",
          mist:  "hsl(var(--surface-mist))",
          slate: "hsl(var(--surface-slate))",
          ink:   "hsl(var(--surface-ink))",
          abyss: "hsl(var(--surface-abyss))",
        },
        data: "hsl(var(--data))",
        ondark: {
          DEFAULT: "hsl(var(--foreground-on-dark))",
          muted: "hsl(var(--muted-foreground-on-dark))",
          line: "hsl(var(--border-on-dark))",
        },
        confirm: {
          DEFAULT: "hsl(var(--confirm))",
          text: "hsl(var(--confirm-text))",
          "on-dark": "hsl(var(--confirm-on-dark))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          text: "hsl(var(--error-text))",
          "on-dark": "hsl(var(--error-on-dark))",
        },
        price: {
          DEFAULT: "hsl(var(--price))",
          text: "hsl(var(--price-text))",
          "on-dark": "hsl(var(--price-on-dark))",
        },
        cta: {
          DEFAULT: "hsl(var(--cta))",
          foreground: "hsl(var(--cta-foreground))",
          accessible: "hsl(var(--cta-accessible))",
          "on-dark": "hsl(var(--cta-on-dark))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        btn: "var(--btn-radius)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
