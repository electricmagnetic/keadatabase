"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Page from "@/app/_components/ui/Page";
import { Spinner } from "@/app/_components/ui/Spinner";
import { Skeleton } from "@/app/_components/ui/Skeleton";
import { useSession } from "./useSession";
import { profileFetch } from "./client";
import type { Profile } from "./schema";

/** Account management: details + change password. Redirects anon users to login. */
export function AccountView() {
  const { user, isAuthenticated, loading } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace("/login");
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    profileFetch<Profile>().then((result) => {
      if (result.ok && result.data) setProfile(result.data);
    });
  }, [isAuthenticated]);

  if (loading || !isAuthenticated) return <Spinner />;

  const name = [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <Page.Container>
      <Page.Heading>Your account</Page.Heading>

      <Page.Section className="auth-section">
        <div className="account__details">
          <div>
            <h2>Account Details</h2>
            <p>
              {profile ? name : <Skeleton width="10rem" />}{" "}
              <Link href="/account/details">(edit details)</Link>
            </p>
            <p>{user?.email}</p>
          </div>
          <div>
            <h2>Change password</h2>
            <p>
              <Link href="/account/password">Change your password</Link>
            </p>
          </div>
        </div>
      </Page.Section>
    </Page.Container>
  );
}
