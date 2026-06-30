"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Page from "@/app/_components/ui/Page";
import { Spinner } from "@/app/_components/ui/Spinner";
import { useSession } from "./useSession";

/** Account management: emails + change password. Redirects anon users to login. */
export function AccountView() {
  const { user, isAuthenticated, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace("/login");
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) return <Spinner />;

  return (
    <Page.Container>
      <Page.Heading>Your account</Page.Heading>

      <Page.Section className="auth-section">
        <h2>Account Details</h2>
        {user?.name && <p>{user.name}</p>}
        <p>{user?.email}</p>
      </Page.Section>

      <Page.Section className="auth-section">
        <h2>Change password</h2>
        <p>
          <Link href="/account/password">Change your password</Link>
        </p>
      </Page.Section>
    </Page.Container>
  );
}
