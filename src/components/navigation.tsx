'use client'

import { useState } from 'react'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Strategy', href: '#strategy' },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Team', href: '#team' },
]

export function Navigation() {
  const { isScrolled, scrollDirection } = useScrollPosition()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-[var(--dark)]/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent',
          scrollDirection === 'down' && isScrolled ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white gradient-btn">
                O
              </div>
              <span className="font-grotesk font-bold text-lg text-[var(--text)] hidden sm:block">
                ONE DEVELOPMENT
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-muted)]
                           hover:text-[var(--text)] hover:bg-white/5 transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10
                         flex items-center justify-center hover:bg-white/10 transition-all"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={cn(
                      'w-full h-0.5 bg-[var(--text)] transition-all origin-left',
                      mobileMenuOpen && 'rotate-45 translate-y-0.5'
                    )}
                  />
                  <span
                    className={cn(
                      'w-full h-0.5 bg-[var(--text)] transition-all',
                      mobileMenuOpen && 'opacity-0'
                    )}
                  />
                  <span
                    className={cn(
                      'w-full h-0.5 bg-[var(--text)] transition-all origin-left',
                      mobileMenuOpen && '-rotate-45 -translate-y-0.5'
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            mobileMenuOpen ? 'max-h-96' : 'max-h-0'
          )}
        >
          <div className="px-4 py-4 space-y-1 bg-[var(--dark-surface)]/95 backdrop-blur-xl border-t border-white/10">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-[var(--text-muted)]
                         hover:text-[var(--text)] hover:bg-white/5 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />
    </>
  )
}
