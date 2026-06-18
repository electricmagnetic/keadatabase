import type { NextConfig } from "next";

const getApiBase = () => {
  const apiBase = process.env.API_BASE;
  if (!apiBase) throw new Error("Missing API_BASE environment variable");
  return apiBase;
};
const nextConfig: NextConfig = {
  reactCompiler: true,
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: `${getApiBase()}/:path*`,
    },
  ],
};

export default nextConfig;
