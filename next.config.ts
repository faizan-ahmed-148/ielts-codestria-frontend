import type { NextConfig } from "next";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Proxy the NestJS API so the auth cookie stays same-origin.
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/api/:path*` }];
  },
};

export default nextConfig;
