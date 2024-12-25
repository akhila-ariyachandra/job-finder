import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    authInterrupts: true,
  },
  eslint: {
    dirs: ["app", "components", "lib", "hooks", "db"],
  },
};

export default nextConfig;
