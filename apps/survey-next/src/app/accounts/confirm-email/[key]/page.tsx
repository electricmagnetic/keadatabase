import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";
import { EmailVerify } from "@/app/_components/auth/EmailVerify";
import "@/app/css/components/auth.css";

export const metadata: Metadata = {
  title: "Verify your email",
};

// the backend's allauth verification email links here (/accounts/confirm-email/<key>/)
// rather than to /verify-email. Reuse the same component, taking the key from the path.
export default async function ConfirmEmailPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;

  return (
    <Page.Container>
      <Page.Heading>Verify your email</Page.Heading>
      <Page.Section className="auth-section">
        <EmailVerify verifyKey={decodeURIComponent(key)} />
      </Page.Section>
    </Page.Container>
  );
}
