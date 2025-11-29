import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'ONE DEVELOPMENT | Strategic Platform 2026',
  description: 'ONE DEVELOPMENT - 2026 Digital Transformation & AI Strategy',
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
    <html lang="en" className="dark">
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
        <div className="bg-animation" />
        <div className="grid-overlay" />
        {children}
      </body>
    </html>
  )
}
