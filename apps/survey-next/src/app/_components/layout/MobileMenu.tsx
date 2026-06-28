"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AuthNav } from "../auth/AuthNav";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      handleClose();
    }
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="mobile-menu__toggle fade-hover"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <i className="fas fa-bars"></i>
      </button>

      {isOpen && (
        <>
          <div
            className={`mobile-menu__mask${isClosing ? " mobile-menu__mask--closing" : ""}`}
            onClick={handleClose}
            aria-hidden="true"
          />
          <nav className={`mobile-menu__panel${isClosing ? " mobile-menu__panel--closing" : ""}`}>
            <div className="mobile-menu__header">
              <button
                className="mobile-menu__close fade-hover"
                onClick={handleClose}
                aria-label="Close menu"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <ul className="mobile-menu__nav">
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
              <AuthNav />
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
