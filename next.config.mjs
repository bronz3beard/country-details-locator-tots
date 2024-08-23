/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MAP_BOX_TOKEN: process.env.MAP_BOX_TOKEN
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
