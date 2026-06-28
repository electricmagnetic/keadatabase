import { type Metadata } from "next";
import type { PageWithSearchParams } from "shared/next/types";

import Page from "@/app/_components/ui/Page";
import { EmailVerify } from "@/app/_components/auth/EmailVerify";
import "@/app/css/components/auth.css";

export const metadata: Metadata = {
  title: "Verify your email",
};

export default async function VerifyEmailPage({
  searchParams,
}: PageWithSearchParams) {
  const { key } = await searchParams;
  const verifyKey = typeof key === "string" ? key : undefined;

  return (
    <Page.Container>
      <Page.Heading>Verify your email</Page.Heading>
      <Page.Section className="auth-section">
        <EmailVerify verifyKey={verifyKey} />
      </Page.Section>
    </Page.Container>
  );
}
