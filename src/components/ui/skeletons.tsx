'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  style?: React.CSSProperties
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, style }) => (
  <div
    className={cn(
      'animate-pulse rounded-xl bg-white/5',
      className
    )}
    style={style}
  />
)

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('glass rounded-2xl p-5 glow-border', className)}>
    <div className="flex items-center justify-between mb-3">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <Skeleton className="w-16 h-5" />
    </div>
    <Skeleton className="w-24 h-4 mb-2" />
    <Skeleton className="w-32 h-8" />
  </div>
)

export const ChartSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('glass rounded-2xl p-6 glow-border', className)}>
    <Skeleton className="w-40 h-6 mb-4" />
    <div className="flex items-end gap-2 h-48">
      {[...Array(8)].map((_, i) => (
        <Skeleton
          key={i}
          className="flex-1 rounded-t-lg"
          style={{ height: `${Math.random() * 60 + 40}%` }}
        />
      ))}
    </div>
  </div>
)

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="glass rounded-2xl p-4 glow-border">
    <div className="flex gap-4 mb-4 pb-3 border-b border-white/10">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex gap-4 py-3">
        {[...Array(4)].map((_, j) => (
          <Skeleton key={j} className="h-4 flex-1" />
        ))}
      </div>
    ))}
  </div>
)

export const HeroSkeleton: React.FC = () => (
  <div className="text-center py-16">
    <Skeleton className="w-20 h-20 mx-auto rounded-2xl mb-6" />
    <Skeleton className="w-64 h-10 mx-auto mb-4" />
    <Skeleton className="w-96 h-6 mx-auto" />
  </div>
)
