import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'
import { PWAProvider } from '@/components/pwa-provider'
import { Toaster } from '@/components/ui/toast'
import { CommandPalette } from '@/components/command-palette'
import { Chatbot } from '@/components/ai/chatbot'
import { ShortcutsModal } from '@/components/shortcuts-modal'
import { SkipLink } from '@/components/accessibility/skip-link'
import { WebGLBackground } from '@/components/webgl/WebGLBackground'
import { CustomCursor } from '@/components/ui/custom-cursor'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://one-development.com'),
  title: 'ONE DEVELOPMENT | Strategic Platform 2026',
  description: 'ONE DEVELOPMENT - 2026 Digital Transformation & AI Strategy. Building the future of real estate with AI-powered solutions.',
  keywords: ['ONE Development', 'Real Estate', 'Dubai', 'AI', 'Digital Transformation', '2026 Strategy'],
  authors: [{ name: 'ONE Development' }],
  creator: 'ONE Development',
  publisher: 'ONE Development',
  // OpenGraph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://one-development.com',
    siteName: 'ONE Development',
    title: 'ONE DEVELOPMENT | Strategic Platform 2026',
    description: 'Building the future of real estate with AI-powered solutions. Digital Transformation & Strategy Platform.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ONE Development - Strategic Platform 2026',
      },
    ],
  },
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'ONE DEVELOPMENT | Strategic Platform 2026',
    description: 'Building the future of real estate with AI-powered solutions.',
    images: ['/og-image.png'],
  },
  // iOS Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ONE DEV',
  },
  // Android / PWA
  applicationName: 'ONE Development',
  manifest: '/manifest.json',
  // Mobile optimizations
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  // Robots
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#D86DCB' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* iOS Status Bar */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Touch Icons for iOS */}
        <link rel="apple-touch-icon" sizes="180x180" href="/images/tower-day.jpeg" />
        {/* Disable auto-detection */}
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        {/* Smooth scrolling for iOS */}
        <meta name="HandheldFriendly" content="true" />
        {/* Android Chrome theme */}
        <meta name="theme-color" content="#0a0a0f" />
        {/* Microsoft */}
        <meta name="msapplication-TileColor" content="#D86DCB" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body>
        <ThemeProvider>
          <PWAProvider>
            <SkipLink />
            <WebGLBackground theme="dark" interactive particles stars />
            <CustomCursor />
            <div className="grid-overlay" aria-hidden="true" />
            {children}
            <CommandPalette />
            <Chatbot />
            <ShortcutsModal />
            <Toaster />
          </PWAProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
