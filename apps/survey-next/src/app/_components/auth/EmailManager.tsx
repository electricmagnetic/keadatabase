"use client";

import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { authFetch, authErrorMessage, AUTH_PATHS } from "./client";
import { EmailAddressSchema, type EmailAddress } from "./schema";
import { Spinner } from "@/app/_components/ui/Spinner";
import { Toast } from "@/app/_components/ui/Toast";

const EmailListSchema = z.array(EmailAddressSchema);

/**
 * Lists the user's email addresses with verification status, and lets them set
 * a primary address or resend a verification email.
 *
 * ponytail: add/remove email is out of scope for this pass (account page only
 * needs view + verify + set-primary); wire the POST/DELETE here when needed.
 */
export function EmailManager() {
  const [emails, setEmails] = useState<EmailAddress[] | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [toastVariant, setToastVariant] = useState<"error" | "success">("error");

  const load = useCallback(async () => {
    const result = await authFetch(AUTH_PATHS.accountEmail);
    const parsed = EmailListSchema.safeParse(result.data);
    if (result.ok && parsed.success) {
      setEmails(parsed.data);
    } else {
      setEmails([]);
      setToast(authErrorMessage(result, "Could not load your email addresses."));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const resendVerification = async (email: string) => {
    const result = await authFetch(AUTH_PATHS.accountEmail, {
      method: "PUT",
      body: JSON.stringify({ email }),
    });
    setToastVariant(result.ok ? "success" : "error");
    setToast(
      result.ok
        ? "Verification email sent."
        : authErrorMessage(result, "Could not send the verification email."),
    );
  };

  const setPrimary = async (email: string) => {
    const result = await authFetch(AUTH_PATHS.accountEmail, {
      method: "PATCH",
      body: JSON.stringify({ email, primary: true }),
    });
    if (result.ok) {
      await load();
    } else {
      setToastVariant("error");
      setToast(authErrorMessage(result, "Could not set the primary email."));
    }
  };

  if (emails === null) return <Spinner />;

  return (
    <>
      <ul className="email-manager">
        {emails.map((e) => (
          <li key={e.email} className="email-manager__item">
            <span className="email-manager__address">{e.email}</span>
            <span className="email-manager__badges">
              {e.primary && (
                <span className="badge badge--primary">Primary</span>
              )}
              {e.verified ? (
                <span className="badge badge--verified">Verified</span>
              ) : (
                <span className="badge badge--unverified">Unverified</span>
              )}
            </span>
            <span className="email-manager__actions">
              {!e.verified && (
                <button
                  type="button"
                  className="btn btn--primary btn--small"
                  onClick={() => resendVerification(e.email)}
                >
                  Resend verification
                </button>
              )}
              {e.verified && !e.primary && (
                <button
                  type="button"
                  className="btn btn--small"
                  onClick={() => setPrimary(e.email)}
                >
                  Make primary
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>

      <Toast
        message={toast}
        variant={toastVariant}
        onDismiss={() => setToast(null)}
      />
    </>
  );
}
