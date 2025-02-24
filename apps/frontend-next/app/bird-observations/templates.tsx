import Image from "next/image";
import Link from "next/link";
import { GeoJSONLayer } from "geospatial/layers";
import { generateGeoJson } from "geospatial/helpers";

import { BirdAsBlock } from "../birds/templates";
import { ObservationAsBlock } from "../observations/templates";
import { generateAltText } from "../birds/helpers";

import { type BirdObservation } from "./schema";

import BaseMap from "@/app/_components/geospatial/BaseMap";
import Icon from "@/app/_components/ui/Icon";
import {
  IMAGE_SIZES,
  getMediaOrPlaceholder,
} from "@/app/_components/api/media";

// TODO: rewrite, (more or less) directly imported from old database
function UnknownBirdBlock({
  birdObservation,
}: {
  birdObservation: BirdObservation;
}) {
  const media = getMediaOrPlaceholder();

  return (
    <div className="UnknownBirdCard">
      <div className="card card-dull">
        <Image
          alt=""
          className="card-img-top img-fluid"
          height={IMAGE_SIZES.thumbnail.height}
          src={media.thumbnail}
          unoptimized
          width={IMAGE_SIZES.thumbnail.width}
        />
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Icon name="circle" />
            {birdObservation.get_banded_display}
          </li>
          {birdObservation.band_combo ||
          birdObservation.get_life_stage_guess_display ||
          birdObservation.get_sex_guess_display ? (
            <li className="list-group-item">
              {birdObservation.band_combo ? (
                <>{birdObservation.band_combo}</>
              ) : (
                <>
                  {birdObservation.get_life_stage_guess_display}{" "}
                  {birdObservation.get_sex_guess_display}
                </>
              )}
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export function BirdObservationAsBirdBlock({
  birdObservation,
}: {
  birdObservation: BirdObservation;
}) {
  if (birdObservation.bird) return <BirdAsBlock bird={birdObservation.bird} />;
  return <UnknownBirdBlock birdObservation={birdObservation} />;
}

export function BirdObservationAsObservationBlock({
  birdObservation,
}: {
  birdObservation: BirdObservation;
}) {
  return <ObservationAsBlock observation={birdObservation.sighting} />;
}

export function BirdObservationsAsMap({
  birdObservations,
}: {
  birdObservations: BirdObservation[];
}) {
  const birdObservationsAsGeoJson = generateGeoJson(
    "id",
    "point_location",
    birdObservations.map((birdObservation) => birdObservation.sighting),
  );

  return (
    <BaseMap>
      <GeoJSONLayer geoJson={birdObservationsAsGeoJson} zoomToLayer />
    </BaseMap>
  );
}

export function BirdObservationAsCircleBlock({
  birdObservation,
}: {
  birdObservation: BirdObservation;
}) {
  const { bird, sighting } = birdObservation;

  if (!bird) return null;

  const media = getMediaOrPlaceholder(bird.bird_extended?.profile_picture);
  return (
    <div className="position-relative text-center">
      <Image
        alt={generateAltText(bird)}
        className="img-fluid rounded-circle p-1"
        height={IMAGE_SIZES.large.height}
        src={media.large}
        unoptimized
        width={IMAGE_SIZES.large.width}
      />
      <h3 className="h4">
        <Link className="stretched-link" href={`/birds/${bird.slug}`}>
          {bird.name}
        </Link>
      </h3>
      <p>
        {sighting.date_sighted} {sighting.time_sighted}
      </p>
    </div>
  );
}
