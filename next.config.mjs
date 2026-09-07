/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    // Left on deliberately: it was added to fix production 404s on Netlify, and
    // flipping it blind risks a repeat. The heavy assets are now pre-sized WebP
    // (the 3.1 MB hero PNG is 190 KB at identical dimensions), so the LCP win is
    // already banked. Revisit with a real Netlify deploy preview.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  
  // Compression
  compress: true,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-bootstrap'],
  },
  
  async redirects() {
    return [
      {
        source: '/IoannisPastellasCV.pdf',
        destination: '/IoannisPastellas_CV.pdf',
        permanent: true,
      },
    ];
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
