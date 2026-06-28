"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthField } from "./AuthField";
import { authFetch, authErrorMessage, AUTH_PATHS } from "./client";
import { ChangePasswordSchema, type ChangePasswordFormData } from "./schema";
import { Toast } from "@/app/_components/ui/Toast";

export function ChangePasswordForm() {
  const [toast, setToast] = useState<string | null>(null);
  const [toastVariant, setToastVariant] = useState<"error" | "success">("error");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    const result = await authFetch(AUTH_PATHS.accountPasswordChange, {
      method: "POST",
      body: JSON.stringify({
        current_password: data.currentPassword,
        new_password: data.newPassword,
      }),
    });

    if (!result.ok) {
      setToastVariant("error");
      setToast(authErrorMessage(result, "Could not change your password."));
      return;
    }
    setToastVariant("success");
    setToast("Password changed.");
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form auth-form">
        <AuthField
          id="currentPassword"
          label="Current password"
          type="password"
          autoComplete="current-password"
          register={register("currentPassword")}
          error={errors.currentPassword}
        />
        <AuthField
          id="newPassword"
          label="New password"
          type="password"
          autoComplete="new-password"
          register={register("newPassword")}
          error={errors.newPassword}
        />
        <AuthField
          id="newPasswordConfirm"
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          register={register("newPasswordConfirm")}
          error={errors.newPasswordConfirm}
        />

        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Change password"}
        </button>
      </form>

      <Toast
        message={toast}
        variant={toastVariant}
        onDismiss={() => setToast(null)}
      />
    </>
  );
}
