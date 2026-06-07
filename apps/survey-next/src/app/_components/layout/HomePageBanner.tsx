"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import "@/app/css/components/banner.css";

export function HomePageBanner() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <section className="banner">
      <div className="holder holder--sm">
        <h1 className="banner__title">Kea Survey Tool</h1>
        <div className="banner__buttons">
          <Link href="/submit" className="btn btn--lg btn--primary">
            <i className="fa-fw fas fa-clipboard-list mr-1"></i>Submit Survey
          </Link>
          <Link href="/instructions" className="btn btn--lg">
            <i className="fa-fw fas fa-question-circle mr-1"></i>How To Survey
          </Link>
        </div>
        <div className="banner__buttons">
          <a
            href="https://geo.keadatabase.nz/survey/form_20191219.pdf"
            target="_blank"
            className="btn"
          >
            <i className="fa-fw fas fa-file-download mr-1"></i>Paper Form
          </a>
          <Link href="/grid" className="btn">
            <i className="fa-fw fas fa-map mr-1"></i>View Grid Map
          </Link>
          <Link href="/surveys" className="btn">
            <i className="fa-fw fas fa-list-alt mr-1"></i>Browse Surveys
          </Link>
        </div>
      </div>
    </section>
  );
}
