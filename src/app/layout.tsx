import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'ONE DEVELOPMENT | Strategic Platform 2026',
  description: 'ONE DEVELOPMENT - 2026 Digital Transformation & AI Strategy',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#D86DCB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-animation" />
        <div className="grid-overlay" />
        {children}
      </body>
    </html>
  )
}
