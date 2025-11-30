'use client'

import { useEffect, useCallback } from 'react'

export interface Shortcut {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  action: () => void
  description: string
  category: string
}

const shortcuts: Shortcut[] = [
  // Navigation
  { key: 'g', description: 'Go to Overview', category: 'Navigation', action: () => scrollTo('#overview') },
  { key: 'h', description: 'Go to Home/Top', category: 'Navigation', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },

  // Actions
  { key: 'k', metaKey: true, description: 'Open Command Palette', category: 'Actions', action: () => {} }, // Handled by cmdk
  { key: 'k', ctrlKey: true, description: 'Open Command Palette', category: 'Actions', action: () => {} },
  { key: '/', description: 'Focus Search', category: 'Actions', action: () => document.querySelector<HTMLInputElement>('[data-search]')?.focus() },
  { key: 'Escape', description: 'Close Modal/Dialog', category: 'Actions', action: () => {} },

  // Theme
  { key: 'd', shiftKey: true, description: 'Toggle Dark Mode', category: 'Theme', action: () => window.dispatchEvent(new CustomEvent('toggle-theme')) },
]

function scrollTo(selector: string) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export function useKeyboardShortcuts(customShortcuts: Shortcut[] = []) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ignore when typing in inputs
    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return
    }

    const allShortcuts = [...shortcuts, ...customShortcuts]

    for (const shortcut of allShortcuts) {
      const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase()
      const ctrlMatch = shortcut.ctrlKey ? e.ctrlKey : !e.ctrlKey
      const metaMatch = shortcut.metaKey ? e.metaKey : !e.metaKey
      const shiftMatch = shortcut.shiftKey ? e.shiftKey : !e.shiftKey
      const altMatch = shortcut.altKey ? e.altKey : !e.altKey

      if (keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch) {
        // Don't prevent default for cmd+k (let cmdk handle it)
        if (!(shortcut.key === 'k' && (shortcut.metaKey || shortcut.ctrlKey))) {
          e.preventDefault()
          shortcut.action()
        }
        break
      }
    }
  }, [customShortcuts])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return shortcuts
}

export function getShortcutsByCategory(): Record<string, Shortcut[]> {
  return shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = []
    }
    acc[shortcut.category].push(shortcut)
    return acc
  }, {} as Record<string, Shortcut[]>)
}
