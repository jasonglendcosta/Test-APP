'use client'

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200]
                 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--primary)] focus:text-white
                 focus:outline-none focus:ring-2 focus:ring-white/50"
    >
      Skip to main content
    </a>
  )
}
