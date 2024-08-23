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
  },
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        {
          source: '/',
          destination: '/map'
        }
      ]
    };
  }
  // NOTE:: if we need to see the url updated change to redirect rewrite does the redirect without the URL update in the browser.
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/map',
  //       permanent: true // true for 308 (permanent) redirect, false for 307 (temporary)
  //     }
  //   ];
  // }
};

export default nextConfig;
