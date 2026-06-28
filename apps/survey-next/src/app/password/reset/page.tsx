import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";
import { PasswordResetRequestForm } from "@/app/_components/auth/PasswordResetRequestForm";
import "@/app/css/components/auth.css";

export const metadata: Metadata = {
  title: "Reset your password",
};

export default function PasswordResetPage() {
  return (
    <Page.Container>
      <Page.Heading>Reset your password</Page.Heading>
      <Page.Section className="auth-section">
        <PasswordResetRequestForm />
      </Page.Section>
    </Page.Container>
  );
}
