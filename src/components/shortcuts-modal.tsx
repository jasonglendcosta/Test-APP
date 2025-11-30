'use client'

import { useState, useEffect } from 'react'
import { getShortcutsByCategory } from '@/hooks/use-keyboard-shortcuts'
import { cn } from '@/lib/utils'

export function ShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false)
  const shortcutsByCategory = getShortcutsByCategory()

  // Open with ? key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault()
          setIsOpen(prev => !prev)
        }
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const formatKey = (shortcut: { key: string; ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean; altKey?: boolean }) => {
    const parts = []
    if (shortcut.metaKey) parts.push('⌘')
    if (shortcut.ctrlKey) parts.push('Ctrl')
    if (shortcut.shiftKey) parts.push('⇧')
    if (shortcut.altKey) parts.push('⌥')
    parts.push(shortcut.key.toUpperCase())
    return parts
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-lg glass rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
          style={{ boxShadow: '0 25px 50px -12px rgba(216, 109, 203, 0.25)' }}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--text)]">Keyboard Shortcuts</h2>
              <p className="text-sm text-[var(--text-muted)]">Navigate faster with shortcuts</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto space-y-6">
            {Object.entries(shortcutsByCategory).map(([category, shortcuts]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-[var(--primary)] uppercase tracking-wider mb-3">
                  {category}
                </h3>
                <div className="space-y-2">
                  {shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5"
                    >
                      <span className="text-sm text-[var(--text)]">{shortcut.description}</span>
                      <div className="flex gap-1">
                        {formatKey(shortcut).map((key, i) => (
                          <kbd
                            key={i}
                            className="px-2 py-1 rounded bg-white/10 text-xs font-mono text-[var(--text-muted)]"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">?</kbd> to toggle this dialog</span>
            <span className="text-[var(--primary)]">ONE Development</span>
          </div>
        </div>
      </div>
    </>
  )
}
