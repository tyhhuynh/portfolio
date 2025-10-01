import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config: any) => {
    config.module?.rules?.push({
      test: /supabase\/functions\/.*\.ts$/,
      loader: 'ignore-loader',
    });
    return config;
  },
};

export default nextConfig;