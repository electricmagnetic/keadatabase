import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";

export const metadata: Metadata = {
  title: "Browse Surveys",
};

export default function SurveysPage() {
  return (
    <Page.Container>
      <Page.Heading>Browse Surveys</Page.Heading>
      <Page.Section>TODO</Page.Section>
    </Page.Container>
  );
}
