import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";
import { EmailVerify } from "@/app/_components/auth/EmailVerify";
import "@/app/css/components/auth.css";

export const metadata: Metadata = {
  title: "Verify your email",
};

// the backend's allauth verification email links here (/account/confirm-email/<key>/),
// so the key arrives in the path. this route does the actual verification.
export default async function ConfirmEmailPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  // the param can arrive percent-encoded (allauth emails encode the `:` in the
  // key as %3A); decode so the backend receives the raw key
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
