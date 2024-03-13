import Link from "next/link";

import { type Observation } from "./schema";

import Icon from "@/app/_components/ui/Icon";

export function ObservationAsBlock({
  observation,
}: {
  observation: Observation;
}) {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title h5">{`#${observation.id}`}</h3>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <Icon name="feather" />
          {observation.get_sighting_type_display} {observation.number}{" "}
          {observation.number === 1 ? "bird" : "birds"}
        </li>
        <li className="list-group-item">
          <Icon name="calendar" />
          {observation.date_sighted} {observation.time_sighted}
        </li>
        <li className="list-group-item">
          <Icon name="geo-alt" />
          {observation.geocode} ({observation.region})
        </li>
      </ul>
      <div className="card-footer">
        <Link
          className="stretched-link"
          href={`/observations/${observation.id}`}
        >
          View Observation
        </Link>
      </div>
    </div>
  );
}
