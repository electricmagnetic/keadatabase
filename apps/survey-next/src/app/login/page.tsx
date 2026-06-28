import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";
import { LoginForm } from "@/app/_components/auth/LoginForm";
import "@/app/css/components/auth.css";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <Page.Container>
      <Page.Heading>Login</Page.Heading>
      <Page.Section className="auth-section">
        <LoginForm />
      </Page.Section>
    </Page.Container>
  );
}
