import dynamic from "next/dynamic";

import { Loader } from "components/utilities";

const BigMap = dynamic(() => import("components/views/BigMap"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function BigMapPage() {
  return (
    <>
      <BigMap />
    </>
  );
}
