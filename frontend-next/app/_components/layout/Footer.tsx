import Link from "next/link";

import Logo from "@/public/logo_grey.svg";

export default function Footer() {
  return (
    <footer className="d-print-none">
      <div className="constrainer">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <p className="m-0 footer-sponsor">
                Kea Database data hosted in Aotearoa New Zealand on{" "}
                <a
                  className="catalyst"
                  href="https://catalystcloud.nz/solutions/gis-core-catalyst/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Catalyst Cloud GIS Core
                </a>
                .
              </p>
              <nav>
                <ul className="footer-links my-2">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/pages/donations">Donations</Link>
                  </li>
                  <li>
                    <Link href="/pages/help">Help</Link>
                  </li>
                  <li>
                    <Link href="/pages/about">About</Link>
                  </li>
                  <li>
                    <Link href="/pages/licence">Licence/Copyright</Link>
                  </li>
                  <li>
                    <Link href="/pages/terms">Terms/Privacy</Link>
                  </li>
                  <li>
                    <a href="https://blog.keadatabase.nz">Blog</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-4">
              <div className="footer-attribution my-2">
                <div className="d-inline-block text-right">
                  <Logo alt="Kea Database" className="logo" height={24} />
                  <p className="m-0 version">
                    {" "}
                    {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
                      ? ` (${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA})`
                      : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
