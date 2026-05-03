import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";
import { WordPressPage } from "@/app/_components/cms/wordpress";

export const metadata: Metadata = {
  title: "Legal",
};

export default function LegalPage() {
  return (
    <Page.Container>
      <Page.Heading>Legal</Page.Heading>
      <Page.Section>
        <WordPressPage id={476} />
      </Page.Section>
    </Page.Container>
  );
}
