"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className={`page__header${isHome ? " page__header--home" : ""}`}>
      <div className="holder holder--sm">
        <figure>
          <Link href="/">
            <Image
              src="/images/logo.svg"
              width={64}
              height={64}
              alt="Kea Survey"
              priority
            />
            <figcaption>Kea Survey Tool</figcaption>
          </Link>
        </figure>
        <nav className="page__header-nav--desktop">
          <ul>
            <li>
              <Link href="/" className={isActive("/") ? "active" : ""}>
                <i className="fa-fw fas fa-home"></i>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/surveys"
                className={isActive("/surveys") ? "active" : ""}
              >
                <i className="fa-fw fas fa-list-alt"></i>
                <span>Browse Surveys</span>
              </Link>
            </li>
            <li>
              <Link href="/grid" className={isActive("/grid") ? "active" : ""}>
                <i className="fa-fw fas fa-map"></i>
                <span>Grid Map</span>
              </Link>
            </li>
            <li>
              <Link
                href="/analysis"
                className={isActive("/analysis") ? "active" : ""}
              >
                <i className="fa-fw fas fa-chart-bar"></i>
                <span>Analysis</span>
              </Link>
            </li>
            <li>
              <Link
                href="/submit"
                className={isActive("/submit") ? "active" : ""}
              >
                <i className="fa-fw fas fa-clipboard-list"></i>
                <span>Submit Survey</span>
              </Link>
            </li>
          </ul>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
