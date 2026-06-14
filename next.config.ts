import type { NextConfig } from 'next';

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convexHostname = convexUrl ? new URL(convexUrl).hostname : undefined;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      ...(convexHostname
        ? [
            {
              protocol: 'https' as const,
              hostname: convexHostname,
            },
          ]
        : []),
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
};

export default nextConfig;
