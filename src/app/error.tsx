'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-8 glow-border max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl gradient-btn mx-auto mb-6">
          !
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-400 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="gradient-btn px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
