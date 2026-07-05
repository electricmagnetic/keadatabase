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
  meta?: { is_authenticated?: boolean; session_token?: string };
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

/** GET the session to make the backend set a fresh csrftoken cookie. */
async function primeCsrf(): Promise<void> {
  await fetch(getApiUrl(AUTH_PATHS.session), { credentials: "include" });
}

/** Issue the actual auth request with the current csrftoken. */
async function sendAuth(path: string, init?: RequestInit): Promise<Response> {
  const csrf = getCsrfToken();
  return fetch(getApiUrl(path), {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(csrf ? { "X-CSRFToken": csrf } : {}),
      ...init?.headers,
    },
  });
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
  // prime the csrftoken cookie before a mutating call (see priming note below)
  if (!getCsrfToken() && path !== AUTH_PATHS.session) {
    await primeCsrf();
  }

  let response = await sendAuth(path, init);
  let body = await response.json().catch(() => null);

  // a missing OR stale csrftoken gets a Django HTML 403 (not allauth JSON).
  // Pages entered cold from an emailed link (password reset, email verify) hit
  // this. Re-prime the cookie once and retry before giving up.
  if (body == null && path !== AUTH_PATHS.session) {
    await primeCsrf();
    response = await sendAuth(path, init);
    body = await response.json().catch(() => null);
  }

  if (body == null) {
    return {
      ok: false,
      status: response.status,
      errors: [
        {
          code: "non_json_response",
          message: "Could not reach the server. Please refresh and try again.",
        },
      ],
    };
  }

  return {
    ok: response.ok,
    status: response.status,
    data: body?.data,
    meta: body?.meta,
    errors: body?.errors,
  };
}

// DRF profile endpoint (plain JSON, not the allauth envelope)
export const PROFILE_PATH = "/me/";

/**
 * Fetch the DRF profile endpoint with session cookie + CSRF header.
 *
 * Unlike allauth, DRF returns the payload directly and errors as
 * `{ field: ["message"] }` / `{ detail: "message" }`; normalise both into
 * {@link AuthResult} so `authErrorMessage` keeps working.
 */
export async function profileFetch<T = unknown>(
  init?: RequestInit,
): Promise<AuthResult<T>> {
  if (!getCsrfToken()) await primeCsrf();
  const response = await sendAuth(PROFILE_PATH, init);
  const body = await response.json().catch(() => null);

  if (response.ok) {
    return { ok: true, status: response.status, data: body };
  }
  const errors = body
    ? Object.entries(body).flatMap(([param, messages]) =>
        (Array.isArray(messages) ? messages : [String(messages)]).map(
          (message) => ({ code: param, param, message }),
        ),
      )
    : undefined;
  return { ok: false, status: response.status, errors };
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
