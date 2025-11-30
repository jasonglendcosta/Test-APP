'use client'

import { useEffect, useRef, useCallback } from 'react'

interface TiltOptions {
  max?: number
  scale?: number
  speed?: number
  glare?: boolean
  maxGlare?: number
}

export function useTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T>(null)
  const {
    max = 15,
    scale = 1.02,
    speed = 400,
    glare = true,
    maxGlare = 0.3,
  } = options

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -max
      const rotateY = ((x - centerX) / centerX) * max

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`

      if (glare) {
        const glareElement = element.querySelector('.tilt-glare') as HTMLElement
        if (glareElement) {
          const glareOpacity = Math.min(
            (Math.abs(rotateX) + Math.abs(rotateY)) / (max * 2),
            1
          ) * maxGlare
          const glareAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI)
          glareElement.style.opacity = String(glareOpacity)
          glareElement.style.transform = `rotate(${glareAngle + 90}deg)`
        }
      }
    },
    [max, scale, glare, maxGlare]
  )

  const handleMouseLeave = useCallback(() => {
    const element = ref.current
    if (!element) return

    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    element.style.transition = `transform ${speed}ms ease-out`

    if (glare) {
      const glareElement = element.querySelector('.tilt-glare') as HTMLElement
      if (glareElement) {
        glareElement.style.opacity = '0'
      }
    }
  }, [speed, glare])

  const handleMouseEnter = useCallback(() => {
    const element = ref.current
    if (!element) return
    element.style.transition = 'none'
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.style.transformStyle = 'preserve-3d'
    element.style.willChange = 'transform'

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter])

  return ref
}
