"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AuthField } from "./AuthField";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { useAuthForm } from "./useAuthForm";
import { profileFetch, authErrorMessage } from "./client";
import {
  ProfileFormSchema,
  type Profile,
  type ProfileFormData,
} from "./schema";
import { Toast } from "@/app/_components/ui/Toast";
import { Skeleton } from "@/app/_components/ui/Skeleton";

/**
 * Edit first/last name via GET/PATCH /me/; returns to /account on save.
 *
 * The profile is loaded before the form mounts so it can be passed as
 * defaultValues — do NOT refactor to reset()-after-mount: resetting a mounted
 * form races with the React Compiler's memoization and typed values are
 * silently dropped from the submit payload.
 */
export function AccountDetailsForm() {
  const [toast, setToast] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    profileFetch<Profile>().then((result) => {
      if (result.ok && result.data) {
        setProfile(result.data);
      } else {
        setToast(authErrorMessage(result, "Could not load your details."));
      }
    });
  }, []);

  if (!profile && !toast) return <DetailsFormSkeleton />;

  return (
    <>
      {profile && <DetailsForm profile={profile} onError={setToast} />}
      <Toast message={toast} variant="error" onDismiss={() => setToast(null)} />
    </>
  );
}

/** Mirrors DetailsForm's layout so the real fields swap in without a jump. */
function DetailsFormSkeleton() {
  return (
    <div className="form auth-form" aria-busy="true">
      {["First name", "Last name"].map((label) => (
        <div className="form__row" key={label}>
          <span className="form__label form__label--required">{label}</span>
          <Skeleton height="2.375rem" />
        </div>
      ))}
      <div className="form__actions">
        <Skeleton width="8rem" height="2.375rem" />
      </div>
    </div>
  );
}

function DetailsForm({
  profile,
  onError,
}: {
  profile: Profile;
  onError: (message: string) => void;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useAuthForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      firstName: profile.first_name,
      lastName: profile.last_name,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    const result = await profileFetch<Profile>({
      method: "PATCH",
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
      }),
    });

    if (!result.ok) {
      onError(authErrorMessage(result, "Could not save your details."));
      return;
    }
    router.push("/account");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form auth-form">
      <AuthField
        id="firstName"
        label="First name"
        type="text"
        autoComplete="given-name"
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

      <div className="form__actions">
        <AuthSubmitButton pendingLabel="Saving…" isSubmitting={isSubmitting}>
          Save details
        </AuthSubmitButton>
        <Link href="/account">Back to your account</Link>
      </div>
    </form>
  );
}
