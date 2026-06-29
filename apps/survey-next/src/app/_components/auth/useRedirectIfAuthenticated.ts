"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "./useSession";

/**
 * Bounce already-logged-in users away from the login / signup pages.
 *
 * Returns true while the form should be withheld: during the session check and
 * once a redirect is pending. This avoids flashing the form before an
 * already-logged-in user is bounced away.
 */
export function useRedirectIfAuthenticated(to = "/account") {
  const { isAuthenticated, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) router.replace(to);
  }, [loading, isAuthenticated, to, router]);

  return loading || isAuthenticated;
}
