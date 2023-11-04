import { type Metadata } from "next";

import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "Success",
};

export default function ReportSuccess() {
  return (
    <Page>
      <Page.Heading>Success</Page.Heading>
    </Page>
  );
}
