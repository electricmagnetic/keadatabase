"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthField } from "./AuthField";
import { useSession } from "./useSession";
import { authFetch, authErrorMessage, AUTH_PATHS } from "./client";
import { LoginSchema, type LoginFormData } from "./schema";
import { Toast } from "@/app/_components/ui/Toast";

export function LoginForm() {
  const router = useRouter();
  const { refresh } = useSession();
  const [toast, setToast] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
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

        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? "Logging in…" : "Login"}
        </button>

        <p className="auth-form__links">
          <Link href="/password/reset">Forgot your password?</Link>
          <Link href="/signup">Create an account</Link>
        </p>
      </form>

      <Toast message={toast} variant="error" onDismiss={() => setToast(null)} />
    </>
  );
}
