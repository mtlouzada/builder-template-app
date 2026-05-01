import type { Metadata } from 'next'
import {
  Fraunces,
  Geist,
  Geist_Mono,
  IBM_Plex_Sans,
  Londrina_Solid,
} from 'next/font/google'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { TweaksPanel } from '@/components/TweaksPanel'
import { daoConfig } from '@/lib/dao.config'

import { Providers } from './providers'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const londrina = Londrina_Solid({
  variable: '--font-londrina',
  weight: ['400', '900'],
  subsets: ['latin'],
})

const ibmPlex = IBM_Plex_Sans({
  variable: '--font-ibm-plex',
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
})

const DISPLAY_FONT_VAR: Record<string, string> = {
  Geist: 'var(--font-geist)',
  'Londrina Solid': 'var(--font-londrina)',
  'IBM Plex Sans': 'var(--font-ibm-plex)',
  Fraunces: 'var(--font-fraunces)',
}

export const metadata: Metadata = {
  title: {
    default: daoConfig.name,
    template: `%s | ${daoConfig.name}`,
  },
  description: daoConfig.tagline,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { accent, radius, displayFont } = daoConfig.theme
  const rootStyle: React.CSSProperties & Record<string, string> = {
    '--accent': accent,
    '--accent-strong': `color-mix(in oklab, ${accent} 80%, black)`,
    '--radius': `${radius}px`,
    '--font-display-active':
      DISPLAY_FONT_VAR[displayFont] ?? 'var(--font-geist)',
  }

  return (
    <html lang="en" suppressHydrationWarning style={rootStyle}>
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          londrina.variable,
          ibmPlex.variable,
          fraunces.variable,
          'antialiased',
        ].join(' ')}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="mx-auto w-full max-w-[1180px] flex-1 px-6 pb-20 pt-8">
              {children}
            </main>
            <Footer />
          </div>
          {process.env.NODE_ENV !== 'production' && <TweaksPanel />}
        </Providers>
      </body>
    </html>
  )
}
