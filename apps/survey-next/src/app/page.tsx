import { type Metadata } from "next";

import Page from "@/app/_components/ui/Page";

export const metadata: Metadata = {
  title: "Kea Survey",
};

export default async function HomePage() {
  // Simple fetch to check API wired up correctly
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/surveys/surveys/`,
  );

  const data = response.ok
    ? ((await response.json()) as { count: number })
    : null;

  return (
    <Page.Container>
      <div>
        <h1>Kea Survey</h1>
        {data ? (
          <p>There are currently {data.count} surveys.</p>
        ) : (
          <p>
            <em>Unable to fetch surveys.</em>
          </p>
        )}
      </div>
    </Page.Container>
  );
}
