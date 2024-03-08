import Link from "next/link";

import { MediaSchema, type Bird } from "./schema";
import { generateAltText, generateSummary } from "./helpers";

export function BirdAsBlock({
  bird: { bird_extended, ...bird },
}: {
  bird: Bird;
}) {
  const media = MediaSchema.parse(bird_extended?.profile_picture);

  return (
    <div className="card">
      <img
        alt={generateAltText(bird)}
        className="card-img-top"
        src={media.thumbnail}
      />
      <div className="card-body">
        <h3 className="card-title h5">{bird.name}</h3>
        <p className="card-text">{generateSummary(bird)}</p>
        <Link className="stretched-link" href={`/birds/${bird.slug}`}>
          View Profile
        </Link>
      </div>
    </div>
  );
}
