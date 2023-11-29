/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
  },
  env: {
    API_URL: 'http://localhost:3000',
  },
}

module.exports = nextConfig
