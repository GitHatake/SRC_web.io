/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/SRC_web.io',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
