"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

    // allauth returns 401 with a flows envelope on SUCCESS: the password is
    // changed but the reset doesn't log you in, so it reports "now authenticate".
    if (result.ok || result.status === 401) {
      router.push("/login");
      return;
    }

    // a 400 on the `key` param means the link is dead; a 400 on `password`
    // means the password failed a rule (too similar/short/common) — surface
    // that real message instead of blaming the link.
    const keyError = result.errors?.some((e) => e.param === "key");
    setToast(
      keyError
        ? "This reset link is invalid or has expired. Request a new one below."
        : authErrorMessage(result, "Could not reset your password."),
    );
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

        <div className="form__actions">
          <AuthSubmitButton pendingLabel="Saving…" isSubmitting={isSubmitting}>
            Set new password
          </AuthSubmitButton>
          <Link href="/accounts/password/reset">Resend password reset</Link>
        </div>
      </form>

      <Toast message={toast} variant="error" onDismiss={() => setToast(null)} />
    </>
  );
}
