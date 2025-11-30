'use client'

import { useServiceWorker } from '@/hooks/use-service-worker'
import { useEffect } from 'react'

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const { isOffline } = useServiceWorker()

  useEffect(() => {
    if (isOffline) {
      console.log('[PWA] App is offline')
    }
  }, [isOffline])

  return (
    <>
      {children}
      {/* Offline Banner */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-black px-4 py-2 text-center text-sm font-medium">
          You are currently offline. Some features may be limited.
        </div>
      )}
    </>
  )
}
