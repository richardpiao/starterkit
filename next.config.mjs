/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode for catching bugs
  reactStrictMode: true,

  // Type-safe routes
  typedRoutes: true,

  // Security headers
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add your image domains here
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
    ],
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // ESLint during builds
  eslint: {
    // Fail build on lint errors
    ignoreDuringBuilds: false,
  },

  // TypeScript strict build
  typescript: {
    // Fail build on type errors
    ignoreBuildErrors: false,
  },

  // Output configuration for Docker
  output: "standalone",

  // Workspace root for file tracing
  outputFileTracingRoot: "/Users/richard/Desktop/projects/starterkit",
};

export default nextConfig;
