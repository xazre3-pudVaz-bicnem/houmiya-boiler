/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // yokohama 旧URL → 新URL（trouble サブディレクトリ）
      { source: '/area/yokohama/no-hot-water', destination: '/area/yokohama/trouble/no-hot-water', permanent: true },
      { source: '/area/yokohama/error-111', destination: '/area/yokohama/trouble/error-111', permanent: true },
      { source: '/area/yokohama/water-leak', destination: '/area/yokohama/trouble/water-leak', permanent: true },
      // yokohama 旧URL → 新URL（type サブディレクトリ）
      { source: '/area/yokohama/mansion-ps', destination: '/area/yokohama/type/mansion-ps', permanent: true },
      { source: '/area/yokohama/wall-mounted', destination: '/area/yokohama/type/wall-mounted', permanent: true },
      { source: '/area/yokohama/eco-jaws', destination: '/area/yokohama/type/eco-jaws', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'images.microcms-assets.io' },
      { protocol: 'https', hostname: 'www.noritz.co.jp' },
      { protocol: 'https', hostname: 'wp.houmiya-boiler.com' },
    ],
  },
}

export default nextConfig
