"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { authFetch, AUTH_PATHS } from "./client";
import { useSession } from "./useSession";
import { Spinner } from "@/app/_components/ui/Spinner";

type Status = "verifying" | "success" | "error" | "no-key";

/**
 * Verifies an email using the `?key=` from the emailed link. With no key it
 * shows the "check your inbox" message used right after signup.
 */
export function EmailVerify({ verifyKey }: { verifyKey?: string }) {
  const { refresh } = useSession();
  const [status, setStatus] = useState<Status>(
    verifyKey ? "verifying" : "no-key",
  );

  useEffect(() => {
    if (!verifyKey) return;
    let active = true;
    (async () => {
      const result = await authFetch(AUTH_PATHS.emailVerify, {
        method: "POST",
        body: JSON.stringify({ key: verifyKey }),
      });
      if (!active) return;
      setStatus(result.ok ? "success" : "error");
      if (result.ok) await refresh();
    })();
    return () => {
      active = false;
    };
  }, [verifyKey, refresh]);

  switch (status) {
    case "verifying":
      return <Spinner />;
    case "success":
      return (
        <p className="auth-form__message">
          Your email is verified. <Link href="/account">Go to your account</Link>.
        </p>
      );
    case "error":
      return (
        <p className="auth-form__message auth-form__message--error">
          This verification link is invalid or has expired. You can request a new
          one from your <Link href="/account">account page</Link>.
        </p>
      );
    case "no-key":
    default:
      return (
        <p className="auth-form__message">
          We&apos;ve sent a verification link to your email address. Open it to
          confirm your account.
        </p>
      );
  }
}
