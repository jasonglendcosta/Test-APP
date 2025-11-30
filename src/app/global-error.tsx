'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className="dark">
      <body style={{ background: '#0a0a0f', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
        <main style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '28rem',
            width: '100%',
            textAlign: 'center',
            border: '1px solid rgba(216, 109, 203, 0.3)',
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              background: 'linear-gradient(135deg, #D86DCB, #A02B93)',
              margin: '0 auto 1.5rem',
            }}>
              !
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Critical Error
            </h2>
            <p style={{ color: '#8a8a9a', marginBottom: '1.5rem' }}>
              A critical error occurred. Please refresh the page.
            </p>
            <button
              onClick={reset}
              style={{
                background: 'linear-gradient(135deg, #D86DCB, #A02B93)',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: 600,
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
