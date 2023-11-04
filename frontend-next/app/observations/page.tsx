import { type Metadata } from "next";

import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "View Observations",
};

export default function Observations() {
  return (
    <Page>
      <Page.Heading>Observations</Page.Heading>
    </Page>
  );
}
