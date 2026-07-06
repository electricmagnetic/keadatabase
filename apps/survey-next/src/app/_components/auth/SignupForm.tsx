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
import { SignupSchema, type SignupFormData } from "./schema";
import { Toast } from "@/app/_components/ui/Toast";
import { Spinner } from "@/app/_components/ui/Spinner";

export function SignupForm() {
  const router = useRouter();
  const { refresh } = useSession();
  const redirecting = useRedirectIfAuthenticated();
  const [toast, setToast] = useState<string | null>(null);
  // true once signup succeeded and we're navigating to /verify-email — the
  // user isn't authenticated yet (email pending), so `redirecting` won't
  // cover this transition and the form would flash back enabled
  const [navigating, setNavigating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useAuthForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    const result = await authFetch(AUTH_PATHS.signup, {
      method: "POST",
      // backend allauth requires a username; we don't collect one, so reuse the
      // email (allauth accepts it and email is the login identifier anyway).
      body: JSON.stringify({
        username: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      }),
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
    setNavigating(true);
    router.push("/verify-email");
  };

  // withhold the form during the session check, pending redirect, or the
  // post-signup navigation (no flash of an enabled form)
  if (redirecting || navigating) return <Spinner />;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form auth-form">
        <AuthField
          id="firstName"
          label="First name"
          type="text"
          autoComplete="given-name"
          autoFocus
          register={register("firstName")}
          error={errors.firstName}
        />
        <AuthField
          id="lastName"
          label="Last name"
          type="text"
          autoComplete="family-name"
          register={register("lastName")}
          error={errors.lastName}
        />
        <AuthField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
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

        <div className="form__actions">
          <AuthSubmitButton
            pendingLabel="Creating account…"
            isSubmitting={isSubmitting}
          >
            Create account
          </AuthSubmitButton>
          <Link href="/login">Already have an account? Login</Link>
        </div>
      </form>

      <Toast message={toast} variant="error" onDismiss={() => setToast(null)} />
    </>
  );
}
