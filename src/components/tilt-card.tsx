'use client'

import { ReactNode } from 'react'
import { useTilt } from '@/hooks/use-tilt'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: ReactNode
  className?: string
  glare?: boolean
  max?: number
  scale?: number
}

export function TiltCard({
  children,
  className = '',
  glare = true,
  max = 10,
  scale = 1.02,
}: TiltCardProps) {
  const tiltRef = useTilt<HTMLDivElement>({ max, scale, glare })

  return (
    <div ref={tiltRef} className={cn('relative overflow-hidden', className)}>
      {children}
      {glare && (
        <div
          className="tilt-glare absolute inset-0 pointer-events-none opacity-0 transition-opacity"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
          }}
        />
      )}
    </div>
  )
}
