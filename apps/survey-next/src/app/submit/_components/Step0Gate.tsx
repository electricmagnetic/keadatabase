"use client";

import { useState } from "react";
import Link from "next/link";

import { Step1Form } from "./Step1Form";
import Page from "@/app/_components/ui/Page";
import { Spinner } from "@/app/_components/ui/Spinner";
import { useSession } from "@/app/_components/auth/useSession";

/**
 * Step 0: login-or-guest gate shown before the survey submit form.
 *
 * Auto-skips to Step 1 for logged-in users — which also covers the
 * return-from-login case, since the user lands back on /submit already
 * authenticated. Guests pick "continue as guest" to reveal Step 1.
 */
export function Step0Gate() {
  const { isAuthenticated, loading } = useSession();
  const [guest, setGuest] = useState(false);

  if (loading) return <Spinner />;
  if (isAuthenticated || guest) return <Step1Form />;

  return (
    <Page.Section>
      <h2>Login or Continue as Guest</h2>
      <p>
        Log in to have your survey attributed to your account, or continue as a
        guest.
      </p>

      <div className="submit-gate">
        <Link href="/login?next=/submit" className="btn btn--primary">
          Login
        </Link>
        <button type="button" className="btn" onClick={() => setGuest(true)}>
          Continue as guest
        </button>
      </div>
    </Page.Section>
  );
}
