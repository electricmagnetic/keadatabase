"use client";

import { getApiUrl } from "@/app/_components/api/url";

// allauth headless browser API. base path has NO trailing slash.
// TODO(task 0): confirm the live base path / proxy-vs-direct host, then this is the
// only place that changes.
const BASE = "/_allauth/browser/v1";

export const AUTH_PATHS = {
  session: `${BASE}/auth/session`,
  login: `${BASE}/auth/login`,
  signup: `${BASE}/auth/signup`,
  passwordRequest: `${BASE}/auth/password/request`,
  passwordReset: `${BASE}/auth/password/reset`,
  emailVerify: `${BASE}/auth/email/verify`,
  accountEmail: `${BASE}/account/email`,
  accountPasswordChange: `${BASE}/account/password/change`,
} as const;

// allauth success envelope: { status, data, meta }
// allauth error envelope:   { status, errors: [{ code, param, message }] }
export interface AuthResult<T = unknown> {
  ok: boolean;
  status: number;
  data?: T;
  errors?: { code: string; param?: string; message: string }[];
}

/**
 * Read the CSRF token from the cookie set by the backend.
 *
 * Cookie name is the Django default; adjust in task 0 if the backend differs.
 */
function getCsrfToken(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Client-side fetch wrapper for the allauth headless API.
 *
 * Sends the session cookie (`credentials: include`) and CSRF header, and
 * normalises the allauth envelope into {@link AuthResult}. Runs in the browser
 * only — these calls need the session cookie, so they are not server actions.
 */
export async function authFetch<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<AuthResult<T>> {
  const csrf = getCsrfToken();

  const response = await fetch(getApiUrl(path), {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(csrf ? { "X-CSRFToken": csrf } : {}),
      ...init?.headers,
    },
  });

  // allauth always returns JSON for these endpoints; tolerate an empty body
  const body = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    status: response.status,
    data: body?.data,
    errors: body?.errors,
  };
}

/**
 * Turn an {@link AuthResult} into a single human-readable message for a Toast.
 */
export function authErrorMessage(
  result: AuthResult,
  fallback = "Something went wrong. Please try again.",
): string {
  return result.errors?.map((e) => e.message).join(" ") || fallback;
}
