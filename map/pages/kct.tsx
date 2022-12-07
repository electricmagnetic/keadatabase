import dynamic from "next/dynamic";
import Head from "next/head";

import { Loader } from "components/utilities";

const KCTMap = dynamic(() => import("components/views/KCTMap"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function KCTPage() {
  return (
    <>
      <Head>
        <title>Type KCT</title>
      </Head>
      <KCTMap />
    </>
  );
}
