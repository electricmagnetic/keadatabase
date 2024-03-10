"use client";

import { useEffect } from "react";
import Link from "next/link";

import NavLink from "./NavLink";

import Logo from "@/public/logo.svg";
import Icon from "@/app/_components/ui/Icon";

export default function Navbar() {
  useEffect(() => {
    require("bootstrap");
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark fixed-top"
      data-bs-theme="dark"
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Logo alt="" className="me-2 navbar-brand-img" />
          <span className="text-light-emphasis">Kea Database</span>
        </Link>

        <button
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-bs-target="#navbar"
          data-bs-toggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ms-auto">
            <NavLink exact href="/">
              <Icon name="house-door" />
              Home
            </NavLink>
            <NavLink href="/birds">
              <Icon name="search" />
              Search Birds
            </NavLink>
            <NavLink href="/observations">
              <Icon name="map" />
              View Observations
            </NavLink>
            <NavLink href="/report">
              <Icon name="send" />
              Report Observation
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}
