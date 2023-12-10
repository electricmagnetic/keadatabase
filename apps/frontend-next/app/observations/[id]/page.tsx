import { type Metadata } from "next";

import ObservationSuccessAlert from "./ObservationSuccessAlert";

import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "View Observation",
};

export default function Observation({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Page>
      <Page.Heading>Observation {id}</Page.Heading>
      <ObservationSuccessAlert />
    </Page>
  );
}
