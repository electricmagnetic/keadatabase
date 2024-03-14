import Image from "next/image";
import { GeoJSONLayer } from "geospatial/layers";
import { generateGeoJson } from "geospatial/helpers";

import { BirdAsBlock } from "../birds/templates";
import { ObservationAsBlock } from "../observations/templates";

import { type BirdObservation } from "./schema";

import BaseMap from "@/app/_components/geospatial/BaseMap";
import Icon from "@/app/_components/ui/Icon";
import { getMediaOrPlaceholder } from "@/app/_components/api/media";

const IMAGE_HEIGHT = 250;
const IMAGE_WIDTH = 350;

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
          height={IMAGE_HEIGHT}
          src={media.thumbnail}
          unoptimized
          width={IMAGE_WIDTH}
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
    <BaseMap interactive={false}>
      <GeoJSONLayer geoJson={birdObservationsAsGeoJson} zoomToLayer />
    </BaseMap>
  );
}
