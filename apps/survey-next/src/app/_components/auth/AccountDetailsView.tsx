"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Page from "@/app/_components/ui/Page";
import { Spinner } from "@/app/_components/ui/Spinner";
import { useSession } from "./useSession";
import { AccountDetailsForm } from "./AccountDetailsForm";

/** Standalone edit-details page. Redirects anon users to login. */
export function AccountDetailsView() {
  const { isAuthenticated, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace("/login");
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) return <Spinner />;

  return (
    <Page.Container>
      <Page.Heading>Edit details</Page.Heading>
      <Page.Section className="auth-section">
        <AccountDetailsForm />
      </Page.Section>
    </Page.Container>
  );
}
