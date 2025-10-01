import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  exclude: ['supabase/**/*'],
};

export default nextConfig;