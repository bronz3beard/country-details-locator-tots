/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{ protocol: 'http', hostname: 'localhost', port: '3000' }],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    deviceSizes: [82, 110, 140, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  },
  env: {
    MAP_BOX_TOKEN: process.env.MAP_BOX_TOKEN,
    SITE_NAME: process.env.SITE_NAME
  }
};

export default nextConfig;
