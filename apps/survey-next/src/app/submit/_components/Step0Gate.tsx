"use client";

import Link from "next/link";

import { Step1Form } from "./Step1Form";
import Page from "@/app/_components/ui/Page";
import { Spinner } from "@/app/_components/ui/Spinner";
import { useSession } from "@/app/_components/auth/useSession";

/**
 * Step 0: login gate shown before the survey submit form.
 *
 * Auto-skips to Step 1 for logged-in users — which also covers the
 * return-from-login case, since the user lands back on /submit already
 * authenticated.
 */
export function Step0Gate() {
  const { isAuthenticated, loading } = useSession();

  if (loading) return <Spinner />;
  if (isAuthenticated) return <Step1Form />;

  return (
    <Page.Section>
      <h2>Login Required</h2>
      <p>You need to be logged in to your account to submit a survey.</p>

      <div className="submit-gate">
        <Link href="/login?next=/submit" className="btn btn--primary">
          Login
        </Link>
      </div>
    </Page.Section>
  );
}
