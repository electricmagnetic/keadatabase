import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";

export const metadata: Metadata = {
  title: "Grid Map",
};

export default function GridPage() {
  return (
    <Page.Container>
      <Page.Heading>Grid Map</Page.Heading>
      <Page.Section>TODO</Page.Section>
    </Page.Container>
  );
}
