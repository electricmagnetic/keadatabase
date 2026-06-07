/**
 * Get the API base URL for fetch requests
 *
 * - Client-side: Uses /api proxy (NEXT_PUBLIC_API_BASE)
 * - Server-side: Uses direct backend URL (BACKEND_API_BASE)
 *
 * This avoids CORS issues on the client while allowing server-side
 * components and actions to make direct requests to the backend.
 */
export function getApiBaseUrl(): string {
  // Check if we're on the server
  const isServer = typeof window === "undefined";

  if (isServer) {
    // Server-side: use direct backend URL (no CORS issues)
    return process.env.BACKEND_API_BASE || process.env.NEXT_PUBLIC_API_BASE || "";
  } else {
    // Client-side: use proxy path
    return process.env.NEXT_PUBLIC_API_BASE || "";
  }
}

/**
 * Construct a full API URL
 *
 * @param path - API path (e.g., "/surveys/surveys/")
 * @returns Full URL for fetch
 */
export function getApiUrl(path: string): string {
  const base = getApiBaseUrl();
  // Remove leading slash from path if base doesn't end with slash
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}/${cleanPath}`;
}
