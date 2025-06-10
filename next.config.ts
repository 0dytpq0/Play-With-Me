import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        'https://lpbtuwmdvmxwwhsqyuja.supabase.co/storage/v1/object/public/profile/**'
      ),
    ],
  },
};

export default nextConfig;
