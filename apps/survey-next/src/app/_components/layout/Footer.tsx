import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/instructions">How To Survey</Link>
          </li>
          <li>
            <Link href="/legal">Legal</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
