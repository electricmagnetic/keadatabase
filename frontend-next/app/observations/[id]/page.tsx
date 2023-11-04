import { type Metadata } from "next";

import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "View Observation",
};

export default function Observation({
  params: { id },
}: {
  params: { id: number };
}) {
  return (
    <Page>
      <Page.Heading>Observation {id}</Page.Heading>
    </Page>
  );
}
