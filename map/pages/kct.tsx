import dynamic from "next/dynamic";

import { Loader } from "components/utilities";

const KCTMap = dynamic(() => import("components/views/KCTMap"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function KCTPage() {
  return (
    <>
      <KCTMap />
    </>
  );
}
