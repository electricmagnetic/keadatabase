import Link from "next/link";

import Page from "./_components/layout/Page";

export default function NotFound() {
  return (
    <Page>
      <Page.Section>
        <Page.Heading>Not Found</Page.Heading>
        <p>Could not find requested resource</p>
        <Link href="/">Home</Link>
      </Page.Section>
    </Page>
  );
}
