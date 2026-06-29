"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Page from "@/app/_components/ui/Page";
import { Spinner } from "@/app/_components/ui/Spinner";
import { useSession } from "./useSession";
import { ChangePasswordForm } from "./ChangePasswordForm";

/** Standalone change-password page. Redirects anon users to login. */
export function ChangePasswordView() {
  const { isAuthenticated, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace("/login");
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) return <Spinner />;

  return (
    <Page.Container>
      <Page.Heading>Change password</Page.Heading>
      <Page.Section className="auth-section">
        <ChangePasswordForm />
      </Page.Section>
    </Page.Container>
  );
}
