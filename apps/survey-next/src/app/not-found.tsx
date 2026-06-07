import type { Metadata } from "next";
import Page from "./_components/ui/Page";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <Page.Container>
      <Page.Heading>Page Not Found</Page.Heading>
      <Page.Section>
        You seem to have encountered a page that doesn&apos;t exist. If you
        think it should exist, please contact us and we&apos;ll look into it.
      </Page.Section>
    </Page.Container>
  );
}
