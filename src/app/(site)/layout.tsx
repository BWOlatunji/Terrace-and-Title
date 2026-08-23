import type { Metadata } from 'next'
import { Geist, Source_Serif_4, Manrope, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

// Four families, one job each — see docs/design-handoff.md Section 1.2.
// Self-hosted via next/font instead of the Google Fonts <link> tag the
// static prototype used, per the decision recorded in
// docs/project-overview.md Section 6 (zero layout shift, no external request).
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Terrace & Title Real Estate Advisory',
  description: 'Invest with confidence. Own with pride.',
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${sourceSerif.variable} ${manrope.variable} ${plexMono.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
