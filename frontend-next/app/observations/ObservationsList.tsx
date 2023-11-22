import { type Observation } from "./page";

import Page from "@/app/_components/layout/Page";

export default function ObservationsList({
  observations,
}: {
  observations: Observation[];
}) {
  return (
    <Page.Section>
      <ul>
        {observations.map((observation) => (
          <li key={observation.id}>{observation.id}</li>
        ))}
      </ul>
    </Page.Section>
  );
}
