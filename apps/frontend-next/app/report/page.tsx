import { type Metadata } from "next";

import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "Report Observation",
};

export default function Report() {
  return (
    <Page>
      <Page.Heading>Report</Page.Heading>
    </Page>
  );
}
