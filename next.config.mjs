/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-45c507c035214836bf31cb43c8f8946b.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-971a12e433134135b6dce1159d9d07e0.r2.dev',
      },
    ],
  },
};

export default nextConfig;
