import Link from "next/link";
import Image from "next/image";

import { type Bird } from "./schema";
import { generateAltText, generateSummary } from "./helpers";

import {
  IMAGE_SIZES,
  getMediaOrPlaceholder,
} from "@/app/_components/api/media";

const truncate = (value: string, characters: number) =>
  `${value.split(" ").splice(0, characters).join(" ")}...`;

export function BirdAsBlock({
  bird: { bird_extended, ...bird },
}: {
  bird: Bird;
}) {
  const media = getMediaOrPlaceholder(bird_extended?.profile_picture);

  return (
    <div className="card">
      <Image
        alt={generateAltText(bird)}
        className="card-img-top img-fluid"
        height={IMAGE_SIZES.thumbnail.height}
        src={media.thumbnail}
        unoptimized
        width={IMAGE_SIZES.thumbnail.width}
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

export function BirdAsCircleBlock({
  bird: { bird_extended, ...bird },
}: {
  bird: Bird;
}) {
  const media = getMediaOrPlaceholder(bird_extended?.profile_picture);

  return (
    <div className="position-relative text-center">
      <Image
        alt={generateAltText(bird)}
        className="img-fluid rounded-circle p-3"
        height={IMAGE_SIZES.large.height}
        src={media.large}
        unoptimized
        width={IMAGE_SIZES.large.width}
      />
      <h3>{bird.name}</h3>
      {bird_extended ? <p>{truncate(bird_extended.description, 25)}</p> : null}
      <Link
        className="btn btn-large btn-outline-light stretched-link"
        href={`/birds/${bird.slug}`}
      >
        View Profile
      </Link>
    </div>
  );
}
