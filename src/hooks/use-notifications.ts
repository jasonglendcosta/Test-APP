'use client'

import { useState, useCallback, useEffect } from 'react'

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

const STORAGE_KEY = 'one-dev-notifications'

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setNotifications(parsed.map((n: Notification) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        })))
      } catch (e) {
        console.error('Failed to parse notifications:', e)
      }
    } else {
      // Initialize with welcome notification
      const welcome: Notification = {
        id: 'welcome',
        type: 'info',
        title: 'Welcome to ONE Development',
        message: 'Explore the 2026 strategy dashboard. Press ⌘K to search.',
        timestamp: new Date(),
        read: false,
      }
      setNotifications([welcome])
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
    }
  }, [notifications])

  const addNotification = useCallback((
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date(),
      read: false,
    }
    setNotifications(prev => [newNotification, ...prev])
    return newNotification.id
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  }
}
