import { type Metadata } from "next";

import WordPressPage from "@/app/_components/content/WordPressPage";
import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <Page>
      <Page.Section background="faded">
        <Page.Heading>About</Page.Heading>
      </Page.Section>
      <Page.Section>
        <WordPressPage id={2} />
      </Page.Section>
    </Page>
  );
}
