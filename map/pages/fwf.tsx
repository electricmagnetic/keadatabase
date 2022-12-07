import dynamic from "next/dynamic";
import Head from "next/head";

import { Loader } from "components/utilities";

const FWFMap = dynamic(() => import("components/views/FWFMap"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function FWFPage() {
  return (
    <>
      <Head>
        <title>Type FWF</title>
      </Head>
      <FWFMap />
    </>
  );
}
