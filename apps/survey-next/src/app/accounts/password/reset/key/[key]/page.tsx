import { type Metadata } from "next";
import { notFound } from "next/navigation";
import type { PageWithParams } from "shared/next/types";

import Page from "@/app/_components/ui/Page";
import { PasswordResetConfirmForm } from "@/app/_components/auth/PasswordResetConfirmForm";
import "@/app/css/components/auth.css";

export const metadata: Metadata = {
  title: "Set a new password",
};

// the backend's allauth reset email links here (/accounts/password/reset/key/<key>)
// rather than to /password/reset/<key>. Reuse the same form.
export default async function PasswordResetConfirmKeyPage({
  params,
}: PageWithParams) {
  const { key } = await params;
  if (typeof key !== "string" || !key) return notFound();

  return (
    <Page.Container>
      <Page.Heading>Set a new password</Page.Heading>
      <Page.Section className="auth-section">
        <PasswordResetConfirmForm resetKey={key} />
      </Page.Section>
    </Page.Container>
  );
}
