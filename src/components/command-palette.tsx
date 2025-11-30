'use client'

import { useEffect, useState, useCallback } from 'react'
import { Command } from 'cmdk'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface CommandItem {
  id: string
  label: string
  icon: string
  shortcut?: string[]
  action: () => void
  category: 'navigation' | 'actions' | 'theme' | 'search'
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { setTheme, theme } = useTheme()
  const router = useRouter()

  // Toggle with Cmd+K or Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const commands: CommandItem[] = [
    // Navigation
    { id: 'home', label: 'Go to Overview', icon: '🏠', shortcut: ['G', 'H'], action: () => scrollTo('#overview'), category: 'navigation' },
    { id: 'strategy', label: 'Go to Strategy', icon: '🎯', shortcut: ['G', 'S'], action: () => scrollTo('#strategy'), category: 'navigation' },
    { id: 'initiatives', label: 'Go to Initiatives', icon: '🚀', shortcut: ['G', 'I'], action: () => scrollTo('#initiatives'), category: 'navigation' },
    { id: 'timeline', label: 'Go to Timeline', icon: '📅', shortcut: ['G', 'T'], action: () => scrollTo('#timeline'), category: 'navigation' },
    { id: 'team', label: 'Go to Team', icon: '👥', shortcut: ['G', 'E'], action: () => scrollTo('#team'), category: 'navigation' },

    // Actions
    { id: 'export-pdf', label: 'Export as PDF', icon: '📄', shortcut: ['⌘', 'P'], action: () => triggerExport(), category: 'actions' },
    { id: 'share', label: 'Share Dashboard', icon: '🔗', action: () => copyShareLink(), category: 'actions' },
    { id: 'fullscreen', label: 'Toggle Fullscreen', icon: '⛶', shortcut: ['F'], action: () => toggleFullscreen(), category: 'actions' },
    { id: 'refresh', label: 'Refresh Data', icon: '🔄', shortcut: ['⌘', 'R'], action: () => window.location.reload(), category: 'actions' },

    // Theme
    { id: 'theme-dark', label: 'Dark Mode', icon: '🌙', action: () => setTheme('dark'), category: 'theme' },
    { id: 'theme-light', label: 'Light Mode', icon: '☀️', action: () => setTheme('light'), category: 'theme' },
    { id: 'theme-system', label: 'System Theme', icon: '💻', action: () => setTheme('system'), category: 'theme' },
  ]

  const scrollTo = (id: string) => {
    setOpen(false)
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const triggerExport = () => {
    setOpen(false)
    window.dispatchEvent(new CustomEvent('export-pdf'))
  }

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setOpen(false)
    window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Link copied to clipboard!' } }))
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setOpen(false)
  }

  const runCommand = useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      {/* Trigger hint */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-4 py-2
                   glass glow-border rounded-xl text-sm text-[var(--text-muted)]
                   hover:text-[var(--text)] transition-all hover:scale-105"
      >
        <span>Search</span>
        <kbd className="px-2 py-0.5 rounded bg-white/10 text-xs font-mono">⌘K</kbd>
      </button>

      {/* Command Dialog */}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command Palette"
        className={cn(
          'fixed inset-0 z-50',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity',
            open ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setOpen(false)}
        />

        {/* Dialog */}
        <div className="fixed inset-0 flex items-start justify-center pt-[20vh] px-4">
          <div
            className={cn(
              'w-full max-w-xl glass rounded-2xl border border-white/20 shadow-2xl overflow-hidden transition-all',
              open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            )}
            style={{ boxShadow: '0 25px 50px -12px rgba(216, 109, 203, 0.25)' }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 border-b border-white/10">
              <svg className="w-5 h-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Command.Input
                value={search}
                onValueChange={setSearch}
                placeholder="Type a command or search..."
                className="flex-1 py-4 bg-transparent text-[var(--text)] placeholder-[var(--text-muted)] outline-none text-base"
              />
              <kbd className="px-2 py-1 rounded bg-white/10 text-xs text-[var(--text-muted)] font-mono">ESC</kbd>
            </div>

            {/* Results */}
            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-[var(--text-muted)]">
                No results found.
              </Command.Empty>

              {/* Navigation */}
              <Command.Group heading="Navigation" className="mb-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Navigation
                </div>
                {commands.filter(c => c.category === 'navigation').map(cmd => (
                  <Command.Item
                    key={cmd.id}
                    value={cmd.label}
                    onSelect={() => runCommand(cmd.action)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
                             text-[var(--text)] hover:bg-white/10 data-[selected=true]:bg-white/10
                             transition-colors"
                  >
                    <span className="text-lg">{cmd.icon}</span>
                    <span className="flex-1">{cmd.label}</span>
                    {cmd.shortcut && (
                      <div className="flex gap-1">
                        {cmd.shortcut.map((key, i) => (
                          <kbd key={i} className="px-1.5 py-0.5 rounded bg-white/10 text-xs font-mono">
                            {key}
                          </kbd>
                        ))}
                      </div>
                    )}
                  </Command.Item>
                ))}
              </Command.Group>

              {/* Actions */}
              <Command.Group heading="Actions" className="mb-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Actions
                </div>
                {commands.filter(c => c.category === 'actions').map(cmd => (
                  <Command.Item
                    key={cmd.id}
                    value={cmd.label}
                    onSelect={() => runCommand(cmd.action)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
                             text-[var(--text)] hover:bg-white/10 data-[selected=true]:bg-white/10
                             transition-colors"
                  >
                    <span className="text-lg">{cmd.icon}</span>
                    <span className="flex-1">{cmd.label}</span>
                    {cmd.shortcut && (
                      <div className="flex gap-1">
                        {cmd.shortcut.map((key, i) => (
                          <kbd key={i} className="px-1.5 py-0.5 rounded bg-white/10 text-xs font-mono">
                            {key}
                          </kbd>
                        ))}
                      </div>
                    )}
                  </Command.Item>
                ))}
              </Command.Group>

              {/* Theme */}
              <Command.Group heading="Theme" className="mb-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Theme
                </div>
                {commands.filter(c => c.category === 'theme').map(cmd => (
                  <Command.Item
                    key={cmd.id}
                    value={cmd.label}
                    onSelect={() => runCommand(cmd.action)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors',
                      'text-[var(--text)] hover:bg-white/10 data-[selected=true]:bg-white/10',
                      theme === cmd.id.replace('theme-', '') && 'bg-[var(--primary)]/20'
                    )}
                  >
                    <span className="text-lg">{cmd.icon}</span>
                    <span className="flex-1">{cmd.label}</span>
                    {theme === cmd.id.replace('theme-', '') && (
                      <span className="text-[var(--primary)]">✓</span>
                    )}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">↵</kbd> Select
                </span>
              </div>
              <span className="text-[var(--primary)]">ONE Development</span>
            </div>
          </div>
        </div>
      </Command.Dialog>
    </>
  )
}
