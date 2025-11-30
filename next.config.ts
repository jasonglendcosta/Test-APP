import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Optimize package imports (tree-shaking)
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'gsap',
      'cmdk',
      'fuse.js',
      'recharts',
    ],
  },

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enable compression
  compress: true,

  // Power optimizations
  poweredByHeader: false,

  // Generate ETags for caching
  generateEtags: true,
}

export default nextConfig
