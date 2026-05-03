import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";

export const metadata: Metadata = {
  title: "Analysis",
};

export default function AnalysisPage() {
  return (
    <Page.Container>
      <Page.Heading>Analysis</Page.Heading>
      <Page.Section>TODO</Page.Section>
    </Page.Container>
  );
}
