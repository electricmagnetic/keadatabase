"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Page from "@/app/_components/ui/Page";
import { Spinner } from "@/app/_components/ui/Spinner";
import { useSession } from "./useSession";
import { EmailManager } from "./EmailManager";
import { ChangePasswordForm } from "./ChangePasswordForm";

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
        <h2>{user?.display || user?.email}</h2>
      </Page.Section>

      <Page.Section className="auth-section">
        <h2>Email addresses</h2>
        <EmailManager />
      </Page.Section>

      <Page.Section className="auth-section">
        <h2>Change password</h2>
        <ChangePasswordForm />
      </Page.Section>
    </Page.Container>
  );
}
