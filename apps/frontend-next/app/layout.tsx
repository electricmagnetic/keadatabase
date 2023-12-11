import type { Metadata } from "next";
import {
  Playfair_Display as PlayfairDisplay,
  Open_Sans as OpenSans,
} from "next/font/google";

import Navbar from "@/app/_components/layout/Navbar";
import Footer from "@/app/_components/layout/Footer";

import "./global.scss";

const playfairDisplay = PlayfairDisplay({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-playfairDisplay",
});

const openSans = OpenSans({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-openSans",
});

export const SITE_NAME = "Kea Database";

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description:
    "A citizen science initiative helping to support kea conservation in Aotearoa, New Zealand.",
};

export const revalidate = 86400; // Ensure all pages are cached for a day maximum (to allow for changes to birds/band combos/observations/WordPress etc at API level). TODO: optimise back-end to signal changes to front-end.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${playfairDisplay.variable} ${openSans.variable}`}
      lang="en"
    >
      <body>
        <Navbar />
        <div className="constrainer">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
