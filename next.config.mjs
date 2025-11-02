  /** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ force Node.js runtime
  runtime: "nodejs",
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.unsplash.com"
          },
          {
            protocol: "https",
            hostname: "utfs.io"
          },
          {
            protocol: "https",
            hostname: "lh3.googleusercontent.com"
          }
        ]
      }
    };


export default nextConfig;
