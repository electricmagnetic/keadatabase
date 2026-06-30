"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { AuthField } from "./AuthField";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { useAuthForm } from "./useAuthForm";
import { authFetch, authErrorMessage, AUTH_PATHS } from "./client";
import {
  PasswordResetRequestSchema,
  type PasswordResetRequestFormData,
} from "./schema";
import { Toast } from "@/app/_components/ui/Toast";

export function PasswordResetRequestForm() {
  const [toast, setToast] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useAuthForm<PasswordResetRequestFormData>({
    resolver: zodResolver(PasswordResetRequestSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: PasswordResetRequestFormData) => {
    const result = await authFetch(AUTH_PATHS.passwordRequest, {
      method: "POST",
      body: JSON.stringify({ email: data.email }),
    });

    if (!result.ok) {
      setToast(authErrorMessage(result, "Could not send the reset email."));
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <p className="auth-form__message">
        If an account exists for that email, a password reset link is on its
        way. Check your inbox.
      </p>
    );
  }

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

        <div className="form__actions">
          <AuthSubmitButton pendingLabel="Sending…" isSubmitting={isSubmitting}>
            Send reset link
          </AuthSubmitButton>
          <Link href="/login">Back to login</Link>
        </div>
      </form>

      <Toast message={toast} variant="error" onDismiss={() => setToast(null)} />
    </>
  );
}
