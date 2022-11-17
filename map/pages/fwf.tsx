import dynamic from "next/dynamic";

import { Loader } from "components/utilities";

const FWFMap = dynamic(() => import("components/views/FWFMap"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function FWFPage() {
  return (
    <>
      <FWFMap />
    </>
  );
}
