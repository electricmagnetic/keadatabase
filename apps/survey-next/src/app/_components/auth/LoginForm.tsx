"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthField } from "./AuthField";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { useAuthForm } from "./useAuthForm";
import { useSession } from "./useSession";
import { useRedirectIfAuthenticated } from "./useRedirectIfAuthenticated";
import { authFetch, authErrorMessage, AUTH_PATHS } from "./client";
import { LoginSchema, type LoginFormData } from "./schema";
import { Toast } from "@/app/_components/ui/Toast";
import { Spinner } from "@/app/_components/ui/Spinner";

export function LoginForm() {
  const router = useRouter();
  const { refresh } = useSession();
  const redirecting = useRedirectIfAuthenticated();
  const [toast, setToast] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useAuthForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await authFetch(AUTH_PATHS.login, {
      method: "POST",
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (!result.ok) {
      setToast(authErrorMessage(result, "Invalid email or password."));
      return;
    }

    await refresh();
    router.push("/account");
  };

  // withhold the form during the session check / pending redirect (no flash)
  if (redirecting) return <Spinner />;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form auth-form">
        <AuthField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          autoFocus
          register={register("email")}
          error={errors.email}
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          register={register("password")}
          error={errors.password}
        />

        <AuthSubmitButton pendingLabel="Logging in…" isSubmitting={isSubmitting}>
          Login
        </AuthSubmitButton>

        <p className="auth-form__links">
          <Link href="/password/reset">Forgot your password?</Link>
          <Link href="/register">Create an account</Link>
        </p>
      </form>

      <Toast message={toast} variant="error" onDismiss={() => setToast(null)} />
    </>
  );
}
