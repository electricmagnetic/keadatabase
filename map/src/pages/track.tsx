import dynamic from "next/dynamic";
import Head from "next/head";

import { Loader } from "@/components/utilities";

const TrackMap = dynamic(() => import("@/components/views/TrackMap"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function TrackPage() {
  return (
    <>
      <Head>
        <title>By Bird</title>
      </Head>
      <TrackMap />
    </>
  );
}
