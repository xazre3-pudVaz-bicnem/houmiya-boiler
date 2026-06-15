/** @type {import('next').NextConfig} */
const nextConfig = {
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
