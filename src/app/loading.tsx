import { CardSkeleton, ChartSkeleton, HeroSkeleton } from '@/components/ui/skeletons'

export default function Loading() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Skeleton */}
        <HeroSkeleton />

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    </main>
  )
}
