import dynamic from "next/dynamic";

import { Loader } from "components/utilities";

const TrackMap = dynamic(() => import("components/views/TrackMap"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function TrackPage() {
  return (
    <>
      <TrackMap />
    </>
  );
}
