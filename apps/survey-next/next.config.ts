import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  async rewrites() {
    const backendApiBase = process.env.BACKEND_API_BASE;

    if (!backendApiBase || process.env.NODE_ENV === "production") {
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${backendApiBase}/:path*`,
      },
    ];
  },
};

export default nextConfig;
