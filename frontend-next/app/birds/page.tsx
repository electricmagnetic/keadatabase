import { type Metadata } from "next";

import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "Search Birds",
};

export default function Birds() {
  return (
    <Page>
      <Page.Heading>Birds</Page.Heading>
    </Page>
  );
}
