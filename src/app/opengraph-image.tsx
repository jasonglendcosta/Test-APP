import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ONE Development - Strategic Platform 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a24 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 70%, rgba(216, 109, 203, 0.3) 0%, transparent 50%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            background: 'linear-gradient(135deg, #D86DCB, #A02B93)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 32,
            boxShadow: '0 8px 32px rgba(216, 109, 203, 0.5)',
          }}
        >
          O
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #D86DCB, #A02B93)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 16,
          }}
        >
          ONE DEVELOPMENT
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: '#8a8a9a',
          }}
        >
          Strategic Platform 2026
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 20,
            color: '#D86DCB',
            marginTop: 24,
          }}
        >
          Digital Transformation & AI Strategy
        </div>
      </div>
    ),
    { ...size }
  )
}
