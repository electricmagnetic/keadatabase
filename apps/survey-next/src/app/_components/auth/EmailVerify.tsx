"use client";

import { useState } from "react";
import Link from "next/link";

import { authFetch, AUTH_PATHS } from "./client";
import { useSession } from "./useSession";
import { Spinner } from "@/app/_components/ui/Spinner";

type Status = "idle" | "verifying" | "success" | "error";

/**
 * Verifies an email using the key from the allauth confirmation link.
 *
 * Verification requires a button click rather than firing on load: corporate
 * mail scanners (Outlook safe-links etc.) prefetch the link, and the key is
 * single-use — auto-confirming would consume it before the user ever sees
 * the page.
 */
export function EmailVerify({ verifyKey }: { verifyKey: string }) {
  const { refresh } = useSession();
  const [status, setStatus] = useState<Status>("idle");

  const confirm = async () => {
    setStatus("verifying");
    const result = await authFetch(AUTH_PATHS.emailVerify, {
      method: "POST",
      body: JSON.stringify({ key: verifyKey }),
    });
    // allauth returns 401 with a flows envelope on SUCCESS: the email is
    // verified but you're not logged in, so it reports "now authenticate".
    // A genuine bad/expired key returns 400 with `errors`.
    const ok = result.ok || result.status === 401;
    setStatus(ok ? "success" : "error");
    if (ok) await refresh();
  };

  switch (status) {
    case "idle":
      return (
        <>
          <p className="auth-form__message">
            Click the button below to confirm your email address.
          </p>
          <button type="button" className="btn btn--primary" onClick={confirm}>
            Confirm email
          </button>
        </>
      );
    case "verifying":
      return <Spinner />;
    case "success":
      return (
        <p className="auth-form__message">
          Your email is verified. You can now{" "}
          <Link href="/login">log in</Link>.
        </p>
      );
    case "error":
    default:
      return (
        <p className="auth-form__message auth-form__message--error">
          This verification link is invalid or has expired. Try{" "}
          <Link href="/login">logging in</Link> to request a new link, or{" "}
          <Link href="/register">create an account</Link>.
        </p>
      );
  }
}
