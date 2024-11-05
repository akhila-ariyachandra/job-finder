import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
    ppr: true,
    dynamicIO: true,
  },
};

export default nextConfig;
