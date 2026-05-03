import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";
import { WordPressPage } from "@/app/_components/cms/wordpress";

export const metadata: Metadata = {
  title: "Instructions",
};

export default function InstructionsPage() {
  return (
    <Page.Container>
      <Page.Heading>How To Survey</Page.Heading>
      <Page.Section>
        <WordPressPage id={478} />
      </Page.Section>
    </Page.Container>
  );
}
