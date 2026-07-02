import { type Metadata } from "next";
import { Suspense } from "react";

import Page from "@/app/_components/ui/Page";
import { LoginForm } from "@/app/_components/auth/LoginForm";
import { Spinner } from "@/app/_components/ui/Spinner";
import "@/app/css/components/auth.css";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <Page.Container>
      <Page.Heading>Login</Page.Heading>
      <Page.Section className="auth-section">
        <Suspense fallback={<Spinner />}>
          <LoginForm />
        </Suspense>
      </Page.Section>
    </Page.Container>
  );
}
