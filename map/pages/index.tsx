import dynamic from "next/dynamic";

import { Loader } from "components/utilities";

const DefaultMap = dynamic(() => import("components/views/DefaultMap"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Home() {
  return (
    <>
      <DefaultMap />
    </>
  );
}
