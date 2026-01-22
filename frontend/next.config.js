/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'search1.kakaocdn.net',
      'image.aladin.co.kr',
      'www.nl.go.kr',
      'cover.nl.go.kr'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.kakaocdn.net',
      },
      {
        protocol: 'http',
        hostname: '**.aladin.co.kr',
      }
    ]
  },
}

module.exports = nextConfig
