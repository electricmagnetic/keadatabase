"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "./useSession";
import { Spinner } from "@/app/_components/ui/Spinner";

/**
 * Renders children only for logged-in users.
 *
 * Anonymous users are sent to /login?next=<current url> and land back on the
 * page they came from after logging in (LoginForm honours ?next=).
 */
export function RequireAuth({ children }: React.PropsWithChildren) {
  const { isAuthenticated, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (loading || isAuthenticated) return;
    // window is safe here: effects only run client-side
    const next = window.location.pathname + window.location.search;
    router.replace(`/login?next=${encodeURIComponent(next)}`);
  }, [loading, isAuthenticated, router]);

  // spinner while checking the session or waiting on the redirect (no flash)
  if (!isAuthenticated) return <Spinner />;
  return <>{children}</>;
}
