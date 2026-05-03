import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header>
      <Link href="/" className="brand">
        <Image
          src="/images/logo.svg"
          width={64}
          height={64}
          alt="Kea Survey"
          priority
        />
        Kea Survey
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/surveys">Browse Surveys</Link>
          </li>
          <li>
            <Link href="/grid">Grid Map</Link>
          </li>
          <li>
            <Link href="/analysis">Analysis</Link>
          </li>
          <li>
            <Link href="/submit">Submit Survey</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
