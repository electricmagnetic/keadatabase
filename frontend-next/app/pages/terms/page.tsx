import { type Metadata } from "next";

import WordPressPage from "@/app/_components/content/WordPressPage";
import Page from "@/app/_components/layout/Page";

export const metadata: Metadata = {
  title: "Terms of Use/Privacy Policy",
};

export default function Terms() {
  return (
    <Page>
      <Page.Heading>Terms of Use/Privacy Policy</Page.Heading>
      <Page.Section>
        <WordPressPage id={3} />
      </Page.Section>
    </Page>
  );
}
