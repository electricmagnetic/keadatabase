import type { Metadata } from "next";

import Navbar from "./_components/layout/Navbar";

import "./global.scss";

export const metadata: Metadata = {
  title: "Kea Database",
  description:
    "A citizen science initiative helping to support kea conservation in Aotearoa, New Zealand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
