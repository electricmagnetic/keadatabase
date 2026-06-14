import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true, // Required for Django REST Framework which expects trailing slashes

  async rewrites() {
    const backendApiBase = process.env.BACKEND_API_BASE;

    if (!backendApiBase || process.env.NODE_ENV === "production") {
      return [];
    }

    return [
      {
        source: "/api/:path(.*)",
        destination: `${backendApiBase}/:path`,
      },
    ];
  },
};

export default nextConfig;
