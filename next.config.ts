import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ['http://localhost:3000'],
  images: {
    formats: ['image/avif', 'image/webp'],
    // Adds a 384w step so the ~380px photo booth doesn't fall through to 640w.
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  experimental: {
    // Inline the (small) global stylesheet so it doesn't block first render.
    inlineCss: true,
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [{ source: '/', destination: '/portfolio', permanent: true }];
  },
};

export default nextConfig;
