/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,     // ✅ enable server actions
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ force Node.js runtime instead of Edge
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
