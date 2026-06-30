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
  // decode in case the param arrives percent-encoded (matches confirm-email)
  const decodedKey = decodeURIComponent(key);

  return (
    <Page.Container>
      <Page.Heading>Set a new password</Page.Heading>
      <Page.Section className="auth-section">
        <PasswordResetConfirmForm resetKey={decodedKey} />
      </Page.Section>
    </Page.Container>
  );
}
