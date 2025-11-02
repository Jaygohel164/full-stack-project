  /** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
    serverActions: true, // ✅ Enable Server Actions
  },
  reactStrictMode: true,
  swcMinify: true,
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
