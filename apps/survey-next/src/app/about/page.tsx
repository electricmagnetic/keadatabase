import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";
import { WordPressPage } from "@/app/_components/cms/wordpress";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Page.Container>
      <Page.Heading>About</Page.Heading>
      <Page.Section>
        <WordPressPage id={474} />
      </Page.Section>
    </Page.Container>
  );
}
