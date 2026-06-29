import { type NextRequest, NextResponse } from "next/server";

// Dev-only proxy to the backend. Replaces next.config rewrites() because
// rewrites can't rewrite Set-Cookie: the backend issues csrftoken/sessionid
// scoped to `Domain=keasurvey.nz; Secure`, which a browser on http://localhost
// can never store or send — breaking CSRF (403 on signup/login). Here we strip
// Domain and Secure so the cookie is stored under localhost.
//
// In production NEXT_PUBLIC_API_BASE is a full backend URL, so this route is
// never hit.

const BACKEND = process.env.BACKEND_API_BASE;

async function proxy(req: NextRequest) {
  if (!BACKEND) {
    return NextResponse.json({ error: "BACKEND_API_BASE not set" }, { status: 500 });
  }

  // forward the path verbatim: allauth endpoints 404 on a trailing slash,
  // DRF endpoints 301 without one. Callers already include (or omit) the slash.
  const pathname = req.nextUrl.pathname.replace(/^\/api\//, "");
  const target = `${BACKEND}/${pathname}${req.nextUrl.search}`;
  const backendHost = new URL(BACKEND).host;

  // present the request as if it came from the backend's own origin: Django's
  // ALLOWED_HOSTS rejects the localhost Host (400), and allauth's CSRF check
  // compares Origin against the host. Forward localhost identifiers stripped.
  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("x-forwarded-host");
  headers.delete("x-forwarded-proto");
  headers.set("host", backendHost);
  // Django does strict Referer checking for CSRF over HTTPS — always send one
  // matching the backend origin (a real browser sends localhost, which fails).
  headers.set("origin", `${new URL(BACKEND).protocol}//${backendHost}`);
  headers.set("referer", `${BACKEND}/`);

  const upstream = await fetch(target, {
    method: req.method,
    headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : await req.text(),
    redirect: "manual",
  });

  const res = new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
  });

  upstream.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (k === "set-cookie") return; // handled below
    // Node's fetch already decoded the body, so the upstream content-encoding
    // and content-length describe the *compressed* bytes. Forwarding them makes
    // the browser truncate the decoded body to the shorter compressed length
    // (e.g. the session payload gets cut off → invalid JSON). Drop both and let
    // Next.js set content-length for the body we actually send.
    if (k === "content-encoding" || k === "content-length") return;
    res.headers.set(key, value);
  });

  // strip Domain= and Secure so localhost can store the cookie
  const setCookie = upstream.headers.getSetCookie?.() ?? [];
  for (const cookie of setCookie) {
    const rewritten = cookie
      .replace(/;\s*Domain=[^;]+/i, "")
      .replace(/;\s*Secure/i, "");
    res.headers.append("set-cookie", rewritten);
  }

  return res;
}

const handler = (req: NextRequest) => proxy(req);

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as OPTIONS,
};
