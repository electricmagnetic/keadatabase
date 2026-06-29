"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { AuthField } from "./AuthField";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { useAuthForm } from "./useAuthForm";
import { authFetch, authErrorMessage, AUTH_PATHS } from "./client";
import {
  PasswordResetConfirmSchema,
  type PasswordResetConfirmFormData,
} from "./schema";
import { Toast } from "@/app/_components/ui/Toast";

/** Confirm a password reset using the key from the emailed link. */
export function PasswordResetConfirmForm({ resetKey }: { resetKey: string }) {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useAuthForm<PasswordResetConfirmFormData>({
    resolver: zodResolver(PasswordResetConfirmSchema),
    defaultValues: { password: "", passwordConfirm: "" },
  });

  const onSubmit = async (data: PasswordResetConfirmFormData) => {
    const result = await authFetch(AUTH_PATHS.passwordReset, {
      method: "POST",
      body: JSON.stringify({ key: resetKey, password: data.password }),
    });

    if (!result.ok) {
      setToast(
        authErrorMessage(
          result,
          "This reset link is invalid or has expired. Request a new one.",
        ),
      );
      return;
    }
    router.push("/login");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form auth-form">
        <AuthField
          id="password"
          label="New password"
          type="password"
          autoComplete="new-password"
          autoFocus
          register={register("password")}
          error={errors.password}
        />
        <AuthField
          id="passwordConfirm"
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          register={register("passwordConfirm")}
          error={errors.passwordConfirm}
        />

        <AuthSubmitButton pendingLabel="Saving…" isSubmitting={isSubmitting}>
          Set new password
        </AuthSubmitButton>
      </form>

      <Toast message={toast} variant="error" onDismiss={() => setToast(null)} />
    </>
  );
}
