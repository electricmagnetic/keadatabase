import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true, // Required for Django REST Framework which expects trailing slashes
  // don't 308-redirect /api/...signup -> /api/...signup/ : allauth endpoints
  // 404 on a trailing slash. The proxy forwards the path verbatim instead.
  skipTrailingSlashRedirect: true,
  // dev /api proxy lives in src/app/api/[...path]/route.ts (it must rewrite
  // Set-Cookie, which rewrites() can't do).
};

export default nextConfig;
