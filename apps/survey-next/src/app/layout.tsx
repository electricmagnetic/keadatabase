import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";

import { Header } from "./_components/layout/Header";
import { Footer } from "./_components/layout/Footer";

import "./css/main.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Kea Survey",
  description:
    "Kea Survey is a long-term citizen science initiative designed to monitor the health of Aotearoa New Zealand's kea population.",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Kea Survey Tool",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
