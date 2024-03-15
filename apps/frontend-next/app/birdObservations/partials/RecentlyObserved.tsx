import { getBirdObservations } from "../actions";
import { BirdObservationAsCircleBlock } from "../templates";

export default async function RecentlyObserved() {
  const { results: birdObservations } = await getBirdObservations({
    page_size: 4,
    has_bird: true,
  });

  return (
    <ul className="list-unstyled row row-cols-2 row-cols-xl-4 g-3">
      {birdObservations.map((birdObservation) => (
        <li className="col" key={birdObservation.id}>
          <BirdObservationAsCircleBlock birdObservation={birdObservation} />
        </li>
      ))}
    </ul>
  );
}
