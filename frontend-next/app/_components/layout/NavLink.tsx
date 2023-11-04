"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import classNames from "classnames";

export default function NavLink({
  href,
  exact = false,
  children,
  ...others
}: PropsWithChildren<{
  href: string;
  exact?: boolean;
}>) {
  const pathname = usePathname();
  const isActive = exact
    ? Boolean(pathname === href)
    : Boolean(pathname.startsWith(href));

  return (
    <li className="nav-item">
      <Link
        aria-current={isActive ? "page" : false}
        className={classNames("nav-link", isActive && "active")}
        href={href}
        {...others}
      >
        {children}
      </Link>
    </li>
  );
}
