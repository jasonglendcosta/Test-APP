'use client'

import { useState, useCallback, MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RippleProps {
  children: ReactNode
  className?: string
  color?: string
  duration?: number
  disabled?: boolean
}

interface Ripple {
  x: number
  y: number
  size: number
  id: number
}

export function Ripple({
  children,
  className = '',
  color = 'rgba(216, 109, 203, 0.4)',
  duration = 600,
  disabled = false,
}: RippleProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const createRipple = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (disabled) return

      const element = e.currentTarget
      const rect = element.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      const id = Date.now()

      setRipples(prev => [...prev, { x, y, size, id }])

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id))
      }, duration)
    },
    [disabled, duration]
  )

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onClick={createRipple}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            background: color,
            animationDuration: `${duration}ms`,
          }}
        />
      ))}
    </div>
  )
}
