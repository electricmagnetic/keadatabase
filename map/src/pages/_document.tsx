import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Plausible Analytics */}
        <script
          defer
          data-domain="map.keadatabase.nz"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
