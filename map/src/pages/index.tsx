import dynamic from "next/dynamic";
import Head from "next/head";

import { Loader } from "@/components/utilities";

const DefaultMap = dynamic(() => import("@/components/views/DefaultMap"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Map (Kea Database)</title>
        <meta name="description" content="Map utility for the Kea Database" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultMap />
    </>
  );
}
