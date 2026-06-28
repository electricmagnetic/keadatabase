"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthField } from "./AuthField";
import { useSession } from "./useSession";
import { authFetch, authErrorMessage, AUTH_PATHS } from "./client";
import { SignupSchema, type SignupFormData } from "./schema";
import { Toast } from "@/app/_components/ui/Toast";

export function SignupForm() {
  const router = useRouter();
  const { refresh } = useSession();
  const [toast, setToast] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { email: "", password: "", passwordConfirm: "" },
  });

  const onSubmit = async (data: SignupFormData) => {
    const result = await authFetch(AUTH_PATHS.signup, {
      method: "POST",
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    // allauth returns 401 with a pending email-verification flow on success —
    // treat both 200 and 401 as "account created", then let the session resolve.
    if (!result.ok && result.status !== 401) {
      setToast(authErrorMessage(result, "Could not create your account."));
      return;
    }

    await refresh();
    // if email verification is required the user isn't logged in yet; send them
    // to the verify-email page either way (it explains the next step)
    router.push("/verify-email");
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
          autoComplete="new-password"
          register={register("password")}
          error={errors.password}
        />
        <AuthField
          id="passwordConfirm"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          register={register("passwordConfirm")}
          error={errors.passwordConfirm}
        />

        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? "Creating account…" : "Create account"}
        </button>

        <p className="auth-form__links">
          <Link href="/login">Already have an account? Login</Link>
        </p>
      </form>

      <Toast message={toast} variant="error" onDismiss={() => setToast(null)} />
    </>
  );
}
