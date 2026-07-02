import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";
import "@/app/css/components/auth.css";

export const metadata: Metadata = {
  title: "Verify your email",
};

// post-signup landing: the user isn't logged in yet (email pending), so this
// route stays public. it only shows the "check your inbox" instruction — the
// actual verification happens on /account/confirm-email/[key] via the email link.
export default function VerifyEmailPage() {
  return (
    <Page.Container>
      <Page.Heading>Verify your email</Page.Heading>
      <Page.Section className="auth-section">
        <p className="auth-form__message">
          We&apos;ve sent a verification link to your email address. Open it to
          confirm your account.
        </p>
      </Page.Section>
    </Page.Container>
  );
}
