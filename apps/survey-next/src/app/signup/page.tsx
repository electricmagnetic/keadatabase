import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";
import { SignupForm } from "@/app/_components/auth/SignupForm";
import "@/app/css/components/auth.css";

export const metadata: Metadata = {
  title: "Create an account",
};

export default function SignupPage() {
  return (
    <Page.Container>
      <Page.Heading>Create an account</Page.Heading>
      <Page.Section className="auth-section">
        <SignupForm />
      </Page.Section>
    </Page.Container>
  );
}
