import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ '--font-display-active': 'var(--font-geist)' } as React.CSSProperties}
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
