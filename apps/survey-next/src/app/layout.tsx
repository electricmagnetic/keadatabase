import type { Metadata } from "next";
import { IBM_Plex_Sans, Zilla_Slab } from "next/font/google";

import { Header } from "./_components/layout/Header";
import { Footer } from "./_components/layout/Footer";
import { BodyWithClasses } from "./_components/layout/BodyWithClasses";
import { HomePageBanner } from "./_components/layout/HomePageBanner";
import { SWRProvider } from "./_components/providers/SWRProvider";
import { SessionProvider } from "./_components/auth/SessionProvider";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/main.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
});

const zillaSlab = Zilla_Slab({
  variable: "--font-zilla-slab",
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
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
    title: "Kea Survey",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${zillaSlab.variable}`}>
      <BodyWithClasses>
        <SWRProvider>
          <SessionProvider>
            <Header />
            <HomePageBanner />
            <main className="page">
              <div className="holder holder--page">{children}</div>
            </main>
            <Footer />
          </SessionProvider>
        </SWRProvider>
      </BodyWithClasses>
    </html>
  );
}
