/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/SRC_web.io',  // Updated to actual repository name
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
