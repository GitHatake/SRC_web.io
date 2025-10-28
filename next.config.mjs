/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 例: リポジトリ名が "scout-portal" の場合、basePath: '/scout-portal'
  // ユーザードメイン（username.github.io）の場合は basePath: '' のまま
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
