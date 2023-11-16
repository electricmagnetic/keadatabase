import Page from "@/app/_components/layout/Page";
import { getData, type PaginatedResponse } from "@/app/_components/api";

interface Observation {
  id: string;
}

const BASE_URL = `${process.env.NEXT_PUBLIC_DATABASE_API}/observations`;

export default async function ObservationsList({ query }: { query: string }) {
  const data = await getData<PaginatedResponse<Observation>>(
    `${BASE_URL}?${query}`,
  );

  return (
    <Page.Section>
      <ul>
        {data.results.map((observation) => (
          <li key={observation.id}>{observation.id}</li>
        ))}
      </ul>
    </Page.Section>
  );
}
