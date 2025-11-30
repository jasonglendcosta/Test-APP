'use client'

import { cn } from '@/lib/utils'

interface LiveIndicatorProps {
  isLive?: boolean
  isValidating?: boolean
  lastUpdated?: string
  onRefresh?: () => void
  className?: string
}

export function LiveIndicator({
  isLive = true,
  isValidating = false,
  lastUpdated,
  onRefresh,
  className = '',
}: LiveIndicatorProps) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Live indicator dot */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <div
            className={cn(
              'w-2.5 h-2.5 rounded-full',
              isLive ? 'bg-green-500' : 'bg-yellow-500'
            )}
          />
          {isLive && !isValidating && (
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
          )}
        </div>
        <span className="text-sm text-[var(--text-muted)]">
          {isValidating ? 'Updating...' : isLive ? 'Live' : 'Offline'}
        </span>
      </div>

      {/* Last updated */}
      {lastUpdated && (
        <span className="text-xs text-[var(--text-muted)]">
          Updated {formatTime(lastUpdated)}
        </span>
      )}

      {/* Refresh button */}
      {onRefresh && (
        <button
          onClick={onRefresh}
          disabled={isValidating}
          className={cn(
            'p-1.5 rounded-lg hover:bg-white/10 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="Refresh data"
        >
          <svg
            className={cn('w-4 h-4 text-[var(--text-muted)]', isValidating && 'animate-spin')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
