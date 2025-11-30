'use client'

import { useState } from 'react'
import { useNotifications, Notification } from '@/hooks/use-notifications'
import { cn } from '@/lib/utils'

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  } = useNotifications()

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '✓'
      case 'warning': return '⚠'
      case 'error': return '✕'
      default: return 'ℹ'
    }
  }

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-500/20 text-green-400'
      case 'warning': return 'bg-yellow-500/20 text-yellow-400'
      case 'error': return 'bg-red-500/20 text-red-400'
      default: return 'bg-blue-500/20 text-blue-400'
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative w-10 h-10 rounded-xl bg-white/5 border border-white/10',
          'flex items-center justify-center transition-all',
          'hover:bg-white/10 hover:scale-105'
        )}
        aria-label="Notifications"
      >
        <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>

        {/* Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 mt-2 w-80 max-h-96 z-50 glass rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-semibold text-[var(--text)]">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-[var(--primary)] hover:underline"
                  >
                    Mark all read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="max-h-72 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="py-8 text-center text-[var(--text-muted)]">
                  <span className="text-3xl block mb-2">🔔</span>
                  No notifications
                </div>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={cn(
                      'px-4 py-3 border-b border-white/5 cursor-pointer transition-colors',
                      'hover:bg-white/5',
                      !notification.read && 'bg-[var(--primary)]/5'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-sm', getIconColor(notification.type))}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={cn('text-sm font-medium truncate', notification.read ? 'text-[var(--text-muted)]' : 'text-[var(--text)]')}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                          )}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-1 opacity-60">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeNotification(notification.id)
                        }}
                        className="text-[var(--text-muted)] hover:text-[var(--text)] p-1"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
