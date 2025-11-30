'use client'

import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--dark-elevated)',
          border: '1px solid rgba(216, 109, 203, 0.3)',
          color: 'var(--text)',
          backdropFilter: 'blur(20px)',
        },
        classNames: {
          toast: 'glass glow-border',
          title: 'text-white font-semibold',
          description: 'text-gray-400',
          actionButton: 'gradient-btn',
          cancelButton: 'bg-white/10',
        },
      }}
      theme="dark"
    />
  )
}

// Re-export toast function for convenience
export { toast } from 'sonner'
