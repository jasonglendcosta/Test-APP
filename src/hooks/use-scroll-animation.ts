'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationOptions {
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'stagger'
  duration?: number
  delay?: number
  staggerAmount?: number
  once?: boolean
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null)
  const {
    animation = 'fadeUp',
    duration = 0.8,
    delay = 0,
    staggerAmount = 0.1,
    once = true,
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const animations = {
      fadeUp: {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0 },
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      slideLeft: {
        from: { opacity: 0, x: 100 },
        to: { opacity: 1, x: 0 },
      },
      slideRight: {
        from: { opacity: 0, x: -100 },
        to: { opacity: 1, x: 0 },
      },
      scale: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
      },
      stagger: {
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0, stagger: staggerAmount },
      },
    }

    const anim = animations[animation]

    gsap.set(element, anim.from)

    const tween = gsap.to(element, {
      ...anim.to,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [animation, duration, delay, staggerAmount, once])

  return ref
}

export function useCountAnimation(
  endValue: number,
  options: { duration?: number; delay?: number } = {}
) {
  const ref = useRef<HTMLElement>(null)
  const { duration = 2, delay = 0 } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const obj = { value: 0 }

    const tween = gsap.to(obj, {
      value: endValue,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toLocaleString()
      },
    })

    return () => {
      tween.kill()
    }
  }, [endValue, duration, delay])

  return ref
}
