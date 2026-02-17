
/** @type {import('next').NextConfig} */

// Security Headers
const securityHeaders = [
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    },
    {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin'
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    },
    {
        key: 'Content-Security-Policy',
        // Strict CSP that allows necessary scripts/styles but blocks unknown sources
        // "unsafe-inline" and "unsafe-eval" might be needed for some libs (like Framer Motion or Three.js) so we use a balanced approach
        value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://www.google.com https://api.microlink.io https://*.microlink.io https://*.s3.amazonaws.com https://*.s3.us-east-1.amazonaws.com;
      font-src 'self' data:;
      worker-src 'self';
      connect-src 'self' https://api.zeptomail.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      block-all-mixed-content;
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim()
    }
];

const nextConfig = {
    reactStrictMode: false, // FALSE to prevent double-rendering 3D scenes
    experimental: {
        // Tree-shake large packages at the module level — reduces bundle size
        // on every page that uses lucide-react, framer-motion, or drei icons.
        optimizePackageImports: ["lucide-react", "framer-motion", "@react-three/drei"],
    },
    compiler: {
        // Strip all console.* calls in production builds
        removeConsole: process.env.NODE_ENV === "production",
    },
    images: {
        // Allow Next.js <Image> to optimise screenshots from Microlink's CDN
        remotePatterns: [
            { protocol: "https", hostname: "api.microlink.io" },
            { protocol: "https", hostname: "*.microlink.io" },
        ],
        formats: ["image/avif", "image/webp"],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
