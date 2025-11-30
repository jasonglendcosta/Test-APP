'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale'
  duration?: number
  delay?: number
  className?: string
  stagger?: boolean
  staggerAmount?: number
}

export function ScrollReveal({
  children,
  animation = 'fadeUp',
  duration = 0.8,
  delay = 0,
  className = '',
  stagger = false,
  staggerAmount = 0.1,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const animations = {
      fadeUp: { from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 } },
      fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      slideLeft: { from: { opacity: 0, x: 100 }, to: { opacity: 1, x: 0 } },
      slideRight: { from: { opacity: 0, x: -100 }, to: { opacity: 1, x: 0 } },
      scale: { from: { opacity: 0, scale: 0.8 }, to: { opacity: 1, scale: 1 } },
    }

    const anim = animations[animation]
    const targets = stagger ? element.children : element

    gsap.set(targets, anim.from)

    const tween = gsap.to(targets, {
      ...anim.to,
      duration,
      delay,
      ease: 'power3.out',
      stagger: stagger ? staggerAmount : 0,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      tween.kill()
    }
  }, [animation, duration, delay, stagger, staggerAmount])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
