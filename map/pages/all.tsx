import dynamic from "next/dynamic";
import Head from "next/head";

import { Loader } from "components/utilities";

const BigMap = dynamic(() => import("components/views/BigMap"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function BigMapPage() {
  return (
    <>
      <Head>
        <title>Paginated Map</title>
      </Head>
      <BigMap />
    </>
  );
}
