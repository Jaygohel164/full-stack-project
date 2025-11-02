/** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: "nodejs",
  reactStrictMode: true,

  experimental: {
    serverActions: {
      allowedOrigins: ['*'],   // allow all origins (optional)
      bodySizeLimit: '2mb',    // optional
    },
    serverActions: true, // ✅ this actually enables the feature
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
