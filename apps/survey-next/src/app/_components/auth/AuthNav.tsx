"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "./useSession";
import { authFetch, AUTH_PATHS } from "./client";
import { Skeleton } from "@/app/_components/ui/Skeleton";

/**
 * Auth links for the navigation: Login / Register when anonymous, and the
 * user's name + Account + Logout when authenticated. Shared by the desktop
 * Header and the MobileMenu.
 */
export function AuthNav() {
  const { isAuthenticated, loading, refresh } = useSession();
  const router = useRouter();

  // both signed-in and signed-out states render two links, so hold two
  // placeholders and the nav bar doesn't reflow once the session resolves
  if (loading) {
    return (
      <>
        <li>
          <Skeleton width="5rem" />
        </li>
        <li>
          <Skeleton width="5rem" />
        </li>
      </>
    );
  }

  const handleLogout = async () => {
    await authFetch(AUTH_PATHS.session, { method: "DELETE" });
    await refresh();
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <>
        <li>
          <Link href="/login">
            <i className="fa-fw fas fa-sign-in-alt"></i>
            <span>Login</span>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <i className="fa-fw fas fa-user-plus"></i>
            <span>Register</span>
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link href="/account">
          <i className="fa-fw fas fa-user"></i>
          <span>Account</span>
        </Link>
      </li>
      <li>
        <button type="button" className="nav-link-button" onClick={handleLogout}>
          <i className="fa-fw fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </li>
    </>
  );
}
