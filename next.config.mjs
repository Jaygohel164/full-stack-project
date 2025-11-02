  /** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: "nodejs",
  experimental: {
    serverActions: true,
  },
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
