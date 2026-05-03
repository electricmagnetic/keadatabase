import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";

export const metadata: Metadata = {
  title: "Submit Survey",
};

export default function SubmitPage() {
  return (
    <Page.Container>
      <Page.Heading>Submit Survey</Page.Heading>
      <Page.Section>TODO</Page.Section>
    </Page.Container>
  );
}
