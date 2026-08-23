import type { Config } from 'tailwindcss'

// Every value here is pulled directly from docs/design-handoff.md Section 1 —
// that document is the source of truth for these tokens, not this file.
const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F2D52',
        'navy-light': '#1A4174',
        gold: '#C8A96A',
        'gold-light': '#DDC596',
        green: '#2E6B4A',
        terracotta: '#B86A4F',
        slate: '#4E5B68',
        mist: '#F5F7FA',
        paper: '#FBF8F3',
        micro: '#8A93A0',
        hairline: {
          8: 'rgba(0,0,0,0.08)',
          10: 'rgba(0,0,0,0.10)',
          15: 'rgba(0,0,0,0.15)',
        },
      },
      // "One rule, two exceptions" — see docs/design-handoff.md Section 1.4.
      // `rounded` (the default) is 2px everywhere; `rounded-full` is the only
      // other radius allowed, reserved for pills, badges, and perfect circles.
      borderRadius: {
        none: '0',
        DEFAULT: '2px',
        full: '9999px',
      },
      fontFamily: {
        // Headings only — Source Serif 4.
        heading: ['var(--font-source-serif)', 'ui-serif', 'serif'],
        // Body copy, UI, buttons, forms — Geist.
        sans: ['var(--font-geist)', 'ui-sans-serif', 'sans-serif'],
        // Eyebrows and micro-labels ONLY — Manrope.
        label: ['var(--font-manrope)', 'ui-sans-serif', 'sans-serif'],
        // Every number, without exception — IBM Plex Mono.
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
}

export default config
