import dynamic from "next/dynamic";
import Head from "next/head";

import { Loader } from "components/utilities";

const ZoneMap = dynamic(() => import("components/views/ZoneMap"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function ZonesPage() {
  return (
    <>
      <Head>
        <title>By Zone</title>
      </Head>
      <ZoneMap />
    </>
  );
}
