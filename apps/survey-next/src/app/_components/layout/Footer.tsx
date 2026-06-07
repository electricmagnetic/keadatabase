import Link from "next/link";
import packageJson from "../../../../package.json";

export function Footer() {
  return (
    <footer className="page__footer">
      <div className="holder">
        <div className="footer">
          <div className="holder holder--sm">
            <div className="footer__left">
              <p>Map data from LINZ (CC BY 4.0).</p>
              <nav>
                <Link href="/">Home</Link>
                <Link href="/instructions">How To Survey</Link>
                <Link href="/legal">Legal</Link>
                <Link href="/about">About</Link>
              </nav>
            </div>
            <aside className="footer__right">
              <span>Kea Survey Tool</span>
              <br />
              {packageJson.version}
            </aside>
          </div>
        </div>
      </div>
    </footer>
  );
}
