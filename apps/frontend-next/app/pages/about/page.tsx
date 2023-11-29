import { type Metadata } from "next";

import { WordPressPage } from "@/app/_components/content/wordpress";
import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <Page>
      <Page.Heading>About</Page.Heading>
      <Page.Section>
        <WordPressPage id={2} />
      </Page.Section>
    </Page>
  );
}
