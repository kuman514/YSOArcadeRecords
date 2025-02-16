import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL!.split('https://')[1]!,
        port: '',
        pathname: '/storage/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
