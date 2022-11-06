import dynamic from "next/dynamic";

import { Loader } from "components/utilities";

const ZoneMap = dynamic(() => import("components/views/ZoneMap"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function ZonesPage() {
  return (
    <>
      <ZoneMap />
    </>
  );
}
